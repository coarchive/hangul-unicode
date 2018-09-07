import { syllables } from './unicode/blocks';

export default (cho, jung, jong = 0) => (
  String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start)
  // this is the actual function that makes unicode syllable characters
  // where the characters are mapped to numbers. Take a look at
  // { choNum, jungNum, jongNum } from './unicode/syllable'
);
