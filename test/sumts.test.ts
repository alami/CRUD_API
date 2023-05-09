import {sumts} from '../src/sumts';
describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sumts(1, 2)).toBe(3);
    });
});