import blogService from '../services/blogs';

export const createBlogComment = (comment) => (dispatch) =>
  blogService.create({...comment},
    `${comment.blog}/comments`)
    .then(newComment => dispatch({
      type: 'CREATE_BLOG_COMMENT', data: newComment
    }));

export const createBlog = (blog) => (dispatch) =>
  blogService.create({
    ...blog, likes: 0
  }).then(newBlog => dispatch({
    type: 'CREATE_BLOG', data: newBlog
  }));

export const initBlogs = () => (dispatch) =>
  blogService.getAll().then(blogs => dispatch({
    type: 'INIT_BLOG', data: blogs
  }));

export const likeBlog = (blog) => (dispatch) =>
  blogService.update(blog.id, {
    ...blog, likes: blog.likes + 1
  }).then(() => dispatch({
    type: 'LIKE_BLOG', data: blog.id
  }));

export const removeBlog = (id) => (dispatch) =>
  blogService.remove(id).then(() => dispatch({
    type: 'REMOVE_BLOG', data: id
  }));

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, {...action.data}];
    case 'CREATE_BLOG_COMMENT':
      return state.map(b =>
        b.id === action.data.blog ? {
          ...b, comments: [...b.comments, action.data]
        } : {...b});
    case 'INIT_BLOG':
      return action.data;
    case 'LIKE_BLOG':
      return state.map(b =>
        b.id === action.data ? {
          ...b, likes: b.likes + 1
        } : {...b});
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data);
    default:
      return state;
  }
};

export default reducer;