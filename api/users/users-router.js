const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err))
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  Users.getById(id)
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err))
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  Users.insert(req.body)
    .then(result => res.status(201).json(result))
    .catch(err => res.json(err))
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  Users.update(id, req.body)
    .then(result => res.status(201).json(result))
    .catch(err => res.json(err))
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let post = ""
  Users.getById(id)
    .then(result => { return post = result })
  Users.remove(id)
    .then(result => res.status(200).json(post))
    .catch(err => res.json(err))
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  Posts.get()
    .then(posts => {
      const filteredPosts = posts.filter(post => post.user_id == id)
      res.status(200).json(filteredPosts)
    })
    .catch(err => res.json(err))
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  Posts.insert({ text: text, user_id: id })
    .then(result => res.status(201).json(result))
    .catch(err => res.json(err))
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;