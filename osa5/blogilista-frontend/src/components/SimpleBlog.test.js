import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Anonymous',
  likes: 0
};

test('renders content', () => {
  const renderedDiv = render(
    <SimpleBlog blog={blog} onClick={() => console.log(blog)} />
  ).container.querySelector('.simple-blog');
  expect(renderedDiv).toHaveTextContent(`${blog.title} ${blog.author}`);
  expect(renderedDiv).toHaveTextContent(`blog has ${blog.likes} likes`);
});

test('clicking the button twice calls event handler twice', async () => {
  const mockHandler = jest.fn();
  const button = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  ).container.querySelector('button');
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(2);
});