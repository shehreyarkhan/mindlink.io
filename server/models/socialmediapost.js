const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialMediaPostSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorId: {
      type: String,
      required: true,
    }

});

module.exports = mongoose.model('SocialMediaPost', SocialMediaPostSchema);