import React from 'react';
import {connect} from 'react-redux';
import {createBlogComment} from '../reducers/blogReducer';
import {setNotification} from '../reducers/notificationReducer';
import {useField} from '../hooks';
import {Button} from '../styled';

const CommentForm = ({blogId, dispatchComment, dispatchNotification}) => {
  const comment = useField('text', 'Write a new comment');
  return (
    <div data-testid="comment-form">
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatchComment({
          blog: blogId, content: comment.value
        }).then(() => {
          dispatchNotification({
            msg: 'Comment added.',
            msgClass: 'success'
          });
          comment.onSubmit();
        }).catch((error) => {
          dispatchNotification({
            msg: `Failed adding comment: ${error}`,
            msgClass: 'error'
          });
          console.log(error);
        });
      }}>
        <input data-testid="comment-input-write" {...comment} />
        <Button data-testid="comment-button-submit" type="submit">Add comment</Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchComment: (comment) =>
    dispatch(createBlogComment(comment)),
  dispatchNotification: (notification) => {
    dispatch(setNotification(notification));
  }
});

export default connect(null, mapDispatchToProps)(CommentForm);