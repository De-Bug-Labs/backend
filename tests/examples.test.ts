const sum = require('../src/examples')

test('adds 2 numbers', () => {
    expect(sum(1,2)).toEqual(3)
})