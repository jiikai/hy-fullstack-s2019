import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const BlogList = ({blogs}) => (
  blogs ? (
    <div data-testid="bloglist">
      {blogs.sort((a, b) =>
        a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
      ).map(blog => (
        <div style={{
          border: 'solid',
          borderWidth: 1,
          marginBottom: 5,
          paddingLeft: 2,
          paddingTop: 10
        }} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div />
  )
);

BlogList.propTypes = {
  blogs: PropTypes.array
};

const mapStateToProps = (state) => ({
  blogs: state.blogs
});

export default connect(mapStateToProps, null)(BlogList);