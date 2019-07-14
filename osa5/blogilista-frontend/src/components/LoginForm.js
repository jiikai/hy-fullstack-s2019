import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({username, password, handleLogin}) => (
  <div>
    <form data-testid="login-form" onSubmit={handleLogin}>
      <div>
        username:
        <input {...username}/>
      </div>
      <div>
        password:
        <input {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

LoginForm.propTypes = {
  username: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  password: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;