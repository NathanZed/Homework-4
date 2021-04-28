const express = require('express');
const winston = require('winston');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io');

const bodyParser = require('body-parser');
const Name = require('../models/NameSchema');
const Mongoose = require('./mongoose');

const socket = io(http);

const port = 8080;

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

socket.on('connection', (socket) => {
  winstonLogger.log('info', 'connected');

  socket.on('disconnect', () => {
    winstonLogger.log('info', 'disconnected');
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('notifyTyping', {
      user: data.user,
      message: data.messages,
    });
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('notifyStopTyping');
  });

  socket.on('message', (msg) => {
    winstonLogger.log('info', `message: ${msg}`);

    // save name to the database
    Mongoose.then((db) => {
      winstonLogger.log('info', 'connected correctly to the server');
      const newName = new Name({ name: msg });

      newName.save();
    });
  });
});

http.listen(port, () => {
  winstonLogger.log('info', `Running on Port: ${port}`);
});
