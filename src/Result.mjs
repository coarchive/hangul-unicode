import { CharacterGroup } from './internalTypes';

export default class Result {
  constructor(result = '', remainder = []) {
    this.result = result;
    this.remainder = CharacterGroup(remainder);
  }
}
// Result { result: Character, remainder: CharacterGroup }
