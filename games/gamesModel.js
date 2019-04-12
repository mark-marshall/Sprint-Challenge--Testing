const games = require('../mockDb/gameSeed')

const get = () => {
  return games;
};

const add = game => {
    games.push(game);
    return game;
}

module.exports = {
  games,
  get,
  add,
};
