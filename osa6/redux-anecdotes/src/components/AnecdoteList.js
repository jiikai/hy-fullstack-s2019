import React from 'react';
import {connect} from 'react-redux';
import {voteAnecdote} from '../reducers/anecdoteReducer';
import {setNotification} from '../reducers/notificationReducer';

const AnecdoteList = ({anecdotesToShow,
  dispatchVoteAnecdote, dispatchSetNotification}) => {
  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatchVoteAnecdote(anecdote);
              dispatchSetNotification(anecdote.content, 5000);
            }}
            >vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  anecdotesToShow: state.anecdotes.filter(anecdote =>
    anecdote.content.trim().toLowerCase().includes(state.filter))
});

const mapDispatchToProps = (dispatch) => ({
  dispatchVoteAnecdote: (val) => {
    dispatch(voteAnecdote(val));
  },
  dispatchSetNotification: (val, timeout) => {
    dispatch(setNotification(val, timeout));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);