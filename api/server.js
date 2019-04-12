const express = require('express');

const games = require('../games/gamesModel');

const server = express();

server.use(express.json());

/*
[GET] no params or body require, an array of games is returned
*/
server.get('/', (req, res) => {
    const gamesList = games.get();
    res.status(200).json(gamesList);
  });

module.exports = server;
