import { addNumbers as add } from '../src/examples';

test('adds 2 numbers', () => {
	expect(add(1, 2)).toEqual(3);
});
