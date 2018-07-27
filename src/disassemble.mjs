import { make } from './array';
import { isSyllable } from './unicode/blocks';
import { cho } from './unicode/complex';
import composeComplex from './composeComplex';
import decomposeSyllable from './decomposeSyllable';
import transform, { transformChar } from './transformer';

const composeComplexCho = composeComplex(cho);

export default ((aryLike, grouped, disassembleCho) => {
  const ary = make(aryLike).map((char) => {
    const isSyl = isSyllable(char);
    let charGroups;
    if (isSyl) {
      charGroups = transform(decomposeSyllable(char));
    } else {
      charGroups = [make(transformChar(char))];
    }
    if (!disassembleCho) {
      charGroups = charGroups.map((charGroup) => {
        if (Array.isArray(charGroup)) {
          const comp = composeComplexCho(...charGroup);
          if (!comp.remainder.length) {
            return comp.result;
          }
          return charGroup;
        }
        return charGroup;
      });
    }
    return isSyl ? charGroups : charGroups[0];
  });
  if (grouped) {
    return ary;
  }
  return ary.flat(2);
});
// default: UP:>CharacterGroup => TP:>Boolean => TP:>Boolean => CharacterGroup
