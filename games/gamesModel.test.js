const gamesModel = require('./gamesModel');

describe('gamesModel', () => {
    describe('get handler', () => {
        it('returns a list of games with correct length',() => {
            const games = gamesModel.get();
            expect(games).toHaveLength(3);
        })
        it('returns an empty array when there are no games',() => {
            const games = gamesModel.get();
            const expectedResult = [];
            const emptyGames = games.filter(game => game.title === 'xsandskn')
            expect(emptyGames).toEqual(expectedResult);
        })
    })

    describe('getById handler', () => {
        it('returns an error message when a non valid id is passed',() => {
            const expectedMessage = 'this game does not exist'
            const game = gamesModel.findById(-1);
            expect(game).toBe(expectedMessage);
        })
        it('returns a game when a correct id is passed',() => {
            const expectedResult = {
                id: 1,
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980,
            }
            const game = gamesModel.findById(1);
            expect(game).toEqual(expectedResult);
        })
    })

    describe('add handler', () => {
        it('adds a game onto the array', () => {
            const newGame = {
                id: 3,
                title: 'ludo',
                genre: 'board',
            }
            const games = gamesModel.get();
            expect(games).toHaveLength(3);
            gamesModel.add(newGame)
            expect(games).toHaveLength(4);
            expect(games[games.length-1]).toEqual(newGame);
        })
        it('rejects request to add a duplicated games', () => {
            const duplicateGame = {
                title: 'Pacman',
                genre: 'arcade'
            }
            const expectedMessage = 'this game is not unique';
            const duplicateGameResponse = gamesModel.add(duplicateGame);
            expect(duplicateGameResponse).toBe(expectedMessage);
        })
        it('rejects request to add a duplicated game in different case', () => {
            const duplicateGame = {
                title: 'pacman',
                genre: 'arcade'
            }
            const expectedMessage = 'this game is not unique';
            const duplicateGameResponse = gamesModel.add(duplicateGame);
            expect(duplicateGameResponse).toBe(expectedMessage);
        })
    })
})