import {
  consonants, vowels, hangulToKey, keyToHangul,
} from '../src/unicode/characters';

const characterEntries = Object.entries(Object.assign({}, consonants, vowels));
const keyToHangulEntries = Object.entries(keyToHangul);
describe('consonant and vowel object structure', () => {
  characterEntries.forEach((pair) => {
    test(`${pair[0]} has a truthy value`, () => {
      expect(pair[1]).toBeTruthy();
    });
  });
});
describe('keyToHangul agrees with hangulToKey', () => {
  keyToHangulEntries.forEach((pair) => {
    const latin = pair[0];
    const hangul = pair[1];
    test(`{${latin}: "${hangul}"}`, () => {
      expect(hangulToKey[hangul]).toBe(latin);
    });
  });
});
