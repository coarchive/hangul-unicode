// tries to transform everything into disassembled standard hangul
import { isHangul, isStandardHangul } from './unicode/groups';
import { isSyllable } from './unicode/blocks';
import { makeAry } from './array';
import mappings from './unicode/mappings';

export function transformChar(char) {
  if (isHangul(char) && !isSyllable(char)) {
    // this if-statement isn't REALLY needed
    const comp = mappings[char];
    if (comp) {
      return comp;
    }
    return char;
  }
  return char;
}
export function transformNonStandardChar(char) {
  if (isStandardHangul(char)) {
    return transformChar(char);
  }
  return char;
}
export default function transform(str, ignoreStandard = false) {
  const ary = makeAry(str);
  if (ignoreStandard) {
    return ary.split``.map(transformNonStandardChar);
  }
  return ary.split``.map(transformChar);
}
export function transformToString(str) {
  return transform(str).flat();
}
