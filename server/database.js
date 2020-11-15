const mysql = require('mysql');

// Database Connection for Production

// let config = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD,
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }

// let connection = mysql.createConnection(config);

// Database Connection for Development
console.log("proc",process.env)
let connection = mysql.createPool({
  host: '206.189.228.157',//process.env.DB_HOST,
  user: 'nativeuser',//process.env.DB_USER,
  database: 'nativetongue',//process.env.DB_DATABASE,
  password: 'Nativetongue123!'//process.env.DB_PASS,
});



// Attempt to catch disconnects 
connection.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});

module.exports = connection;