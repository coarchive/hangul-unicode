// tries to transform everything into disassembled standard hangul
import { isStandardHangul, isHangul } from './types';
import mappings from './unicode/mappings';

function transform(str) {
  if (typeof str !== 'string') {
    throw new Error('Cannot transform things that are not strings');
  }
  return str.split``.map((char) => {
    if (isHangul(char) && !isStandardHangul(char)) {
      const comp = mappings[char];
      if (comp) {
        return comp;
      }
      return char;
    }
    return char;
  });
}
export default (transform);
export function transformToString(str) {
  return transform(str).flat();
}
