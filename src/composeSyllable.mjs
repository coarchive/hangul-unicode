import { syllables } from './unicode/blocks';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import { toStandardChar } from './toStandard';
import { Character } from './types';

export const composeSyllableFn = (cho, jung, jong = 0) => (
  String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start)
);
export default ((choChar, jungChar, jongChar = null) => {
  const cho = choNum[toStandardChar(Character(choChar))];
  const jung = jungNum[toStandardChar(Character(jungChar))];
  // even though toStandardChar sometimes outputs an array
  // there's no need to check since all we want are the
  // sincle character standard characters.
  if (!choChar && !jungChar) {
    throw new Error('You must provide a cho and jung character to make a syllable');
  }
  let jong;
  if (jongChar) {
    jong = jongNum[toStandardChar(Character(jongChar))];
  } if (!Number.isInteger(cho)) {
    throw Error(`"${choChar}" is not a valid cho character`);
  } if (!Number.isInteger(jung)) {
    throw Error(`"${jungChar}" is not a valid jung character`);
  } if (jongChar && !Number.isInteger(jong)) {
    throw Error(`"${jongChar}" is not a valid jong character`);
  }
  return composeSyllableFn(cho, jung, jong);
});
// default: UP:>String => UP:>String => UP:>String | Null => String
