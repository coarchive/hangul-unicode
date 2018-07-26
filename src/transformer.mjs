// tries to transform everything into disassembled standard hangul
import { Character, CharacterGroup } from './internalTypes';
import { hangul, syllables } from './unicode/blocks';
import mappings from './unicode/mappings';

export function transformCharacter(val) {
  const char = Character(val);
  if (hangul.contains(char) && !syllables.contains(char)) {
    // this if-statement isn't REALLY needed
    const comp = mappings[char];
    if (comp) {
      return comp;
    }
  }
  return char;
}
// transformCharacter: Character => CharacterGroup
export default function transform(group) {
  return CharacterGroup(group).map(transformCharacter);
}
// transform: CharacterGroup => CharacterGroup
