const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: Schema.ObjectId,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Blog', blogSchema);