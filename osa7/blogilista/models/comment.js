const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
});

CommentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.models['Comment']
  ? mongoose.models['Comment'] : mongoose.model('Comment', CommentSchema);