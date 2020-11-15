const sql = require("../database");
const crypto = require('crypto')

const Users = function(Users) {
    this.username = Users.username;
    this.password = Users.password;
};

Users.create = (newUser, result) => {
    var date = new Date(); 
    const currDate = date.toISOString().slice(0, 19).replace('T', ' '); 
    // const hashedPass = crypto.createHash("sha256").update(newUsers.password);

    sql.query("INSERT INTO users SET username = ?, password = ?, dateJoined=?", [newUser.username, newUser.password, currDate], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      // console.log("THE UsersS RES OBJECT: ", res);
      console.log("created User: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
};


Users.updatePassword = (currPassword, newPassword, username, result) => {
  var date = new Date(); 
  const currDate = date.toISOString().slice(0, 19).replace('T', ' '); 
  const hashedCurrPass = crypto.createHash("sha256").update(currPassword);
//   const hashedNewPass = crypto.createHash("sha256").update(newPassword);

  sql.query(
    "SELECT password FROM users WHERE username = ?",
    [username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Users with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("res",res)
      if(currPassword != res.data[0]) {
        result({kind: "Incorrect current password"}, null);
      }
      else {
        sql.query("UPDATE users SET password= ? WHERE username= ?",[ newPassword,username] ,(err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            // console.log("Users: ", res);
            result(null, res);
        });
      }

    //   console.log("updated Users: ", { id: id, edited: currDate,  ...Users });
      result(null,  { id: id, edited: currDate,  ...Users });
    }
  );
};

Users.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Users: ", res);
      result(null, res);
    });
};

Users.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Users with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Users with id: ", id);
      result(null, res);
    });
  };

  module.exports = Users;