const Story = require('../models/Story');

exports.getAllStories = async (req, res) => {
    const stories = await Story.find().sort({ points: -1 });
    res.json(stories);
};

exports.toggleBookmark = async (req, res) => {
    const story = await Story.findById(req.params.id);
    const userId = req.user.id;
    if (story.bookmarks.includes(userId)) {
        story.bookmarks = story.bookmarks.filter(id => id.toString() !== userId);
    } else {
        story.bookmarks.push(userId);
    }
    await story.save();
    res.json(story);
};

exports.getBookmarks = async (req, res) => {
    try {
        const stories = await Story.find({ bookmarks: req.user.id }).sort({ points: -1 });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};