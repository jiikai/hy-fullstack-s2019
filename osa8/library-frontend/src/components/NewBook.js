import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK} from '../queries';
import {useField} from '../hooks';

const NewBook = ({errorHandler, show}) => {
  const [addBook] = useMutation(CREATE_BOOK, {
    onError: errorHandler,
    refetchQueries: [{
      query: ALL_BOOKS, variables: {
        genre: null
      }
    }, {
      query: ALL_AUTHORS
    }]
  });
  const title = useField('text');
  const author = useField('text');
  const published = useField('number');
  const genre = useField('text');
  const [genres, setGenres] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    await addBook({
      variables: {
        author: author.value,
        genres,
        published: parseInt(published.value),
        title: title.value
      }});
    setGenres([]);
    author.onSubmit();
    title.onSubmit();
    published.onSubmit();
    genre.onSubmit();
  };

  return !show ? null : (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} required />
        </div>
        <div>
          author
          <input {...author} required />
        </div>
        <div>
          published
          <input {...published} required />
        </div>
        <div>
          <input {...genre} />
          <button type="button" onClick={() => {
            setGenres([...genres, genre.value]);
            genre.onSubmit();
          }}>add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;