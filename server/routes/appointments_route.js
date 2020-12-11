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

    // Update a appointment with appointmentname
    app.put("/appointment/cancel/reservation", appointment.cancelReservation);

    // Update a appointment with appointmentname
    app.put("/appointment/respond", appointment.respondToRequest);

    // Update a appointment with appointmentname
    app.put("/appointment/request", appointment.requestSlot);

    // Update a appointment with appointmentname
    app.delete("/appointment/cancel", appointment.delete);

    // Delete a appointment with appointmentname
    // app.delete("/appointment", appointment.delete);


};
    