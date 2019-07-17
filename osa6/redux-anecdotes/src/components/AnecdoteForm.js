import React from 'react';
import {connect} from 'react-redux';
import {createAnecdote} from '../reducers/anecdoteReducer';
import {setNotification} from '../reducers/notificationReducer';

const AnecdoteForm = ({dispatchCreateAnecdote, dispatchSetNotification}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={async (event) => {
        event.preventDefault();
        const content = event.target.newAnecdote.value;
        event.target.newAnecdote.value = '';
        dispatchCreateAnecdote(content);
        dispatchSetNotification(content, 5000);
      }}>
        <input name="newAnecdote"/>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateAnecdote: val => {
    dispatch(createAnecdote(val));
  },
  dispatchSetNotification: val => {
    dispatch(setNotification(val));
  }
});

export default connect(null, mapDispatchToProps)(AnecdoteForm);