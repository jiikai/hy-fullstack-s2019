import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const UserList = ({users}) => (
  users ? (
    <div data-testid="userlist">
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div />
  )
);

UserList.propTypes = {
  users: PropTypes.array
};

const mapStateToProps = (state) => ({users: state.users});

export default connect(mapStateToProps, null)(UserList);