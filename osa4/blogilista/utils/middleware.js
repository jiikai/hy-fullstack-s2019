const logger = require('./logger');

const requestLogger = (req, _res, next) => {
  logger.info(`[logger] ${req.method} ${req.path} ${req.body}`);
  next();
};

const tokenExtractor = (req, _res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer '))
    req.token = auth.substring(7);
  next();
};

const unknownEndpoint = (_req, res) =>
  res.status(404).send({error: 'unknown endpoint'});

const errorHandler = (error, _req, res, next) => {
  logger.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId')
    return res.status(400).json({error: 'Malformed id.'});
  else if (error.name === 'ValidationError')
    return res.status(400).json({error: error.message});
  else if (error.name === 'JsonWebTokenError')
    return res.status(401).json({error: 'invalid token'});
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};