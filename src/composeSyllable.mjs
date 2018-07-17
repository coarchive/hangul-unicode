import { choNum, jungNum, jongNum } from './unicode/syllable';
import { syllables } from './unicode/blocks';
import Y from './ComposeGeneratorYield';

const composeSyllableFn = (cho, jung, jong = 0) => (
  String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start)
);
export default function* () {
  const choChar = yield;
  const cho = choNum[choChar];
  if (!Number.isInteger(cho)) {
    return new Y('', choChar);
  }
  const jungChar = yield new Y(choChar);
  const jung = jungNum[jungChar];
  if (!Number.isInteger(jung)) {
    return new Y(choChar, jungChar);
  }
  const maybeComplete = composeSyllableFn(cho, jung);
  const jongChar = yield new Y(maybeComplete);
  const jong = jongNum[jongChar];
  if (jong === null) {
    return new Y(maybeComplete);
  }
  if (!Number.isInteger(jong)) {
    return new Y(maybeComplete, jong);
  }
  return new Y(composeSyllableFn(cho, jung, jong));
}
/*
export default function (choChar, jungChar, jongChar) {
  const cho = choNum[choChar];
  const jung = jungNum[jungChar];
  const jong = jongChar ? jongNum[jongChar] : 0;
  if (!Number.isInteger(cho)) {
    throw new Error(`"${choChar}" is not a valid cho character`);
  } if (!Number.isInteger(jung)) {
    if (jungChar === undefined) {
      throw new Error('You must provide a jung character to make a syllable');
    }
    throw new Error(`"${jungChar}" is not a valid jung character`);
  } if (jongChar && !Number.isInteger(jong)) {
    throw new Error(`"${jongChar}" is not a valid jong character`);
  }
  return String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start);
}
*/
