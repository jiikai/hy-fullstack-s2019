const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const testHelper = require('./test_helper');
const api = supertest(app);

describe('POST /api/users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.create({
      username: 'root',
      name: 'Superuser',
      passwordHash: await bcrypt.hash('4242', 10)
    });
  });

  test('succeeds with a unique username', async () => {
    const initialUsers = await testHelper.collectionInDb(User);
    await api.post('/api/users').send({
      username: 'adal',
      name: 'Ada Lovelace',
      password: 'topsecret',
    }).expect(201).expect('Content-Type', /application\/json/);
    const usersAfterPost = await testHelper.collectionInDb(User);
    expect(usersAfterPost.length).toBe(initialUsers.length + 1);
    expect(usersAfterPost.map(u => u.username)).toContain('adal');
  });

  test('fails with 400 Bad Request if username is reserved', async () => {
    const initialUsers = await testHelper.collectionInDb(User);
    await api.post('/api/users').send({
      username: 'root',
      name: 'Superuser',
      password: '2424',
    }).expect(400).expect('Content-Type', /application\/json/);
    const usersAfterPost = await testHelper.collectionInDb(User);
    expect(usersAfterPost.length).toBe(initialUsers.length);
  });

  test('fails if username or password are missing or too short', async () => {
    const initialUsers = await testHelper.collectionInDb(User);
    const responses = await Promise.all([
      {name: 'Bad Request'},
      {username: 'badrequest'},
      {password: 'badrequest'},
      {
        username: 'br',
        password: 'badrequest'
      },
      {
        username: 'badrequest',
        password: 'br'
      }
    ].map(req => api.post('/api/users').expect(400)));
    const usersAfterPosts = await testHelper.collectionInDb(User);
    expect(usersAfterPosts.length).toBe(initialUsers.length);
  });
});

describe(`GET /api/users
  -- given a db with 1 user {username: 'test', password: '4242'}`, () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.create({
      username: 'root',
      name: 'Superuser',
      password: '4242'
    });
  });
  test('Users are returned as JSON', async () => {
    await api.get('/api/users')
      .expect(200).expect('Content-Type', /application\/json/);
  });
  test('All users are returned', async () => {
    const users = await testHelper.collectionInDb(User);
    const res = await api.get('/api/users')
      .expect(200).expect('Content-Type', /application\/json/);
    expect(res.body.length).toBe(users.length);
  });
  test('A specific user is returned', async () => {
    const res = await api.get('/api/users');
    expect(res.body.map(el => el.username)).toContain('root');
  });
  test('id (not _id) is defined in the response body', async () => {
    const res = await api.get('/api/users');
    expect(res.body.map(el => el.id)).toBeDefined();
  });
});

describe(`GET /api/users/:id
  -- given a db with 1 user {username: 'test', password: '4242'}`, () => {
  test('Succeeds with a valid id', async () => {
    const users = await testHelper.collectionInDb(User);
    const res = await api.get(`/api/users/${users[0].id}`)
      .expect(200)
      .expect('Content-Type', (/application\/json/));
    expect(res.body).toEqual(users[0]);
  });
  test('fails (400 Bad Request) with an invalid id', async () => {
    await api.get('/api/users/666').expect(400);
  });
  test('fails (404 Not Found) if user does not exist', async () => {
    const validNonExistingId = await testHelper.nonExistingId(User, {
      username: 'nonexisting',
      password: 'missing'
    });
    await api.get(`/api/users/${validNonExistingId}`).expect(404);
  });
});

afterAll(() => {
  mongoose.disconnect();
});