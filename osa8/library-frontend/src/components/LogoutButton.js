import React from 'react';

const LogoutButton = ({show, logout}) =>
  !show ? null : (
    <button data-testid="button-logout" onClick={logout}>logout</button>
  );

export default LogoutButton;