import assertChar from './assertChar';
import { isSyllable, syllables } from './unicode/blocks';
import { cho, jung, jong } from './unicode/syllable';

export default ((syllable) => {
  assertChar(syllable);
  if (!isSyllable(syllable)) {
    throw new Error('Decomposing a syllable requires a syllable to decompose!');
  }
  const code = syllable.codePointAt(0) - syllables.start;
  const jongNum = code % 28;
  const q = (code - jongNum) / 28;
  const jungNum = q % 21;
  const choNum = 0 | q / 21;
  return [cho[choNum], jung[jungNum], jong[jongNum]].filter(v => v);
});
