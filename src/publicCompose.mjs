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
  const [vchar1, vchar2, vchar3] = [datum1, datum2, datum3].map(valCharacter);
  if (vchar1[0] === 1) {
    // the first input is a Character
    if (vchar2[0] === 1) {
      // the second input is a Character
      if (cOpts.complex) {
        const d1 = all[standardizeCharacter(vchar1[1])];
        if (d1) {
        // depth 1 exists
          const d2 = d1[standardizeCharacter(vchar2[1])];
          if (d2) {
          // depth 2 exists
            const d2val = d2.$ || d2;
            if (vchar3[0] !== 2) {
            // if there's a char3 character (optional)
              if (vchar3[0]) {
              // if char3 is actually a character
                const d3 = d2[standardizeCharacter(vchar3[1])];
                // depth 3
                if (d3) {
                  return d3; // this should always be a string
                }
                if (cOpts.hardFail) {
                  throw Error(`Found "${d2val}" but cannot combine "${vchar1[1]}" and "${vchar2[1]}" with "${vchar3[1]}"`);
                }
                // if depth 3 doesn't exist
              } else if (cOpts.hardFail) {
                throw TypeError(`The third input to Hangul.composeComplex, "${vchar3[1]}", is not a Character or an empty string!`);
              }
              return `${d2val}${vchar3[1]}`;
            }
            // the char3 character was falsy so just return the composition
            return d2val;
          }
          // if the code reaches this point, depth 2 doesn't exist
          if (cOpts.hardFail) {
            throw Error(`Cannot combine "${vchar1[1]}" and "${vchar2[1]}"`);
          }
        } else if (cOpts.hardFail) {
          throw Error(`There's no complex character that starts with "${vchar1[1]}"`);
        }
      } else if (cOpts.hardFail) {
      // error if hardFail is truthy and opts.complex is falsy
        throw Error('opts.complex is falsy!');
      }
    } else if (cOpts.hardFail) {
      throw TypeError(`The second input to Hangul.composeComplex, "${vchar2[1]}", is not a Character!`);
    }
  } else if (cOpts.hardFail) {
    throw TypeError(`The first input to Hangul.composeComplex, "${vchar1[1]}", is not a Character!`);
  }
  // couldn't do anything and hardFail was falsy
  // fail gracefully
  return `${vchar1[1]}${vchar2[1]}${vchar3[1]}`;
};

export const syllable = (datum1 = '', datum2 = '', datum3 = '', opts = {}) => {
  const vCAry = [datum1, datum2, datum3].map(valCharacter);
  const [choChar, jungChar, jongChar] = vCAry.map(vC => vC[1]);
  if (vCAry[0][0] === 1) {
    if (vCAry[1][0] === 1) {
      const cho = choNum[standardizeCharacter(choChar)];
      if (Number.isInteger(cho)) {
        // cho is valid
        const jung = jungNum[standardizeCharacter(jungChar)];
        if (Number.isInteger(jung)) {
          // jung is valid
          if (vCAry[2][0] !== 2) {
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
