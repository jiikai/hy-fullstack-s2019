import React from 'react';
import {useField} from '../hooks';

const LoginForm = ({show, login}) => {
  const username = useField('text', 'username');
  const password = useField('password', 'password');
  return !show ? null : (
    <div>
      <form data-testid="login-form" onSubmit={async (e) => {
        e.preventDefault();
        await login({
          variables: {
            username: username.value,
            password: password.value
          }
        });

      }}>
        <input placeholder="username" data-testid="login-input-username"
          {...username} />
        <br />
        <input placeholder="password" data-testid="login-input-password"
          {...password} />
        <br />
        <button data-testid="login-button-submit" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;