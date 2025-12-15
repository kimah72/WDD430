require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${ process.env.MONGO_PASSWORD }@cluster0.huzsxja.mongodb.net/${ process.env.MONGO_DB }?retryWrites=true&w=majority`)
    .then(() => {
      console.log("Mongoose has connected to database!")
    })
    .catch(() => {
      console.log("Mongoose connection failed!");
    });

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// checks which type of error occurs
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// log requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// app.js — connection string stays the same

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
