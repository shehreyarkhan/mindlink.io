const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cryptoSchema = new Schema({

    name: String,
    symbol: String,
    price: String,
    trend: Boolean,
    imgUrl: String,
    sequence: Number
});

module.exports = mongoose.model('Crypto', cryptoSchema);