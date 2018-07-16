import { choNum, jungNum, jongNum } from './unicode/syllable';
import fuel from './fuel';
import { syllables } from './unicode/blocks';

const composeSyllableFn = (cho, jung, jong = 0) => (
  String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start)
);
export function* composeSyllableGenerator() {
  const choChar = yield;
  const cho = choNum[choChar];
  if (!Number.isInteger(cho)) {
    return choChar;
  }
  const jungChar = yield choChar;
  const jung = jungNum[jungChar];
  if (!Number.isInteger(jung)) {
    return `${choChar}${jungChar}`;
  }
  const maybeComplete = composeSyllableFn(cho, jung);
  const jongChar = yield maybeComplete;
  const jong = jongNum[jongChar];
  if (jong === null) {
    return maybeComplete;
  }
  if (!Number.isInteger(jong)) {
    return `${maybeComplete}${jongChar}`;
  }
  return composeSyllableFn(cho, jung, jong);
}
export default (fuel(composeSyllableGenerator));
