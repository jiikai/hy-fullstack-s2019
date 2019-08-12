const {PubSub, UserInputError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

const pubsub = new PubSub();

const handleError = (error, errorType, ...args) => {
  throw new errorType(error.message, ...args);
};

const resolvers = {
  Author: {
    bookCount: (root) => root.books.length,
  },
  Mutation: {
    addBook: (_, args, context) =>
      !context.currentUser ? null : Author.findOne({name: args.author})
        .then((author) =>
          author ? author : Author.create({name: args.author}))
        .then((author) =>
          Book.create({...args, author: author.id})
            .then((book) => {
              author.books = author.books.concat(book);
              return author.save().then(() => Promise.resolve(book));
            }))
        .then((book) => {
          const res = book.populate('author', ['id', 'name']).execPopulate();
          res.then((populatedBook) => {
            pubsub.publish('BOOK_ADDED', {bookAdded: populatedBook});
          });
          return res;
        }).catch((error) => {
          handleError(error, UserInputError, {invalidArgs: args});
        }),
    createUser: (_, args) =>
      User.create({
        username: args.username, favoriteGenre: args.favoriteGenre
      }).catch(error => {
        handleError(error, UserInputError, {invalidArgs: args});
      }),
    editAuthor: (_, args, context) =>
      !context.currentUser ? null : Author.findOneAndUpdate({
        name: args.name}, {born: args.setBornTo}, {new: true
      }).catch((error) => {
        handleError(error, UserInputError, {invalidArgs: args});
      }),
    login: (_, args) => {
      User.findOne({username: args.username}).then((user) => {
        if (!user || args.password !== 'secret')
          handleError({message: 'invalid credentials'}, UserInputError);
        return {
          value: jwt.sign({
            username: user.username, id: user._id,
          }, JWT_SECRET)
        };
      });
    }
  },
  Query: {
    allAuthors: () =>
      Author.find({}).populate('books', [
        'id', 'published', 'title'
      ]),
    allBooks: async (_, args) => {
      let author = null;
      if (args.author) {
        author = await Author.findOne({name: args.author});
        if (!author)
          return Promise.resolve([]);
      }
      const authorFilter = args.author ? {author: author.id} : {};
      const genreFilter = args.genre ? {genres: {$in: [args.genre]}} : {};
      return Book.find({...authorFilter, ...genreFilter}).populate('author');
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (__, _, context) => context.currentUser
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
};

module.exports = resolvers;