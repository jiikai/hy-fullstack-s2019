const {gql} = require('apollo-server');

const typeDefs = gql`
  type Author {
    id: ID!,
    name: String!,
    books: [Book]
    born: Int,
    bookCount: Int
  },
  type Book {
    author: Author!,
    genres: [String!]!,
    id: ID!,
    published: Int!,
    title: String!
  },
  type Mutation {
    addBook(
      author: String!,
      genres: [String!]!,
      published: Int!,
      title: String!,
    ): Book,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author,
    login(
      username: String!
      password: String!
    ): Token
  },
  type Query {
    hello: String!,
    allAuthors: [Author!]!,
    allBooks(author: String, genre: String): [Book!]!,
    authorCount: Int!,
    bookCount: Int!,
    me: User
  },
  type Subscription {
    bookAdded: Book!
  }  
  type Token {
    value: String!
  },
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
`;

module.exports = typeDefs;