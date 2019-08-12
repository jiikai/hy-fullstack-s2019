import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {ALL_BOOKS} from '../queries';

const Books = ({errorHandler, reqGenre, show}) => {
  const filterGenres = (books) =>
    !books ? null : Array.from(new Set(books.flatMap((b) =>
      b.genres))).map((genre) => ({
      name: genre, value: genre, text: genre
    }));
  const [allGenres, setAllGenres] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(null);
  const {data, error, loading} = useQuery(ALL_BOOKS, {
    onCompleted: reqGenre ? null : ({allBooks}) => {
      if (!currentGenre)
        setAllGenres(filterGenres(allBooks));
    },
    onError: errorHandler,
    variables: {genre: reqGenre ? reqGenre : currentGenre}
  });

  const labelStyle = {
    marginRight: '0.5em', fontStyle: 'italic'
  };
  return !show || error ? null : loading ? <div>loading...</div> : (
    <div>
      {reqGenre ? null : <h2>books</h2>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {data.allBooks.map(({title, author, published}) =>
            <tr key={title}>
              <td>{title}</td>
              <td>{author.name}</td>
              <td>{published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {!allGenres || reqGenre ? null : (
        <form>
          <label style={labelStyle} key={'all'}>all
            <input type="radio" checked={!currentGenre} name="all" value={''}
              onChange={() => setCurrentGenre(null)} />
          </label>
          {allGenres.map(({name, text, value}) => (
            <label style={labelStyle} key={name}>{text}
              <input type="radio" checked={value === currentGenre}
                name={name} value={value} onChange={() =>
                  setCurrentGenre(value)}/>
            </label>
          ))}
        </form>
      )}
    </div>
  );
};

export default Books;