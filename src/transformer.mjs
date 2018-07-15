// tries to transform everything into disassembled standard hangul
import { isHangul } from './unicode/groups';
import mappings from './unicode/mappings';

export function transformChar(char) {
  if (isHangul(char)) {
    const comp = mappings[char];
    if (comp) {
      return comp;
    }
    return char;
  }
  return char;
}
export default function transform(str) {
  if (typeof str !== 'string') {
    throw new Error('Cannot transform things that are not strings');
  }
  return str.split``.map(transformChar);
}
export function transformToString(str) {
  return transform(str).flat();
}
