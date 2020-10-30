const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    id: String,
    email: String,
    name: String,
    text: String,
    date: Date
}); 

const Email = mongoose.model('Email', emailSchema, 'emails');

module.exports = { Email };