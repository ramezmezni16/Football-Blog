const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    .then(hash => User.create({ username, password: hash }))
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) return res.status(400).json('wrong credentials');
      return bcrypt.compare(password, user.password)
        .then(passOk => {
          if (!passOk) return res.status(400).json('wrong credentials');
          return jwt.sign({ username, id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({ id: user._id, username });
          });
        });
    })
    .catch(err => res.status(400).json('wrong credentials'));
};

exports.profile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

exports.logout = (req, res) => {
  res.cookie('token', '').json('ok');
};