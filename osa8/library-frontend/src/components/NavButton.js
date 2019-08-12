import React from 'react';

const NavButton = ({show, buttonText, onClick}) =>
  !show ? null : (
    <button type="button" onClick={onClick}>{buttonText}</button>
  );

export default NavButton;