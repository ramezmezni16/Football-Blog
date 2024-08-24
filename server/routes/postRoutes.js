const express = require('express');
const { createPost, updatePost, getPosts, getPostById } = require('../controllers/postController');

const router = express.Router();

// Routes without middleware for file uploads
router.post('/post', createPost);
router.put('/post', updatePost);
router.get('/post', getPosts);
router.get('/post/:id', getPostById);

module.exports = router;
