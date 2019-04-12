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

    describe('add handler', () => {
        it('adds a game onto the array', () => {
            const newGame = {
                title: 'ludo',
                genre: 'board'
            }
            const games = gamesModel.get();
            expect(games).toHaveLength(3);
            gamesModel.add(newGame)
            expect(games).toHaveLength(4);
            expect(games[games.length-1]).toEqual(newGame);
        })
    })
})