import React from 'react';

const EntryDeleteButton = ({onClick}) => (
  <button type="submit" onClick={onClick}>Delete</button>
);

const Entry = ({keyText, valueText, delHandler}) => (
  <div>
    <li>{keyText}: {valueText} 
      <EntryDeleteButton onClick={() => delHandler(keyText)} />
    </li>
  </div>
  
);

const EntryList = ({entries, keyField, valueField, filterField, delHandler}) =>
(
  <ul>
    {entries.filter(entries => entries[filterField]).map(entries => (
        <Entry key={entries[keyField]} keyText={entries[keyField]} 
              valueText={entries[valueField]} delHandler={delHandler} />
    ))}
  </ul>
)

export default EntryList;