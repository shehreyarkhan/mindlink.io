const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({

    name: String,
    genre: String,
    title: String,
    result: String,
    creatorId: String
});

module.exports = mongoose.model('Content', contentSchema);