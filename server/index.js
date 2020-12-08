const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const path = require('path');

const port = 3001;
const app = express();
const router = require('./src/router');
const syncServiceDetails = require('./src/sync_service_details');

app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(pino);
console.log("in app server", process.env);
syncServiceDetails();
// if(process.env.NODE_ENV !== "development"){
//   app.use(express.static(path.join(__dirname,'/../build/index.html')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'/../build/index.html'));
//   });
// }

app.get('/', (req, res) => {
  res.send("You are running the API! Congrats, you've done something incredibly basic");
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});


require("../server/routes/users_route.js")(app);
require("../server/routes/appointments_route.js")(app);

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
