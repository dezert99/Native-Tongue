const sql = require("../database");

const Users = function(Users) {
    this.username = Users.username;
    this.password = Users.password;
    this.dob = Users.dob; 
    this.fName = Users.fName; 
    this.lName = Users.lName; 
    this.language = Users.langauge;
    this.port = Users.port;
    this.dependants = Users.dependants;
    this.nationality = Users.nationality; 
    this.type = Users.type;
    this.notifications = Users.notifications;
};

var date = new Date();
const currDate = date.toISOString().slice(0, 19).replace('T', ' '); 

Users.create = (newUser, result) => {
    console.log("TYPE IN SQL:", newUser)

    let language = newUser['language'];
    console.log("language ", language, newUser);
    let langArray = language.replace(" ", "").split(",");

    
    sql.query("INSERT INTO users SET email = ?, password = ?, first_name =?, last_name = ?, date_of_birth=?, num_dependants=?, port_of_entry=?, nationality=?, date_joined=?, type=?, languages=?", [newUser.username, newUser.password, newUser.fName, newUser.lName, newUser.dob, newUser.dependants, newUser.port, newUser.nationality, currDate, newUser.type, newUser.language], (err, res) => {
      if (err) {
        console.log("error in create users model: ", err);
        result(err, null);
        return;
      }
  
      // console.log("THE UsersS RES OBJECT: ", res);
      console.log("created User: ", { id: res.insertId, ...newUser });
      langArray.forEach((lang) => {
        sql.query("INSERT INTO language SET user_id = ?, language = ?", [res.insertId, lang.replace(" ","")], (err, res) => {
          if (err) {
            console.log("error in insert langauge users model: ", err);
            // result(err, null);
            return;
          }
      
          // console.log("THE UsersS RES OBJECT: ", res);
          // console.log("created User: ", { id: res.insertId, ...newUser });
          // result(null, { id: res.insertId, ...newUser });
        });
      })
      result(null, { id: res.insertId, ...newUser });
    });
};

Users.update = (newUser, result) => {
  console.log("XXXXXXXXXXXXXXXXXXXXXX", newUser.username)
  sql.query("UPDATE users SET first_name =?, last_name = ?, date_of_birth=?, num_dependants=?, port_of_entry=?, nationality=?, notifications=?, languages=? WHERE email=?", [newUser.fName, newUser.lName, newUser.dob, newUser.dependants, newUser.port, newUser.nationality, newUser.notifications, newUser.langauge, newUser.username], (err, res) => {
    if (err) {
      console.log("error in update users model: ", err);
      result(err, null);
      return;
    }

    // console.log("THE UsersS RES OBJECT: ", res);
    console.log("updated User: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};


// Users.updatePassword = (currPassword, newPassword, username, result) => {
//   sql.query(
//     "SELECT password FROM users WHERE email = ?",
//     [username],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Users with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }
//       console.log("res",res)
//       if(currPassword != res[0].password) {
//         result({kind: "badpass"}, null);
//       }
//       else {
//         sql.query("UPDATE users SET password= ? WHERE email= ?",[newPassword,username] ,(err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }
//             // console.log("Users: ", res);
//             result(null, res);
//         });
//       }

//     //   console.log("updated Users: ", { id: id, edited: currDate,  ...Users });
//       result(null,  {status: "Password updated"});
//     }
//   );
// };

Users.login = (user, result) => {
    sql.query("SELECT * FROM users WHERE email=?", [user.username], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("res",res, user);

        if (res.length == 0) {
            // not found Users with the id
            result({ kind: "not_found" }, null);
            return;
        }

        if(res[0].password === user.password) {
            result(null, res[0])
        }
        else {
            result({kind: "unauthorized"},null);
        }
    })
}
module.exports = Users;