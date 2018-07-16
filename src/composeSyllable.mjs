import { syllables } from './unicode/blocks';
import { choNum, jungNum, jongNum } from './unicode/syllable';

export default ((cho, jung, jong) => {
  const chNum = choNum[cho];
  const juNum = jungNum[jung];
  const joNum = jongNum[jong];
  if (!Number.isInteger(chNum)) {
    throw new Error(`${cho} is not a valid cho character`);
  } if (!Number.isInteger(juNum)) {
    throw new Error(`${jung} is not a valid jung character`);
  } if (!Number.isInteger(joNum)) {
    throw new Error(`${jong} is not a valid jong character`);
  }
  return String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start);
});
