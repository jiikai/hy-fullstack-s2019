import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {ME} from '../queries';
import Books from './Books';

const Recommended = ({errorHandler, show}) => {
  const {loading, error, data} = useQuery(ME, {onError: errorHandler});
  return !show || error ? null : loading ? <div>loading...</div> : (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite genre <strong>{data.me.favoriteGenre}</strong>
      : </p>
      <Books errorHandler={errorHandler} reqGenre={data.me.favoriteGenre}
        show={show} />
    </div>
  );
};

export default Recommended;