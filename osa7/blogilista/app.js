const config = require('./utils/config'),
  express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('./utils/logger');
const app = express();
const cors = require('cors'),
  blogsRouter = require('./controllers/blogs'),
  usersRouter = require('./controllers/users'),
  loginRouter = require('./controllers/login'),
  middleware = require('./utils/middleware'),
  mongoose = require('mongoose'),
  mongoURI = config.MONGODB_URI;

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

logger.info(`[mongoose] connecting to '${mongoURI}' ...`);
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  logger.info('[mongoose] connection ok!');
}).catch(error => {
  logger.error('[mongooose] ERROR: ', error);
});

app.use(cors());
app.use(middleware.tokenExtractor);
app.use(bodyParser.json());
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;