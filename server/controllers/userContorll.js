const UserModel = require("../models/userModel");

class User {
  // show all users
  static getAllUser = (req, res) => {
    let user;

    UserModel.find({})

      .then((foundedUsers) => {
        user = foundedUsers;
        if (user != null) {
          return res.status(200).json({
            success: true,
            user: user,
          });
        } else {
          return res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };

  // show single user
  static getUserById = (req, res) => {
    let user;

    UserModel.find({ _id: req.params.id })

      .then((foundedUsers) => {
        user = foundedUsers;
        if (user != null) {
          return res.status(200).json({
            success: true,
            user: user,
          });
        } else {
          return res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };

  // create new user
  static creatUser = (req, res) => {
    let user;

    UserModel.create({
      username: req.body.username,
      password: req.body.password,
    })

      .then((createdUser) => {
        user = createdUser;
        if (user != null) {
          return res.status(200).json({
            success: true,
          });
        } else {
          return res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };

  // update exist user
  static updateUserById = (req, res) => {
    let user;
    UserModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
        },
      },
      { upsert: true }
    )
      .then((updatedUser) => {
        user = updatedUser;
        if (user != null) {
          return res.status(200).json({
            success: true,
          });
        } else {
          return res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };

  // delete exist user
  static deleteUserById = (req, res) => {
    UserModel.findOneAndDelete({
      _id: req.params.id,
    })
      .then((deletedUser) => {
        return res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };
}

module.exports = User;
