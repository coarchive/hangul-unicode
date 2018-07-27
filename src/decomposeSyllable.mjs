import { Character } from './types';
import { syllables } from './unicode/blocks';
import { cho, jung, jong } from './unicode/syllable';


export default ((val) => {
  const char = Character(val);
  if (!syllables.contains(char)) {
    throw Error('Decomposing a syllable requires a syllable to decompose!');
  }
  const code = char.codePointAt(0) - syllables.start;
  const jongNum = code % 28;
  const q = (code - jongNum) / 28;
  const jungNum = q % 21;
  const choNum = 0 | q / 21; // basically Math.floor(q / 21)
  return [cho[choNum], jung[jungNum], jong[jongNum]].filter(v => v);
  // the .filter(v => v) removes blank space in the array
});
// default: UP:>Character => CharacterGroup
