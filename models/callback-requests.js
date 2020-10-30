const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callbackRequestSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
}); 

const CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema, 'callback-requests');

module.exports = { CallbackRequest };