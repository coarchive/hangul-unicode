import { all } from './unicode/complexTree';
import { choNum, jungNum, jongNum } from './unicode/syllable';
import composeSyllable from './composeSyllable';
import computeOpts from './options';
import { standardizeCharacter } from './standardize';
import { valCharacter } from './types';
// since these functions are exposed, the characters must be
// standardized so that the libaray can function properly
// Character checking is performed within standardizeCharacter
export const complex = (datum1 = '', datum2 = '', datum3 = '', opts) => {
  const cOpts = computeOpts(opts);
  const vCAry = [datum1, datum2, datum3].map(valCharacter);
  const [char1, char2, char3] = vCAry.map(vC => vC[1]);
  if (vCAry[0][0]) {
    // the first input is a Character
    if (vCAry[1][0]) {
      // the second input is not a Character
      if (cOpts.complex) {
        const d1 = all[standardizeCharacter(char1)];
        if (d1) {
        // depth 1 exists
          const d2 = d1[standardizeCharacter(char2)];
          if (d2) {
          // depth 2 exists
            const d2val = d2.$ || d2;
            if (char3 !== '') {
            // if there's a char3 character (optional)
              if (vCAry[2][0]) {
              // if char3 is actually a character
                const d3 = d2[standardizeCharacter(char3)];
                // depth 3
                if (d3) {
                  return d3; // this should always be a string
                }
                if (cOpts.hardFail) {
                  throw Error(`Found "${d2val}" but cannot combine "${char1}" and "${char2}" with "${char3}"`);
                }
                // if depth 3 doesn't exist
              } else if (cOpts.hardFail) {
                throw TypeError(`The third input to Hangul.composeComplex, "${char3}", is not a Character or an empty string!`);
              }
              return `${d2val}${char3}`;
            }
            // the char3 character was falsy so just return the composition
            return d2val;
          }
          // if the code reaches this point, depth 2 doesn't exist
          if (cOpts.hardFail) {
            throw Error(`Cannot combine "${char1}" and "${char2}"`);
          }
        } else if (cOpts.hardFail) {
          throw Error(`There's no complex character that starts with "${char1}"`);
        }
      } else if (cOpts.hardFail) {
      // error if hardFail is truthy and opts.complex is falsy
        throw Error('opts.complex is falsy!');
      }
    } else if (cOpts.hardFail) {
      throw TypeError(`The second input to Hangul.composeComplex, "${char2}", is not a Character!`);
    }
  } else if (cOpts.hardFail) {
    throw TypeError(`The first input to Hangul.composeComplex, "${char1}", is not a Character!`);
  }
  // couldn't do anything and hardFail was falsy
  // fail gracefully
  return `${char1}${char2}${char3}`;
};

export const syllable = (datum1 = '', datum2 = '', datum3 = '', opts = {}) => {
  const vCAry = [datum1, datum2, datum3].map(valCharacter);
  const [choChar, jungChar, jongChar] = vCAry.map(vC => vC[1]);
  if (vCAry[0][0]) {
    if (vCAry[1][0]) {
      const cho = choNum[standardizeCharacter(choChar)];
      if (Number.isInteger(cho)) {
        // cho is valid
        const jung = jungNum[standardizeCharacter(jungChar)];
        if (Number.isInteger(jung)) {
          // jung is valid
          if (jongChar !== '') {
            if (vCAry[2][0]) {
              const jong = jongNum[standardizeCharacter(jongChar)];
              if (Number.isInteger(jong)) {
                // all clear!
                return composeSyllable(cho, jung, jong);
              }
              // jong is not valid
              if (opts.hardFail) {
                throw Error(`"${jongChar}" is not a valid jong Character!`);
              }
            } else if (opts.hardFail) {
              throw TypeError(`The third input to Hangul.composeComplex, "${jongChar}", is not a Character or an empty string!`);
            }
            return `${composeSyllable(cho, jung)}${jongChar}`;
          }
          return composeSyllable(cho, jung);
        }
        // if the code reaches this point,
        // the jungChar was not a valid jung character.
        if (opts.hardFail) {
          throw Error(`"${jungChar}" is not a valid jung Character!`);
        }
      } else if (opts.hardFail) {
        throw Error(`"${choChar}" is not a valid cho Character!`);
      }
    } else if (opts.hardFail) {
      throw TypeError(`The second input to Hangul.composeComplex, "${jungChar}", is not a Character!`);
    }
  } else if (opts.hardFail) {
    throw TypeError(`The first input to Hangul.composeComplex, "${choChar}", is not a Character!`);
  }
  // default return
  return `${choChar}${jungChar}${jongChar}`;
};
