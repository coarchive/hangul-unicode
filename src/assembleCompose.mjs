import { CharacterGroup, E } from './internalTypes';
import R from './Result';
import { isCharacterGroup } from './types';

const fn = func => (group) => {
  if (arguments.length > 2) {
    E('assembleCompose', 'assembledComposes does not take more than two arguments!', arguments);
  }
  let res;
  // string concatination is faster
  let rem = CharacterGroup(group);
  if (Array.isArray(rem)) {
    res = [];
    // if the group is not a String
    const thisFn = fn(func);
    let subGroupIdx = rem.findIndex(isCharacterGroup);
    while (~subGroupIdx) {
      rem.splice(subGroupIdx, 1, ...thisFn(group[subGroupIdx]));
      subGroupIdx = rem.findIndex(isCharacterGroup);
    }
    while (rem.length) {
      const comp = func(rem);
      if (!(comp instanceof R)) {
        E('assembleCompose', 'the ComposeFunction did not return a Result!', comp);
      }
      res.push(comp.result);
      rem = comp.remainder;
    }
  } else {
    res = '';
    while (rem.length) {
      const comp = func(rem);
      if (!(comp instanceof R)) {
        E('assembleCompose', 'the ComposeFunction did not return a Result!', comp);
      }
      res += comp.result;
      rem = comp.remainder;
    }
  }
  return res;
};
export default (fn);
// fn: ComposeFunction => AssembledComposedFunction => CharacterGroup => Result
