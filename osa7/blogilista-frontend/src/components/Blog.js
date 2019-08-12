import React from 'react';
import {connect} from 'react-redux';
//import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import {likeBlog, removeBlog} from '../reducers/blogReducer';
import {setNotification} from '../reducers/notificationReducer';
import {Button} from '../styled';

const Blog = ({blog, currentUserId,
  dispatchLike, dispatchRemove,
  dispatchNotification}) => {
  return blog ? (
    <div data-testid="blog-div" className="blog">
      <h2>{blog.title} -- {blog.author}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
        <br />
        added by {blog.user.username}
        <br />
        {blog.likes} likes
        <Button data-testid="blog-button-like" type="button" onClick={() => {
          dispatchLike(blog).then(() => {
            dispatchNotification({
              msg: `You liked '${blog.title} '`,
              msgClass: 'success'
            });
          }).catch((e) => {
            dispatchNotification({
              msg: `Blog '${blog.title}' was already removed from server`,
              msgClass: 'error'
            });
            console.log(e);
          });
        }}>like
        </Button>
        <Button data-testid="blog-button-remove" type="button" 
          style={currentUserId === blog.user.id
            ? {display: ''} : {display : 'none'}} onClick={() => {
            if (window.confirm('Really remove this blog?'))
              dispatchRemove(blog.id).then(() => {
                dispatchNotification({
                  msg: 'Succesfully removed the blog.',
                  msgClass: 'success'
                });
              }).catch((e) => {
                dispatchNotification({
                  msg: `Adding the blog failed: ${e}`,
                  msgClass: 'error'
                });
                console.log(e);
              });
          }}>remove
        </Button>
      </p>
      <h3>Comments</h3>
      <CommentForm blogId={blog.id} />
      <ul>
        {blog.comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <hr />
    </div>
  ) : null;
};


const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs ? state.blogs.find(b =>
    b.id === ownProps.blogId) : null,
  currentUserId: state.login ? state.login.id : ''
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLike: (blog) => dispatch(likeBlog(blog)),
  dispatchRemove: (id) => dispatch(removeBlog(id)),
  dispatchNotification: (msg) => {
    dispatch(setNotification(msg));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);