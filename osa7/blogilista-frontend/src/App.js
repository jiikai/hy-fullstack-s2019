import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import LoginForm from './components/LoginForm';
import User from './components/User';
import UserList from './components/UserList';
import {setNotification} from './reducers/notificationReducer';
import {initBlogs} from './reducers/blogReducer';
import Togglable from './components/Togglable';
import {initUsers} from './reducers/userReducer';
import {Page} from './styled';

const App = ({currentUser, dispatchInitBlogs, dispatchInitUsers}) => {

  useEffect(() => {
    dispatchInitBlogs().catch((e) => {
      console.error(e);
    });
  }, [dispatchInitBlogs]);

  useEffect(() => {
    dispatchInitUsers().catch((e) => {
      console.error(e);
    });
  }, [dispatchInitUsers]);

  return (
    <Page>
      <Router>
        <Header navMenuItems={[
          {to: '/', label: 'Home'},
          {to: '/users', label: 'Users'},
        ]} />
        {!currentUser ? (
          <LoginForm />
        ) : (
          <div>
            <Menu links={[
              {to: '/', label: 'Home'},
              {to: '/users', label: 'Users'},
            ]} />
            <Route exact path="/" render={() => (
              <div>
                <Togglable buttonLabel="Add a new blog">
                  <BlogForm user={currentUser} />
                </Togglable>
                <BlogList currentUserId={currentUser.id} />
              </div>
            )} />
            <Route exact path="/blogs" render={() =>
              <Redirect to="/" />} />
            <Route path="/blogs/:id" render={({match}) =>
              <Blog blogId={match.params.id} />
            } />
            <Route exact path="/users" render={() =>
              <UserList />} />
            <Route path="/users/:id" render={({match}) =>
              <User userId={match.params.id} />
            } />
          </div>
        )}
      </Router>
      <Footer />
    </Page>
  );
};

const mapStateToProps = (state) => ({currentUser: state.login});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetNotification: (val, timeout) => {
    dispatch(setNotification(val, timeout));
  },
  dispatchInitBlogs: () => dispatch(initBlogs()),
  dispatchInitUsers: () => dispatch(initUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);