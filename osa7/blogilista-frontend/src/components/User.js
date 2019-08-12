import React from 'react';
import {connect} from 'react-redux';

const User = ({user}) => {
  return (
    user ? (
      <div>
        <h2>{user.name}</h2>
        <h3>Blogs added:</h3>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    ) : null
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.users ? state.users.find(u => u.id === ownProps.userId) : null
});

export default connect(mapStateToProps, null)(User);