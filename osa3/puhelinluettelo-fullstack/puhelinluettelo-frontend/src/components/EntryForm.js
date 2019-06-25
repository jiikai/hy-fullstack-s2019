import React from 'react';

const EntryFormInput = ({text, inputValue, onChange}) => (
  <div>{text}
    <input value={inputValue} onChange={onChange}/>
  </div>
);

const EntryForm = ({keyField, valueField, handlers}) => (
  <div>
    <form>
      <EntryFormInput text="name: " inputValue={keyField} 
                      onChange={handlers.key} />
      <EntryFormInput text="number: " inputValue={valueField} 
                      onChange={handlers.value} />
      <button type="submit" onClick={handlers.submit}>add</button>
    </form>
  </div>
);

export default EntryForm;