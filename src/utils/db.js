const sql = require("../../server/database");

export default function grabSQLData(sqlstr, params){
    return new Promise((resolve, reject) => {
      sql.query(sqlstr, params, (err, res) => {
        if (err) {
          reject(err);
        }
    
        return resolve(res);
      })
    })
  }
  