try {
  const dotenv = require('dotenv').config();
  if (dotenv.error)
    throw dotenv.error;
  console.log('[dotenv] loaded environment variables:\n', dotenv.parsed);
} catch (error) {
  console.error('[dotenv] ', error.message);
}

let PORT = process.env.PORT || 3003,
  MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT
};