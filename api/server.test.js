const server = require('./server');
const request = require('supertest');

const gameSeed = require('../mockDb/gameSeed')

describe('server', () => {
  describe('[GET] /games endpoint', () => {
    it('returns status code 200 when sucessfully reached', () => {
      return request(server)
        .get('/games')
        .expect(200);
    });
    it('returns a list of games when sucessfully reached', () => {
      const expectedGames = JSON.stringify(gameSeed);
      return request(server)
        .get('/games')
        .expect(expectedGames);
    });
  });

  describe('[GET] /games/:id endpoint', () => {
    it('returns status code 400 and an error message when a non-valid id is passed in the params', () => {
        const expectedMessage = JSON.stringify({
            message: 'no game exists with this id!',
        })
        return request(server)
          .get('/games/-1')
          .expect(400)
          .expect(expectedMessage)
      });
    it('returns status code 200 when sucessfully reached  and the correct game', () => {
      const expectedGame = JSON.stringify({
            id: 1,
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
      })
      return request(server)
        .get('/games/1')
        .expect(200)
        .expect(expectedGame);
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
      it('returns a status code of 400 and an error message when a non-unique game title is passed', () => {
        const duplicateGame = {
            title: 'pacman',
            genre: 'arcade',
        }
        const expectedMessage = JSON.stringify({
          message: 'there is already a title for this game!',
        });
        return request(server)
          .post('/games')
          .send(duplicateGame)
          .expect(400)
          .expect(expectedMessage);
      });
      it('returns a status code of 200 and the added game when a complete body is passed', () => {
        const completeBody = {
            id: 3,
            title: 'ludo',
            genre: 'board',
        }
        return request(server)
          .post('/games')
          .send(completeBody)
          .expect(201)
          .expect(completeBody);
      });
  });

  describe('[DELETE] /games/:id endpoint', () => {
    it('returns status code 400 and an error message when a non-valid id is passed in the params', () => {
        const expectedMessage = JSON.stringify({
            message: 'no game exists with this id!',
        })
        return request(server)
          .delete('/games/-1')
          .expect(400)
          .expect(expectedMessage)
      });
      it('returns status code 200 and a success message when a valid id is passed in the params', () => {
        const expectedMessage = JSON.stringify({
            message: 'game successfully deleted',
        })
        return request(server)
          .delete('/games/1')
          .expect(200)
          .expect(expectedMessage)
      });
  });
});
