const games = require('../mockDb/gameSeed');

const get = () => {
  return games;
};

const add = game => {
  const checkForUniqueness = checkUnique(game.title);
  if (checkForUniqueness) {
    games.push(game);
    return game;
  } else {
    return 'this game is not unique';
  }
};

const checkUnique = gameTitle => {
  const filteredGames = games.filter(game => game.title.toLowerCase() === gameTitle.toLowerCase());
  if (filteredGames.length > 0) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  games,
  get,
  add,
};
