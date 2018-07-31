import { E, CharacterGroup } from './internalTypes';
import R from './Result';
import { isCharacterGroup } from './types';

const fn = func => (group) => {
  if (arguments.length > 2) {
    E('assembleCompose', 'assembledComposes does not take more than two arguments!', arguments);
  }
  const res = [];
  // string concatination is faster
  let rem = CharacterGroup(group);
  if (Array.isArray(group)) {
    // if the group is not a String then there can't be any sub groups
    const thisFn = fn(func);
    let subGroupIdx = rem.findIndex(isCharacterGroup);
    while (~subGroupIdx) {
      rem.splice(subGroupIdx, 1, ...thisFn(group[subGroupIdx]));
      subGroupIdx = rem.findIndex(isCharacterGroup);
    }
  }
  while (rem.length) {
    const comp = func(rem);
    if (!(comp instanceof R)) {
      E('assembleCompose', 'the ComposeFunction did not return a Result!', comp);
    }
    res.push(comp.result);
    rem = comp.remainder;
  }
  if (res.length === 1) {
    return res[0];
  }
  return res;
};
export default (fn);
// fn: T:>ComposeFunction => AssembledComposedFunction
// AssembledComposedFunction: UI:> CharacterGroup => Result
