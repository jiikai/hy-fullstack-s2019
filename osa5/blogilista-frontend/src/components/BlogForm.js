import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({title, author, url, handleAdd}) => (
  <div>
    <form onSubmit={handleAdd}>
      <div>
        title:
        <input {...title} />
      </div>
      <div>
        author:
        <input {...author} />
      </div>
      <div>url:
        <input {...url} />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
);

BlogForm.propTypes = {
  title: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  author: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  url: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  handleAdd: PropTypes.func.isRequired
};

export default BlogForm;