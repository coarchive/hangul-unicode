import { syllables } from './unicode/blocks';
import { cho, jung, jong } from './unicode/syllable';
import { character } from './types';

export const splitSyllable_T = (char) => {
  const code = char.codePointAt(0) - syllables.start;
  const jongNum = code % 28;
  const q = (code - jongNum) / 28;
  const jungNum = q % 21;
  const choNum = 0 | q / 21; // basically Math.floor(q / 21)
  return [cho[choNum], jung[jungNum], jong[jongNum]].filter(v => v);
  // the .filter(v => v) removes blank space in the array
};
export default (datum, opts = {}) => {
  const char = character(datum);
  if (!syllables.contains_T(char)) {
    if (opts.hardFail) {
      throw Error('Decomposing a syllable requires a syllable to decompose!');
    }
    return [datum];
    // if there's no hardFail, the function must
    // still return the same type as it would have
    // if it didn't fail
  }
  const resAry = splitSyllable_T(char);
  if (opts.grouped) {
    return resAry;
  }
  return resAry.join('');
};
