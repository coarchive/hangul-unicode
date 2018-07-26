// tries to transform everything into disassembled standard hangul
// it ignores syllables though
import { Character, CharacterGroup } from './internalTypes';
import { standardHangul } from './unicode/blocks';
import mappings from './unicode/mappings';

export function transformCharacter(val) {
  const char = Character(val);
  if (!standardHangul.contains(char)) {
    // this if-statement isn't REALLY needed
    return mappings[char] || char;
  }
  return char;
}
// transformCharacter: Character => CharacterGroup
export default function transform(group) {
  return CharacterGroup(group).map(transformCharacter);
}
// transform: CharacterGroup => CharacterGroup
