import React from 'react';

const UListWithButtons = ({src, keyField, valField, btnHandler, btnText}) => (
  <ul>
    {src.map(el => (
        <li key={el[keyField]}>{el[valField]}
          <button type="submit" onClick={() =>
            btnHandler(el[keyField], keyField)}>{btnText}
          </button>
        </li>
    ))}
  </ul>
)

export default UListWithButtons;