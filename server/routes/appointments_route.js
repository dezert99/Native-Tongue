module.exports = app => {
    const appointment = require("../controllers/appointments_controller.js");

    // Create a new appointment
    app.post("/appointments", appointment.create);

    // Retrieve all appointment
    app.get("/appointment", appointment.findAll);

    // Retrieve all appointment
    app.get("/appointment/applicant", appointment.getApplicantAppointments);

    // Retrieve all appointment
    app.get("/appointment/translator", appointment.getTranslatorAppointments);

    app.get("/appointment/language", appointment.byLanguage);

    // Update a appointment with appointmentname
    app.put("/appointment", appointment.update);

    // Delete a appointment with appointmentname
    // app.delete("/appointment", appointment.delete);


};
    