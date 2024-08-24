const Post = require('../models/Post');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    Post.create({ title, summary, content, cover: newPath, author: info.id })
      .then(post => res.json(post))
      .catch(err => res.status(400).json(err));
  });
};

exports.updatePost = (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    Post.findById(id)
      .then(post => {
        if (post.author.toString() !== info.id) {
          return res.status(400).json('you are not the author');
        }
        return post.update({ title, summary, content, cover: newPath || post.cover })
          .then(() => res.json(post))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  });
};

exports.getPosts = (req, res) => {
  Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20)
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json(err));
};

exports.getPostById = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('author', ['username'])
    .then(post => res.json(post))
    .catch(err => res.status(400).json(err));
};
