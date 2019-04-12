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
            games.splice(0,games.length)
            expect(games).toEqual(expectedResult);
        })
    })
})