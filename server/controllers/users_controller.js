let _ = require('lodash');

const User = require("../models/users_model.js");


// Create and save a new User
exports.create = (req, res) => {
  // Validate request
  console.log("request",req.body);
  if (_.isEmpty(req.body)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log("req.body",req.body);

  // Create an User  
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    dob: req.body.dob, 
    fName: req.body.fName, 
    lName: req.body.lName, 
    langauge: req.body.langauge,
    port: req.body.port || " ",
    dependants: req.body.dependants || 0,
    nationality: req.body.nationality || " ", 
    type: req.body.type || " ",
    notifications: req.body.notifications,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
        code: err.Error
      });
      return;
    }
    else res.send(data);
  });
};

// Update Existing User
exports.update = (req, res) => {
  // Validate request
  console.log("request",req.body);
  if (_.isEmpty(req.body)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log("req.body",req.body);

  // Create an User  
  const user = new User({
    username: req.body.username,
    dob: req.body.dob, 
    fName: req.body.fName, 
    lName: req.body.lName, 
    langauge: req.body.langauge,
    port: req.body.port || " ",
    dependants: req.body.dependants || 0,
    nationality: req.body.nationality || " ", 
    notifications: req.body.notifications,
  });

  // Save User in the database
  User.update(user, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the User.",
        code: err.Error
      });
      return;
    }
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Users."
          });
        else res.send(data);
    });
};

exports.login = (req,res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log("req",req.body);
  const user = new User({username: req.body.username, password: req.body.password})
  User.login(user, (err, data) => {
    if (err) {
      if (err.kind === "not_found" || err.kind === "unauthorized") {
        res.status(200).send({
          error: true,
          message: `Username/password combo was incorrect`
        });
      }
      else {
        res.status(500).send({
          message: `Internal server error: ${err}`
        })
      }
    } 
    else {
      let resp = data;
      delete resp.password;
      res.send(data);
    };
  })
}

// // Update an User identified by the UserId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//     }
  
//     User.updatePassword(
//       req.body.currPassword,
//       req.body.newPassword,
//       req.body.username,
//       (err, data) => {
//         if (err) {
//           if (err.kind === "not_found") {
//             res.status(404).send({
//               message: `Not found User with id ${req.params.aID}.`
//             });
//           } 
//           else if(err.kind === "badpass") {
//             res.status(401).send({
//               message: "Bad password"
//             })
//           }
//           else {
//             res.status(500).send({
//               message: "Error updating User with id " + req.params.aID
//             });
//           }
//         } else res.send(data);
//       }
//     );
//   };
  
// Delete an User with the specified UserId in the request
exports.delete = (req, res) => {
    User.remove(req.params.username, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.aID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.params.aID
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
    });
};
