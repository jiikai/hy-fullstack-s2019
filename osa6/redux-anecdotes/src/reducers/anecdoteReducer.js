import anecdoteService from '../services/anecdotes';

const sortByVotes = (anecdotes) =>
  anecdotes.sort((a, b) => a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0);

export const voteAnecdote = (anecdote) => (dispatch) => {
  anecdoteService.update(anecdote.id, {...anecdote,
    votes: anecdote.votes + 1
  }).then(() => {
    dispatch({type: 'VOTE', data: anecdote.id});
  });
};
export const createAnecdote = (content) => (dispatch) => {
  anecdoteService.createNew({content, votes: 0})
    .then(newAnecdote => {
      dispatch({type: 'CREATE', data: newAnecdote});
    });
};

export const initAnecdotes = () => (dispatch) => {
  anecdoteService.getAll()
    .then(anecdotes => {
      dispatch({type: 'INIT', data: anecdotes});
    });
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return sortByVotes(state.map(e =>
        e.id === action.data ? {...e, votes: e.votes + 1} : e));
    case 'CREATE':
      return [...state, action.data];
    case 'INIT':
      return action.data;
    default:
      return state;
  }
};

export default reducer;