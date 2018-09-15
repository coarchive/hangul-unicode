import { all } from './unicode/complexTree';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllable from './composeSyllable';
import standardizeCharacter from './standardizeComp3Archaic';
// since these functions are exposed, the characters must be
// standardized so that the libaray can function properly
// Character checking is performed within standardizeCharacter

export const complex = (char1 = '', char2 = '', char3 = '', opts) => {
  if (opts.complex) {
    if (char1 !== '' && char2 !== '') {
      const d1 = all[standardizeCharacter(char1)];
      if (d1) {
        // depth 1 exists
        const d2 = d1[standardizeCharacter(char2)];
        if (d2) {
          // depth 2 exists
          const d2val = d2.$ || d2;
          if (char3 !== '') {
            // if there's a char3 character (optional)
            const d3 = d2[standardizeCharacter(char3)];
            // depth 3
            if (!d3) {
              // if depth 3 doesn't exist
              if (opts.hardFail) {
                throw Error(`Found "${d2val}" but cannot combine "${char1}" and "${char2}" with "${char3}"`);
              }
              return `${d2val}${char3}`;
              // at depth three, there should be a complex formed from
              // the char1 and char2 characters so return that instead
              // of the inputs concatenated
            }
            // depth 3 exists
            return d3; // this should always be a string
          }
          // the char3 character was falsy so just return the composition
          return d2val;
        }
        // if the code reaches this point, depth 2 doesn't exist
        if (opts.hardFail) {
          throw Error(`Cannot combine "${char1}" and "${char2}"`);
        }
      } else if (opts.hardFail) {
        throw Error(`There's no complex character that starts with "${char1}"`);
      }
    } else if (opts.hardFail) {
      throw Error('Cannot compose a complex with less than two values!');
    }
  } else if (opts.hardFail) {
    // error if hardFail is truthy and opts.complex is falsy
    throw Error('opts.complex is falsy!');
  }
  // couldn't do anything and hardFail was falsy
  // fail gracefully
  return `${char1}${char2}${char3}`;
};

export const syllable = (choChar = '', jungChar = '', jongChar = '', opts) => {
  if (choChar !== '' && jungChar !== '') {
    const cho = choNum[standardizeCharacter(choChar)];
    if (Number.isInteger(cho)) {
      // cho is valid
      const jung = jungNum[standardizeCharacter(jungChar)];
      if (Number.isInteger(jung)) {
        // jung is valid
        const jong = jongNum[standardizeCharacter(jongChar)];
        if (!Number.isInteger(jong)) {
          // jong is not valid
          if (opts.hardFail) {
            throw Error(`"${jongChar}" is not a valid jong character`);
          }
          return `${composeSyllable(cho, jung)}${jongChar}`;
        }
        // all clear!
        return composeSyllable(cho, jung, jong);
      }
      // if the code reaches this point,
      // the jungChar was not a valid jung character.
      if (opts.hardFail) {
        throw Error(`"${jungChar}" is not a valid jung Character`);
      }
    } else if (opts.hardFail) {
      throw Error(`"${choChar}" is not a valid cho Character`);
    }
  } else if (opts.hardFail) {
    throw Error('Cannot compose a syllable with less than two Characters');
  }
  // default return
  return `${choChar}${jungChar}${jongChar}`;
};
