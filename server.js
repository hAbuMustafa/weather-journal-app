// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
let n = 0;
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;
const server = app.listen(port, () => {
  console.log(
    `Server running on port ${port}. Check it out at http://localhost:${port}/`
  );
});

app.get("/getRecent", (request, response) => {
  response.send(projectData);
});

app.post("/postRecent", (request, response) => {
  /* TODO: take temperature, date, user response*/
  projectData[`${n}`] = request.body;
  n++;
});
