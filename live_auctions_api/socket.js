const express =require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express.Router();

let io;
let adIo;


exports.init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  return io;
};

exports.initAdIo = (server, path = '/socket/adpage') => {
  adIo = new Server(server, {
    cors: {
      origin: "*",
    },
    path: path,
  });
  return adIo;
};

exports.getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

exports.getAdIo = () => {
  if (!adIo) {
    throw new Error('Socket.io not initialized');
  }
  return adIo;
};
