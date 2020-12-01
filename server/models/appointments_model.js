const sql = require("../database");

const Appointment = function(appointment) {
  this.id = appointment.id;
  this.timeStart = appointment.timeStart;
  this.timeEnd = appointment.timeEnd;
  this.description = appointment.description;
  this.translatorUserId = appointment.translatorUserId;
  this.applicantUserId = appointment.applicantUserId;
  this.status = appointment.status;
  this.location = appointment.location;
};

Appointment.create = (appointment, result) => {
    sql.query("INSERT INTO appointments SET time_start = ?, time_end = ?, description =?, translator_user_id = ?, applicant_user_id=?, status=?, location=?", [appointment.timeStart, appointment.timeEnd, appointment.description, appointment.translatorUserId, appointment.applicantUserId ? appointment.applicantUserId : -1, appointment.status, appointment.location], (err, res) => {
      if (err) {
        console.log("error in appointment model: ", err);
        result(err, null);
        return;
      }
  
      console.log("created appointment: ", { id: res.insertId, ...appointment });
      result(null, { id: res.insertId, ...appointment });
    });
};

Appointment.getAll = result => {
  sql.query("SELECT * FROM appointments", (err, res) => {
    if (err) {
      console.log("error in appointments model getAll: ", err);
      result(null, err);
      return;
    }

    console.log("appointments: ", res);
    result(null, res);
  });
};

Appointment.getApplicantAppointments = (applicantID,result) => {
  sql.query("SELECT * FROM appointments WHERE applicant_user_id=?", [applicantID], (err, res) => {
    if (err) {
      console.log("error in appointments model getAPlicantScheduled: ", err);
      result(null, err);
      return;
    }

    console.log("appointments: ", res);
    result(null, res);
  });
};

Appointment.getTranslatorAppointments = (translatorID,result) => {
  sql.query("SELECT * FROM appointments WHERE translator_user_id=?", [translatorID], (err, res) => {
    if (err) {
      console.log("error in appointments model getAPlicantScheduled: ", err);
      result(null, err);
      return;
    }

    console.log("appointments: ", res);
    result(null, res);
  });
};

Appointment.byLangauge = async (langauge, result) => {
  let ids = await sql.query("SELECT * FROM language WHERE language=?", [langauge], async (err, res) => {
    if (err) {
      console.log("error in appointments model byLanguage: ", err);
      result(null, err);
      return;
    }

    console.log("appointments: ", res);
    return res;
  });
  let resp = [];
  console.log("ids", ids);
  ids.forEach(async id => {
    await sql.query("SELECT * FROM appointments WHERE translator_user_id=?", [id.user_id], (err, res) => {
      if (err) {
        console.log("error in appointments model getAPlicantScheduled: ", err);
        result(null, err);
        return;
      }
  
      console.log("appointments: ", res);
      resp.push(res);
    });
  })
  console.log("resp",resp);
}

Appointment.remove = (id, result) => {
    sql.query("DELETE FROM appointments WHERE appointment_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted appointment with id: ", id);
      result(null, res);
    });
  };

  Appointment.update = (appointment, result) => {
    console.log("apt",appointment);
    sql.query("UPDATE appointments SET time_start = ?, time_end = ?, description =?, translator_user_id = ?, applicant_user_id=?, status=?, location=? WHERE appointment_id=?", [appointment.timeStart, appointment.timeEnd, appointment.description, appointment.translatorUserId, appointment.applicantUserId ? appointment.applicantUserId : -1, appointment.status, appointment.location, appointment.id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("updated appointment with id: ", appointment.id);
      result(null, res);
    });
  };

  module.exports = Appointment;