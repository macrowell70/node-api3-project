const Users = require('../users/users-model');

function logger(req, res, next) {
  const date = new Date();
  console.log(req.method, req.url, date.toLocaleString());
  next();
  // DO YOUR MAGIC
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      req.user = user
      next();
    })
    .catch(err => res.json({ message: "server error" }))
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
