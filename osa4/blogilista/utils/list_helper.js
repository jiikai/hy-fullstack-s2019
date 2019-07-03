const dummy = _blogs => 1;

const totalLikes = blogs =>
  blogs.reduce((acc, cur) =>
    cur.likes + acc, 0);

const favoriteBlog = blogs =>
  !blogs || !blogs.length ? undefined :
    blogs.reduce((acc, cur) =>
      cur.likes > acc.likes ? cur : acc);

const reduceMapMaxKey = (src, keyProp, valProp, evaluator, initialObj) => {
  if (!src || !src.length || !initialObj)
    return undefined;
  const map = new Map();
  return src.reduce((acc, cur) => {
    map.set(cur[keyProp], evaluator(map, cur));
    return map.get(cur[keyProp]) < acc[valProp] ? acc : {
      [keyProp]: cur[keyProp],
      [valProp]: map.get(cur[keyProp])
    };
  }, initialObj);
};

const mostBlogs = blogs => 
  reduceMapMaxKey(blogs, 'author', 'blogs', ((map, el) =>
    map.has(el.author) ? map.get(el.author) + 1 : 1),
  blogs.length ? {
    author: blogs[0].author,
    blogs: 1
  } : undefined);

const mostLikes = blogs => 
  reduceMapMaxKey(blogs, 'author', 'likes', ((map, el) =>
    map.has(el.author) ? map.get(el.author) + el.likes : el.likes),
  blogs.length ? {
    author: blogs[0].author,
    likes: blogs[0].likes
  } : undefined);

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};