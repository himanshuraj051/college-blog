const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const upvoteSchema = new Schema({
    post: {
        type: Schema.ObjectId,
        ref: 'Blog'
    },
    upvotes: [{ author: { type: Schema.ObjectId, ref: 'User' } }]
});

module.exports = mongoose.model('Upvote', upvoteSchema);