import { Character, CharacterGroup } from './internalTypes';

export default class Result {
  constructor(result = '', remainder = []) {
    this.result = Character(result);
    this.remainder = CharacterGroup(remainder);
  }
}
// Result: UI:>Character => UI:>CharacterGroup => Result
