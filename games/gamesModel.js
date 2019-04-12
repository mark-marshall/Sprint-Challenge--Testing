const games = require('../mockDb/gameSeed');

const get = () => {
  return games;
};

const add = game => {
  const checkForUniqueness = checkUnique(game.title);
  if (checkForUniqueness) {
    const id = games[games.length - 1].id++;
    const newGame = { id, ...game };
    games.push(newGame);
    return newGame;
  } else {
    return 'this game is not unique';
  }
};

const checkUnique = gameTitle => {
  const filteredGames = games.filter(
    game => game.title.toLowerCase() === gameTitle.toLowerCase(),
  );
  if (filteredGames.length > 0) {
    return false;
  } else {
    return true;
  }
};

const findById = id => {
  const parsedId = parseInt(id)
  const game = games.filter(game => game.id === parsedId);
  if (game.length > 0) {
    return game[0];
  } else {
    return 'this game does not exist';
  }
};

module.exports = {
  games,
  get,
  add,
  findById,
};
