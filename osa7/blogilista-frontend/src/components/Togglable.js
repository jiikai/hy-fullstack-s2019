import React, {useState} from 'react';
import {Button} from '../styled';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {display: visible ? 'none' : ''};
  const showWhenVisible = {display: visible ? '' : 'none'};

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button data-testid="togglable-content" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
};

export default Togglable;