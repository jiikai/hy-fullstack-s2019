import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../reducers/loginReducer';
import {Button} from '../styled';

const LogoutButton = ({localStorageKey, dispatchLogout}) => (
  <Button data-testid="button-logout" type="submit" onClick={() => {
    dispatchLogout(localStorageKey);
  }}>Logout</Button>
);

LogoutButton.propTypes = {
  localStorageKey: PropTypes.string
};

const mapDispatchToProps = () => (dispatch) => ({
  dispatchLogout: (localStorageKey) => {
    dispatch(logout(localStorageKey));
  }
});

export default connect(null, mapDispatchToProps)(LogoutButton);