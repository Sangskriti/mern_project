const express = require('express');
const router = express.Router();
const { getAllStories, toggleBookmark, getBookmarks } = require('../controllers/storyController'); 
const auth = require('../middleware/authMiddleware');

router.get('/', getAllStories);
router.get('/saved', auth, getBookmarks); 
router.post('/:id/bookmark', auth, toggleBookmark);

module.exports = router;