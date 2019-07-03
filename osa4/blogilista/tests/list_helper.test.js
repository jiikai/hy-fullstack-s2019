const testHelper = require('./test_helper');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test('of a list of one blog is one', () => {
    expect(listHelper.totalLikes([testHelper.initialBlogs[0]])).toBe(7);
  });
  test('of a larger list is correct', () => {
    expect(listHelper.totalLikes(testHelper.initialBlogs)).toBe(36);
  });
});

describe('favoriteBlog', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.favoriteBlog([])).toEqual(undefined);
  });
  test('of a list of one blog is that blog', () => {
    expect(listHelper.favoriteBlog([testHelper.initialBlogs[0]]))
      .toEqual(testHelper.initialBlogs[0]);
  });
  test('of a larger list is that with the most likes', () => {
    expect(listHelper.favoriteBlog(testHelper.initialBlogs))
      .toEqual(testHelper.initialBlogs[2]);
  });
});

describe('mostBlogs', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.mostBlogs([])).toEqual(undefined);
  });
  test('of a list of one blog is that blog\'s author & 1', () => {
    expect(listHelper.mostBlogs([testHelper.initialBlogs[0]])).toEqual({
      author: testHelper.initialBlogs[0].author,
      blogs: 1
    });
  });
  test('of a larger list is correct', () => {
    expect(listHelper.mostBlogs(testHelper.initialBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});


describe('mostLikes', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.mostLikes([])).toEqual(undefined);
  });
  test('of a list of one blog is that blog\'s author and likes', () => {
    expect(listHelper.mostLikes([testHelper.initialBlogs[0]])).toEqual({
      author: testHelper.initialBlogs[0].author,
      likes: testHelper.initialBlogs[0].likes
    });
  });
  test('of a larger list is correct', () => {
    expect(listHelper.mostLikes(testHelper.initialBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});