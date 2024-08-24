const express = require('express');
const { createPost, updatePost, getPosts, getPostById } = require('../controllers/postController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/post', uploadMiddleware.single('file'), createPost);
router.put('/post', uploadMiddleware.single('file'), updatePost);
router.get('/post', getPosts);
router.get('/post/:id', getPostById);

module.exports = router;
