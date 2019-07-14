import React from 'react';
import PropTypes from 'prop-types';

const LogoutButton = ({buttonTxt, localStorageKey, callbackFn}) => (
  <button type="submit" onClick={() => {
    if (window.localStorage.getItem(localStorageKey)) {
      window.localStorage.removeItem(localStorageKey);
      callbackFn();
    }}}>{buttonTxt}
  </button>
);

LogoutButton.propTypes = {
  buttonTxt: PropTypes.string.isRequired,
  localStorageKey: PropTypes.string.isRequired,
  callbackFn: PropTypes.func
};

export default LogoutButton;