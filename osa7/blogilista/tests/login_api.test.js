const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  supertest = require('supertest'),
  app = require('../app'),
  testHelper = require('./test_helper');

const api = supertest(app),
  Blog = require('../models/blog'),
  User = require('../models/user');

describe('POST /api/login', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.create({
      username: 'root',
      name: 'Superuser',
      passwordHash: await bcrypt.hash('4242', 10)
    });
  });
  // test input
  const valid_req_body = {
    username: 'root',
    password: '4242'
  };
  const bad_req_bodies = [
    {username: 'root'},
    {password: '4242'},
    {name: 'Superuser'},
    {
      username: 'rot',
      password: '4224'
    },
  ];

  const doLogin = req_body =>
    api.post('/api/login').send(req_body);

  test('returns a token for an existing user', async () => {
    const res = await doLogin(valid_req_body).expect(200)
      .expect('Content-Type', /application\/json/);
    expect(res.body.token).toBeDefined();
  });
  test('fails if username or password are missing or invalid', async () => {
    for await (const bad_req of bad_req_bodies) {
      const res = await doLogin(bad_req).expect(401)
        .expect('Content-Type', /application\/json/);
      expect(res.body.token).not.toBeDefined();
      expect(res.body.error).toBeDefined();
    }
  });
  test('received token works', async () => {
    const initialBlogs = await testHelper.collectionInDb(Blog);
    const res = await doLogin(valid_req_body).expect(200);
    await api.post('/api/blogs')
      .set('authorization', `Bearer ${res.body.token}`)
      .send(testHelper.initialBlogs[0])
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsAfterPost = await testHelper.collectionInDb(Blog);
    expect(blogsAfterPost.length).toBe(initialBlogs.length + 1);
  });
  test('invalid token does not work', async () => {
    const initialBlogs = await testHelper.collectionInDb(Blog);
    const res = await doLogin(valid_req_body).expect(200);
    await api.post('/api/blogs')
      .set('authorization', `Bearer ${res.body.token.toUpperCase()}`)
      .send(testHelper.initialBlogs[0])
      .expect(401)
      .expect('Content-Type', /application\/json/);
    const blogsAfterPost = await testHelper.collectionInDb(Blog);
    expect(blogsAfterPost.length).toBe(initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});