import React from 'react';
import {
  render,
  waitForElement,
  findByTestId
} from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {

  test('renders login instead of blog list if user is logged out', async () => {
    const component = render(<App />);
    component.rerender(<App />);
    const login = await findByTestId(component.container, 'login-form');
    expect(login).toBeDefined();
    expect(findByTestId(component.container, 'bloglist')).rejects.toBeFalsy();
  });

  const mockLogin = () => {
    const user = {
      username: 'tester',
      id: '5d19f43a6508da17a0903506',
      token: '1231231214',
      name: 'Donald Tester'
    };
    localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
  };

  test('renders a list of blogs is a user is logged in', async () => {
    mockLogin();
    const component = render(<App />);
    component.rerender(<App />);
    const {children} = await findByTestId(component.container, 'bloglist');
    expect(children.length).toBe(3);
    expect(children[0]).toHaveTextContent('React patterns');
    expect(children[1])
      .toHaveTextContent('Go To Statement Considered Harmful');
    expect(children[2]).toHaveTextContent('Type wars');
  });
});