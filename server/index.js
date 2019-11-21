/* eslint-disable no-multi-spaces */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const pg = require("pg");

const conString =  "postgres://hzmprocs:GUGKXpnl7MgT8m1v20Z2b3acDL6KdhKq@raja.db.elephantsql.com:5432/hzmprocs"; // Can be found in the Details page
const client = new pg.Client(conString);
client.connect((err) => {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query("SELECT NOW() AS \"theTime\"", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z --- prints out the time
    client.end();
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
