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
[GET] a valid id should be passed in the params
*/
server.get('/games/:id', (req, res) => {
  const { id } = req.params;
  const game = games.findById(id);
  if (game.title) {
    res.status(200).json(game);
  } else {
    res.status(400).json({ message: 'no game exists with this id!' });
  }
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
    if (addedGame.title) {
      res.status(201).json(addedGame);
    } else {
      res
        .status(400)
        .json({ message: 'there is already a title for this game!' });
    }
  } else {
    res.status(422).json({ message: 'please provide a game title and genre' });
  }
});

/*
[DELETE] a valid id should be passed in the params:
*/
server.delete('/games/:id', (req, res) => {
  const { id } = req.params;
  const deletedGame = games.remove(id);
  if (deletedGame) {
    res.status(200).json({ message: 'game successfully deleted'  });
  } else {
    res.status(400).json({ message: 'no game exists with this id!' });
  }
});

module.exports = server;
