const server = require('./server');
const request = require('supertest');

describe('server', () => {
  describe('[GET] /games endpoint', () => {
    it('returns status code 200 when sucessfully reached', () => {
      return request(server)
        .get('/games')
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
        .get('/games')
        .expect(expectedGames);
    });
  });

  describe('[POST] /games endpoint', () => {
    it('returns a status code of 422 and an error message when no body is passed', () => {
      const expectedMessage = JSON.stringify({
        message: 'please provide a game title and genre',
      });
      return request(server)
        .post('/games')
        .expect(422)
        .expect(expectedMessage);
    });
    it('returns a status code of 422 and an error message when an incomplete body is passed', () => {
        const incompleteBody = {
            title: 'ludo'
        }
        const expectedMessage = JSON.stringify({
          message: 'please provide a game title and genre',
        });
        return request(server)
          .post('/games')
          .send(incompleteBody)
          .expect(422)
          .expect(expectedMessage);
      });
      it('returns a status code of 200 and the added game when a complete body is passed', () => {
        const completeBody = {
            title: 'ludo',
            genre: 'board'
        }
        return request(server)
          .post('/games')
          .send(completeBody)
          .expect(201)
          .expect(completeBody);
      });
  });
});
