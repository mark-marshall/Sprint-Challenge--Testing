const express = require('express');

const games = require('../games/gamesModel');

const server = express();

server.use(express.json());


module.exports = server;
