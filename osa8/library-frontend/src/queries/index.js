import {gql} from 'apollo-boost';

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
  bookCount
  born
  id
  name
}
`;

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  author {name}
  genres
  id
  published
  title
}
`;

export const ALL_BOOKS = gql`
query allBooks($genre: String)
  {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  } ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  {
    allAuthors  {
      ...AuthorDetails
    }
  } ${AUTHOR_DETAILS}
`;



export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
} ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $author: String!,
    $genres: [String!]!,
    $published: Int!,
    $title: String!
  ) {
  addBook(
    author: $author,
    genres: $genres,
    published: $published,
    title: $title
  ) {
    author {name}
    genres
    id
    published
    title
  }
}`;

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    bookCount
    born
    id
    name
  }
}
`;

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`;

export const ME = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`;