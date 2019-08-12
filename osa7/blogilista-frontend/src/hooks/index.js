import {useState} from 'react';

export const useField = (type, placeholder = '') => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = () => {
    setValue('');
  };

  return {
    type,
    value,
    placeholder,
    onChange,
    onSubmit
  };
};