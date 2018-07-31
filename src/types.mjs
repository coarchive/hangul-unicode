export const isCharacter = val => typeof val === 'string' && val.length === 1;
export const Character = (val) => {
  if (typeof val !== 'string') {
    throw TypeError('A Character must be a String');
  } if (val.length !== 1) {
    throw TypeError(`"${val}" is not a Character`);
  }
  return val;
};
export class CharacterGroup {
  static isCharacterGroup(val) {
    // while Characters can be a CharacterGroup this function ignores characters
    return val.length > 1 && (Array.isArray(val) || typeof val === 'string');
  }

  constructor(arrayLike, wasArray = Array.isArray(arrayLike)) {
    // it's not the ChraacterGroup constructor's job to check if everything's
    // a character. That's delagated to the actual functions that use it.
    if (wasArray) {
      this.ary = arrayLike;
    } else if (typeof arrayLike === 'string') {
      this.ary = Array.from(arrayLike);
    } else {
      throw TypeError('A character group must be a String or Array');
    }
    this.wasArray = wasArray;
  }

  deepMap(func) {
    const res = [];
    let rem = this.ary.slice();
    if (this.wasArray) {
      // if the group is not a String then there can't be any sub groups
      let subGroupIdx = rem.findIndex(CharacterGroup.isCharacterGroup);
      while (subGroupIdx !== -1) { // I could use
        const group = new CharacterGroup(this.ary[subGroupIdx]);
        rem.splice(subGroupIdx, 1, ...group.deepMap(func));
        subGroupIdx = rem.findIndex(CharacterGroup.isCharacterGroup);
      }
    }
    while (rem.length) {
      const comp = func(rem);
      // func needs to return a Result like interface for this to work
      res.push(comp.result);
      rem = comp.remainder;
    }
    if (res.length === 1) {
      return res[0];
    }
    return res;
  }
}
