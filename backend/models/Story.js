const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    title: String,
    url: String,
    points: Number,
    author: String,
    postedAt: String,
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Story', StorySchema);