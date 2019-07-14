import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const Blog = ({blog, like, remove}) => {
  const [fullVisibility, setFullVisibility] = useState(false);
  return (
    <div className="blog" onClick={() => setFullVisibility(!fullVisibility)}>
      <p>{blog.title} -- {blog.author}</p>
      <p className="blog-details" style={{
        display: fullVisibility ? '' : 'none'
      }}>
        {blog.url}
        added by {blog.user.username}
        {blog.likes} likes
      </p>
      <button type="button" onClick={like}>like</button>
      {remove ? (
        <button type="button" onClick={remove}>remove</button>
      ) : (<div />)}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.string
    })
  }),
  like: PropTypes.func.isRequired,
  remove: PropTypes.func
};

export const BlogList = ({blogs, addLike, removeBlog, currentUserId}) => (
  <div data-testid="bloglist">
    {blogs.sort((a, b) =>
      a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
    ).map(blog => (
      <Blog key={blog.id} blog={blog} like={() => addLike(blog.id)}
        remove={currentUserId === blog.user.id ?
          () => removeBlog(blog.id) : null}/>
    ))}
  </div>
);

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired
};