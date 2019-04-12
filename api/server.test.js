const server = require('./server');
const request = require('supertest');

describe('server', () => {
  describe('[GET] / endpoint', () => {
    it('returns status code 200 when sucessfully reached', () => {
      return request(server)
        .get('/')
        .expect(200);
    });
    it('returns a list of games when sucessfully reached', () => {
      const expectedGames = JSON.stringify([
        {
          title: 'Pacman',
          genre: 'Arcade',
          releaseYear: 1980,
        },
        {
          title: 'Space Invaders',
          genre: 'Arcade',
          releaseYear: 1978,
        },
        {
          title: 'Snake',
          genre: 'Video',
          releaseYear: 1976,
        },
      ]);
      return request(server)
        .get('/')
        .expect(expectedGames);
    });
  });
});
