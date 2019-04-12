const games = require('../mockDb/gameSeed')

const get = () => {
  return games;
};

module.exports = {
  games,
  get,
};
