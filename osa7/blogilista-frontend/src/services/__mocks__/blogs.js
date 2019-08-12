const su = {
  username: 'root',
  password: '4242',
  name: 'SuperUser',
  id: 'ffffffffffffffffffffffff'
};

const notSu = {
  username: 'notsu',
  password: 'ffff',
  name: 'NotSuperUser',
  id: 'fffffffffffffffffffffffe'
};

const testBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: su,
    id: '000000000000000000000000'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: su,
    id: '000000000000000000000001'
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: notSu,
    id: '000000000000000000000002'
  }
];

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => Promise.resolve(testBlogs);

export default {
  getAll,
  setToken
};