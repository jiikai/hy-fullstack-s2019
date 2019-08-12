import React from 'react';
import {connect} from 'react-redux';
//import PropTypes from 'prop-types';
import {createBlog} from '../reducers/blogReducer';
import {setNotification} from '../reducers/notificationReducer';
import {useField} from '../hooks';
import {Button} from '../styled';

const BlogForm = ({user, dispatchCreate, dispatchNotification}) => {
  const title = useField('text'),
    author = useField('text'),
    url = useField('url');
  return (
    <div>
      <form data-testid="blog-form" onSubmit={(event) => {
        event.preventDefault();
        dispatchCreate({
          title: title.value,
          author: author.value,
          url: url.value,
          user: {...user}
        }).then(() => {
          dispatchNotification({
            msg: `A new blog, "${title.value}" by ${author.value} added!`,
            msgClass: 'success'
          });
          title.onSubmit();
          author.onSubmit();
          url.onSubmit();
        }).catch((e) => {
          dispatchNotification({
            msg: `Adding the blog failed: ${e}`,
            msgClass: 'error'
          });
        });
      }}>
        <div>
          title: <input data-testid="blog-input-title" {...title} />
        </div>
        <div>
          author: <input data-testid="blog-input-author" {...author} />
        </div>
        <div>
          url: <input data-testid="blog-input-url" {...url} />
        </div>
        <Button data-testid="blog-button-submit" type="submit">Create</Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCreate: blog => dispatch(createBlog(blog)),
  dispatchNotification: (msg, msgClass) => {
    dispatch(setNotification(msg, msgClass));
  }
});

export default connect(null, mapDispatchToProps)(BlogForm);