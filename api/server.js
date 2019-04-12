const express = require('express');

const games = require('../games/gamesModel');

const server = express();

server.use(express.json());

/*
[GET] no params or body require, an array of games is returned
*/
server.get('/games', (req, res) => {
  const gamesList = games.get();
  res.status(200).json(gamesList);
});

/*
[POST] a valid body must be sent with the request:
{
title: 'name', // required
genre: 'genre', // required
releaseYear: 1980 // not required
}
*/

server.post('/games', (req, res) => {
  const game = req.body;
  if (game.title && game.genre) {
    const addedGame = games.add(game);
    res.status(201).json(addedGame);
  } else {
    res.status(422).json({ message: 'please provide a game title and genre' });
  }
});

module.exports = server;
