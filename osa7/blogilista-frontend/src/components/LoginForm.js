import React from 'react';
//import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setNotification} from '../reducers/notificationReducer';
import {login} from '../reducers/loginReducer';
import {useField} from '../hooks';
import {Button} from '../styled';

const LoginForm = ({dispatchLogin, dispatchNotification}) => {
  const username = useField('text', 'username');
  const password = useField('password', 'password');
  return (
    <div>
      <form data-testid="login-form" onSubmit={(event) => {
        event.preventDefault();
        dispatchLogin(username.value, password.value).then((loginAction) => {
          dispatchNotification({
            msg: `Logged in as ${loginAction.data.username}`,
            msgClass: 'success'
          });
        }).catch((e) => {
          dispatchNotification({
            msg: 'Wrong username or password.', msgClass: 'error'
          });
          console.error(e);
        });
      }}>
        <input data-testid="login-input-username" {...username} />
        <br />
        <input data-testid="login-input-password" {...password} />
        <br />
        <Button data-testid="login-button-submit" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (username, password) =>
    dispatch(login(username, password)),
  dispatchNotification: (msg) => {
    dispatch(setNotification(msg, 5000));
  }
});

export default connect(null, mapDispatchToProps)(LoginForm);