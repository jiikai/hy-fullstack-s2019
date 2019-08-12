import React from 'react';
import {connect} from 'react-redux';
import Menu from './Menu';
import Notification from './Notification';
import {H1, NavBar} from '../styled';

const Header = ({currentUser, navMenuItems}) => (
  currentUser ? (
    <div>
      <NavBar>
        <Menu currentUser={currentUser} links={navMenuItems} />
      </NavBar>
      <Notification />
      <H1>Blogs</H1>
    </div>
  ) : (
    <H1>Log in to application</H1>
  )
);

const mapStateToProps = (state) => ({currentUser: state.login});

export default connect(mapStateToProps, null)(Header);