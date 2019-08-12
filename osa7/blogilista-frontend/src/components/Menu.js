import React from 'react';
import LogoutButton from './LogoutButton';
import {NavBarLink, NavBarText} from '../styled';

const Menu = ({links, currentUser}) => {
  return currentUser ? (
    <div data-testid="navbar">
      {links.map(({to, label}, i) => (
        <NavBarLink data-testid={`navbar-link-${label.toLowerCase()}`}
          key={`${i}-${to}`} to={to}>
          {label}
        </NavBarLink>
      ))}
      <NavBarText>{currentUser.name} logged in</NavBarText>
      <LogoutButton localStorageKey="loggedBloglistUser" />
    </div>
  ) : null;
};

export default Menu;