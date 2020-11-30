let _ = require('lodash');

const Appointment = require("../models/appointments_model.js");


// Create and save a new appointment
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

  // Create an appointment  
  const appointment = new Appointment({
    id: req.body.appointmentId,
    timeStart: req.body.timeStart,
    timeEnd: req.body.timeEnd, 
    description: req.body.description, 
    translatorUserId: req.body.translatorUserId, 
    applicantUserId: req.body.applicantUserId,
    status: req.body.status,
    location: req.body.location
  });

  // Save appointment in the database
  Appointment.create(appointment, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the appointment.",
        code: err.Error
      });
      return;
    }
    else res.send(data);
  });
};

// Retrieve all appointments from the database.
exports.findAll = (req, res) => {
    Appointment.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving appointments."
          });
        else res.send(data);
    });
};

//Get
exports.getApplicantAppointments = (req, res) => {
  let applicantUserId = req.body.applicantUserId;
  console.log("params",req.params);
  console.log("body",req.body);

  Appointment.getApplicantAppointments(applicantUserId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments."
      });
    else res.send(data);
  });
}

//Get
exports.getTranslatorAppointments = (req, res) => {
  let translatorUserId = req.body.translatorUserId;
  console.log("params",req.params);
  console.log("body",req.body);

  Appointment.getTranslatorAppointments(translatorUserId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments."
      });
    else res.send(data);
  });
}

// // Update an appointment identified by the AptId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//     }
  
//     Appointment.updatePassword(
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

// Delete an appointment with the specified appointmentId in the request
exports.delete = (req, res) => {
    Appointment.remove(req.params.appointmentId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found appointment with id ${req.params.appointmentId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete appointment with id " + req.params.appointmentId
            });
          }
        } else res.send({ message: `appointment was deleted successfully!` });
    });
};
