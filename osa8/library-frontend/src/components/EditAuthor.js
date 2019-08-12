import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {EDIT_AUTHOR} from '../queries';

const EditAuthor = ({authors, errorHandler, show}) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {onError: errorHandler});
  const [selected, setSelected] = useState('');
  const [born, setBorn] = useState('');
  return !show ? null : (
    <div>
      <h3>Set birthyear</h3>
      <select value={selected}
        onChange={({target}) => setSelected(target.value)}>
        {authors.map(({id, name}) => (
          <option key={id} value={name}>{name}</option>
        ))}
      </select>
      <div>
        born
        <input type="number" value={born}
          onChange={({target}) => setBorn(target.value)} />
        <button onClick={async () => {
          await editAuthor({
            variables: {
              name: selected,
              setBornTo: parseInt(born)
            }
          });
          setSelected('');
          setBorn('');
        }}>set</button>
      </div>
    </div>
  );
};

export default EditAuthor;