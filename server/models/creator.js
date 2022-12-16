const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorSchema = new Schema({

    name: String,
    email: String,
    businessName: String,
    niche: String,
    password: String,
    shortDescription: String,
    image: String,
    coverImage: String,
    isSubscribed: Boolean,
    isOnTrail: Boolean,
    isLogin: Boolean,
    
});

module.exports = mongoose.model('Creator', creatorSchema);