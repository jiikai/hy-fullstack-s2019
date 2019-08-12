const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./utils/config');
const context = require('./context');
const resolvers = require('./resolvers');
const typeDefs = require('./typedefs');

mongoose.connect(config.MONGODB_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true
}).then(() => {
  console.log('connected to MongoDB');
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message);
});

const server = new ApolloServer({typeDefs, resolvers, context});

server.listen().then(({url, subscriptionsUrl}) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
