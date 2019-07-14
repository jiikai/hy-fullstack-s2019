import React, {useState, useEffect} from 'react';
import {BlogList} from './components/Blog';
import BlogForm from './components/BlogForm';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import {useField} from './hooks';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const emptyMsg = {
    msg: '', msgClass: ''
  };
  const [blogs, setBlogs] = useState([]);
  const [appMessage, setAppMessage] = useState(emptyMsg);
  const [user, setUser] = useState(null);

  const username = useField('text');
  const password = useField('text');

  const title = useField('text');
  const author = useField('text');
  const url = useField('url');

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = event => {
    event.preventDefault();
    loginService.login({
      username: username.value,
      password: password.value
    }).then(user => {
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      console.log(user);
      setAppMessage({
        msg: `Logged in as ${user.username}`,
        msgClass: 'success'
      });
    }).catch(exception => {
      setAppMessage({
        msg: 'Wrong username or password.',
        msgClass: 'error'
      });
      console.log(exception);
    }).then(() =>
      setTimeout(() => {
        setAppMessage(emptyMsg);
      }, 5000)
    );
  };

  const addBlog = event => {
    event.preventDefault();
    blogService.create({
      title: title.value,
      author: author.value,
      url: url.value,
      user: user
    }).then(resData => {
      setBlogs(blogs.concat({...resData, user: user}));
      setAppMessage({
        msg: `A new blog, "${title.value}" by ${author.value} added!`,
        msgClass: 'success'
      });
    }).catch(exception => {
      setAppMessage({
        msg: `Adding the blog failed: ${exception}`,
        msgClass: 'error'
      });
    }).then(() =>
      setTimeout(() => {
        setAppMessage(emptyMsg);
      }, 5000));
  };

  const addLike = id => {
    const blog = blogs.find(b => b.id === id);
    blogService.update(id, {...blog,
      likes: blog.likes + 1
    }).then(retBlog => {
      setAppMessage({
        msg: `You liked '${blog.title}'`,
        msgClass: 'success'
      });
      console.log(retBlog);
      setBlogs(blogs.map(b => b.id !== id ? b : retBlog));
    }).catch(error => {
      setAppMessage({
        msg: `Blog '${blog.title}' was already removed from server`,
        msgClass: 'error'
      });
      console.log(error);
      setBlogs(blogs.filter(b => b.id !== id));
    }).then(() =>
      setTimeout(() => {
        setAppMessage(emptyMsg);
      }, 5000)
    );
  };

  const removeBlog = id => {
    if (window.confirm('Really remove this blog?')) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter(b => b.id !== id));
        setAppMessage({
          msg: 'Succesfully removed the blog.',
          msgClass: 'success'
        });
      }).catch(error => {
        setAppMessage({
          msg: error,
          msgClass: 'error'
        });
        console.log(error);
      }).then(() =>
        setTimeout(() => {
          setAppMessage(emptyMsg);
        }, 5000)
      );
    }
  };

  return (
    <div>
      <h1>{!user ? 'Log in to application' : 'Blogs'}</h1>
      <Notification msgObj={appMessage} />
      {!user ? (
        <LoginForm username={username} password={password}
          handleLogin={handleLogin} />
      ) : (
        <div>
          <p>{user.name} logged in
            <LogoutButton buttonTxt="logout"
              localStorageKey="loggedBloglistUser"
              callbackFn={() => {
                setUser(null);
                blogService.setToken(null);
              }} />
          </p>
          <Togglable buttonLabel="Add a new blog">
            <BlogForm title={title} author={author} url={url}
              handleAdd={addBlog} />
          </Togglable>
          <BlogList blogs={blogs} addLike={addLike} removeBlog={removeBlog}
            currentUserId={user.id}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
