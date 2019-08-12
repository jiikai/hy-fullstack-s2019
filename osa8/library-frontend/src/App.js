import React, {useState} from 'react';
import {useApolloClient,
  useMutation,
  useSubscription} from '@apollo/react-hooks';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import NavButton from './components/NavButton';
import NewBook from './components/NewBook';
import {LOGIN, BOOK_ADDED, ALL_BOOKS} from './queries';
import Recommended from './components/Recommended';

const App = () => {

  const client = useApolloClient();
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0] ? error.graphQLErrors[0].message
      : error.toString());
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: {
        genre: null
      }
    });
    if (!dataInStore.allBooks.find((b) => b.id === addedBook.id)) {
      client.writeQuery({
        data: {
          allBooks: [...dataInStore.allBooks, addedBook]
        },
        query: ALL_BOOKS,
        variables: {
          genre: null
        }
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(
        `A new book, ${addedBook.title} by ${addedBook.author.name} added`
      );
      updateCacheWith(addedBook);
    }
  });

  // React state
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token') ?
      localStorage.getItem('library-user-token') : null
  );
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);

  const [login] = useMutation(LOGIN, {
    onError: handleError, onCompleted: ({login}) => {
      setToken(login.value);
      localStorage.setItem('library-user-token', login.value);
    }
  });

  return (
    <div>
      {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      <div>
        <NavButton show={true} onClick={() => setPage('authors')}
          buttonText="authors" />
        <NavButton show={true} onClick={() => setPage('books')}
          buttonText="books" />
        <NavButton show={token} onClick={() => setPage('add')}
          buttonText="add" />
        <NavButton show={token} onClick={() => setPage('recommended')}
          buttonText="recommended" />
        <NavButton show={!token} onClick={() => setPage('login')}
          buttonText="login" />
        <LogoutButton show={token} logout={() => {
          setToken(null);
          localStorage.clear();
          client.resetStore();
        }} />
      </div>
      <Authors errorHandler={handleError} show={page === 'authors'}
        showEditAuthor={page === 'authors' && token} />
      <Books errorHandler={handleError} show={page === 'books'} />
      <NewBook errorHandler={handleError} show={page === 'add'} />
      <Recommended errorHandler={handleError} show={page === 'recommended'} />
      <LoginForm show={page === 'login'} login={login} />
    </div>
  );
};

export default App;