import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {ALL_AUTHORS} from '../queries';
import EditAuthor from './EditAuthor';

const Authors = ({show, showEditAuthor, errorHandler}) => {
  const {loading, error, data} = useQuery(ALL_AUTHORS, {
    onError: errorHandler
  });
  return !show || error ? null : loading ? <div>loading...</div> : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data.allAuthors.map(({name, born, bookCount}) =>
            <tr key={name}>
              <td>{name}</td>
              <td>{born ? born : ''}</td>
              <td>{bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <EditAuthor show={showEditAuthor} authors={data.allAuthors}
        errorHandler={errorHandler} />
    </div>
  );
};

export default Authors;