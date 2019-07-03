const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const api = supertest(app);

const login = async cred => {
  try {
    const res = await api.post('/api/login').send(cred);
    return res.body.token;
  } catch (error) {
    console.error(error);
  }
};

beforeEach(async () => {
  const blogsDeleted = Blog.deleteMany({});
  await User.deleteMany({});
  const su = await User.create({
    username: 'root',
    name: 'Superuser',
    passwordHash: await bcrypt.hash('4242', 10)
  });
  await blogsDeleted;
  await Promise.all(helper.initialBlogs.map(blog =>
    Blog.create({...blog, user: su.id})
  ));
});

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body.length).toBe(helper.initialBlogs.length);
  });
  test('a specific blog is contained in the returned blogs', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body.map(el => el.title)).toContain('React patterns');
  });
  test('id (not _id) is defined in the response body', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body.map(el => el.id)).toBeDefined();
  });
});

describe('GET /api/blogs/:id', () => {
  test('succeeds with a valid id', async () => {
    const blogsBefore = await helper.collectionInDb(Blog);
    const res = await api.get(`/api/blogs/${blogsBefore[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(res.body.id).toBe(blogsBefore[0].id);
  });
  test('fails (400 Bad Request) with an invalid id', async () => {
    await api.get('/api/blogs/666').expect(400);
  });
  test('fails (404 Not Found) if a blog does not exist', async () => {
    await api.get(`/api/blogs/${await helper.nonExistingId(Blog)}`)
      .expect(404);
  });
});

describe('POST /api/blogs', () => {
  let token;
  beforeEach(async () => {
    token = await login({username: 'root', password: '4242'});
  });
  const newBlog = {
    title: 'ES7 async functions - a step in the wrong direction',
    author: 'Gorgi Kosev',
    url: 'https://blog.spion.dev/posts/es7-async-await-step-in-the-wrong-direction.html',
    likes: 0
  };
  test('POST increases count of blogs and forms a valid document', async () => {
    await api.post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201).expect('Content-Type', /application\/json/);
    const blogsAfterPost = await helper.collectionInDb(Blog);
    expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1);
    expect(blogsAfterPost.map(blog => ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes}))).toContainEqual(newBlog);
  });
  test('blog.likes defaults to zero', async () => {
    const newBlogWithoutLikes = {...newBlog};
    delete newBlogWithoutLikes.likes;
    await api.post('/api/blogs').set('authorization', `Bearer ${token}`)
      .send(newBlogWithoutLikes);
    const blogsAfterPost = await helper.collectionInDb(Blog);
    expect(blogsAfterPost.map(blog => ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes}))).toContainEqual(newBlog);
  });
  test('400 Bad Request if title, url or both are undefined', async () => {
    const blogWithoutTitle = {...newBlog},
      blogWithoutUrl = {...newBlog};
    delete blogWithoutTitle.title;
    delete blogWithoutUrl.url;
    await api.post('/api/blogs').set('authorization', `Bearer ${token}`)
      .send(blogWithoutTitle).expect(400);
    await api.post('/api/blogs').set('authorization', `Bearer ${token}`)
      .send(blogWithoutUrl).expect(400);
    await api.post('/api/blogs').set('authorization', `Bearer ${token}`)
      .send({author: '400 BadRequest'}).expect(400);
  });
});

describe('DELETE /api/blogs/:id', () => {
  test('returns 204, removes the blog and shrinks the collection', async () => {
    const token = await login({username: 'root', password: '4242'});
    const blogsBefore = await helper.collectionInDb(Blog);
    const res = await api.delete(`/api/blogs/${blogsBefore[0].id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    const blogsAfterDelete = await helper.collectionInDb(Blog);
    expect(blogsAfterDelete.length).toBe(blogsBefore.length - 1);
    let content = blogsAfterDelete.map(blog => ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }));
    expect(content).not.toContainEqual(blogsBefore[0]);
  });
  test('returns 204 also if nothing by the given id is found', async () => {
    const token = await login({username: 'root', password: '4242'});
    const validNonExistingId = await helper.nonExistingId(Blog);
    const res = await api.delete(`/api/blogs/${validNonExistingId}`)
      .set('authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
  });
  test('fails (400 Bad Request) with an invalid id', async () => {
    const token = await login({username: 'root', password: '4242'});
    const res = await api.delete('/api/blogs/666')
      .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });
  test('fails on an invalid authorization', async () => {
    const token = await login({username: 'root', password: '4242'});
    const blogsBefore = await helper.collectionInDb(Blog);
    const res = await api.delete(`/api/blogs/${blogsBefore[0].id}`)
      .set('authorization', `Bearer ${token.substring(token.length - 1)
        .concat('$')}`);
    expect(res.status).toBe(401);
  });
});

describe('PUT /api/blogs/:id', () => {
  test('succeeds a valid id, response as JSON', async () => {
    const blogsBefore = await helper.collectionInDb(Blog);
    const updated = {
      ...blogsBefore[0],
      likes: helper.initialBlogs[0].likes + 1
    };
    const token = await login({username: 'root', password: '4242'});
    
    await api.put(`/api/blogs/${blogsBefore[0].id}`)
      .set('authorization', `Bearer ${token}`)
      .send(updated)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blogsAfterPut = await helper.collectionInDb(Blog);
    expect(blogsAfterPut).toContainEqual(updated);
    expect(blogsAfterPut).not.toContainEqual(blogsBefore[0]);
  });
  test('returns 204 if nothing by the given id is found', async () => {
    const token = await login({username: 'root', password: '4242'});
    const validNonExistingId = await helper.nonExistingId(Blog);
    await api.put(`/api/blogs/${validNonExistingId}`)
      .set('authorization', `Bearer ${token}`)
      .send({...helper.initialBlogs[0]})
      .expect(204);
  });
});


afterAll(() => {
  mongoose.disconnect();
});