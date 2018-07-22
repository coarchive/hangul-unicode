import { choNum, jungNum, jongNum } from './unicode/syllable';
import { syllables } from './unicode/blocks';
import { transformNonStandardChar as transform } from './transformer';
// import Y from './ComposeGeneratorYield';

export const composeSyllableFn = (cho, jung, jong = 0) => (
  String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start)
);
export default ((choChar, jungChar, jongChar = null) => {
  const cho = choNum[transform(choChar).join``];
  const jung = jungNum[transform(jungChar).join``];
  if (!choChar && !jungChar) {
    throw new Error('You must provide a cho and jung character to make a syllable');
  }
  let jong;
  if (jongChar) {
    jong = jongNum[transform(jongChar).join``];
  }
  if (!Number.isInteger(cho)) {
    throw new Error(`"${choChar}" is not a valid cho character`);
  } if (!Number.isInteger(jung)) {
    throw new Error(`"${jungChar}" is not a valid jung character`);
  } if (jong && !Number.isInteger(jong)) {
    throw new Error(`"${jongChar}" is not a valid jong character`);
  }
  return composeSyllableFn(cho, jung, jong);
});
