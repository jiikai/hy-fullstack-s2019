import React from 'react';

const TrackedInput = ({expr, onChange}) => (
  <div>Filter:
    <input value={expr} onChange={onChange}/>
  </div>
);

export default TrackedInput;