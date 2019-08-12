/// <reference types="Cypress" />

const baseUrl = 'http://localhost:3000';
const ourUser = {
  username: 'ourUser',
  password: 'seKret',
  name: 'Our User'
};
const anotherUser = {
  username: 'anotherUser',
  password: 'retseK',
  name: 'Another User'
};
const blogByUs = {
  title: 'A blog',
  author: 'A test author',
  url: 'https://foo.com'
};
const blogByAnother = {
  title: 'Another blog',
  author: 'A test author',
  url: 'https://bar.com/'
};
const testComment = 'Testing comment functionality';
const testId = (testId) => `[data-testid=${testId}]`;

describe('Blog ', function() {

  beforeEach(function() {
    cy.request('POST', `${baseUrl}/api/testing/reset`);
    cy.request('POST', `${baseUrl}/api/users`, ourUser);
    cy.request('POST', `${baseUrl}/api/users`, anotherUser).then(res1 => {
      cy.request('POST', `${baseUrl}/api/login`, {
        username: anotherUser.username,
        password: anotherUser.password
      }).then(res2 => {
        cy.request({
          method: 'POST',
          url: `${baseUrl}/api/blogs`,
          body: {...blogByAnother,
            user: res1.body.id
          },
          auth: {
            bearer: res2.body.token
          }
        });
      });
    });
    cy.visit(baseUrl);
  });

  it('shows the login form if logged out', function() {
    cy.get(testId('login-form'));
  });

  describe('when logged in', function() {

    beforeEach(function() {
      cy.get(testId('login-input-username')).type(ourUser.username);
      cy.get(testId('login-input-password')).type(ourUser.password);
      cy.get(testId('login-button-submit')).click();
      cy.contains(`${ourUser.name} logged in`);
    });

    it('contains the blog list element', function() {
      cy.get(testId('bloglist'));
    });

    it('contains a navbar with working links and a logout button', function() {
      cy.get(testId('navbar-link-users')).click();
      cy.contains(ourUser.name);
      cy.get(testId('navbar-link-home')).click();
      cy.get(testId('bloglist'));
      cy.get(testId('button-logout')).click();
      cy.get(testId('login-form'));
    });

    it('creating and commenting blogs work', function() {
      
      cy.get(testId('togglable-content')).click();
      cy.get(testId('blog-input-title')).type(blogByUs.title);
      cy.get(testId('blog-input-author')).type(blogByUs.author);
      cy.get(testId('blog-input-url')).type(blogByUs.url);
      cy.get(testId('blog-button-submit')).click();

      cy.get(testId('bloglist')).within(function() {
        cy.contains(blogByUs.title).contains(blogByUs.author).click();
      });
      cy.get(testId('blog-div')).within(function() {
        cy.get(testId('comment-form')).within(function() {
          cy.get(testId('comment-input-write')).type(testComment);
          cy.get(testId('comment-button-submit')).click();
        });
        cy.contains(testComment);
        cy.contains('0 likes').as('likes');
        cy.get(testId('blog-button-like')).click();
        cy.get('@likes').contains('1 likes');
        cy.get('blog-button-remove').click();
      });
        
      })
        
          
        });
    });

    });
  });
});