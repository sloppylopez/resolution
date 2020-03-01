import { removeOppositeChars } from './challenge-2';

describe('removeOppositeChars', () => {
    it('Should return input string with removed cC', () => {
        const input = 'dabAcCaCBAcCcaDA';
        expect(removeOppositeChars(input)).toBe('dabCBAcaDA');
    });

    it('Should return input string with removed cC case 3', () => {
        const input = 'VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn';
        expect(removeOppositeChars(input)).toBe('yntvn');
    });
});
