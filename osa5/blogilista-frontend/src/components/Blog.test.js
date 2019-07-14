import React from 'react';
import {render, fireEvent, wait, waitForElement} from '@testing-library/react';
import {Blog} from './Blog';

const mockHandler = jest.fn();
const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Anonymous',
  url: 'https://fakeurl.com/component-testing',
  likes: 0,
  user: {
    username: 'root',
    name: 'Superuser',
    id: '123456789'
  }
};

describe('<Blog />', () => {
  let component, blogDiv;
  beforeEach(() => {
    component = render(
      <Blog blog={blog} like={mockHandler} remove={mockHandler} />
    );
  });

  test('initially renders blog title and author', () => {
    const blogDiv = component.container.querySelector('.blog');
    const blogDetails = component.container.querySelector('.blog-details');
    expect(blogDiv).toHaveTextContent(`${blog.title} -- ${blog.author}`);
    expect(blogDetails).toHaveStyle('display: none');
  });

  test('clicking reveals full blog information', () => {
    const blogDiv = component.container.querySelector('.blog');
    fireEvent.click(blogDiv);
    expect(blogDiv).toHaveTextContent(`${blog.title} -- ${blog.author}`);
    const blogDetails = component.container.querySelector('.blog-details');
    expect(blogDetails).toHaveStyle('display: ');
    expect(blogDetails).toHaveTextContent(`${blog.url}`);
  });
});