import React from 'react';

const TrackedInput = ({prependTxt, valueExpr, onChange, appendTxt}) => (
  <div>{prependTxt}:
    <input value={valueExpr} onChange={onChange}/>{appendTxt}
  </div>
);

export default TrackedInput;