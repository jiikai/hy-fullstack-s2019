const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

const context = async ({req}) => {
  const auth = req && req.headers.authorization ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id)
      .populate('friends');
    return {currentUser};
    } catch (e) {
      console.error(e);
    } 
  }
};

module.exports = context; 