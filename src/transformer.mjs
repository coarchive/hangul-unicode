// tries to transform everything into standard hangul
import { isStandard, isHangul } from './types';
import mappings from './mappings';

export default function (str) {
  if (typeof str !== 'string') {
    throw new Error('Cannot transform things that are not strings');
  }
  return str.split``.map((char) => {
    if (isHangul(char) && !isStandard(char)) {
      const comp = mappings[char];
      if (comp) {
        return comp;
      }
      return char;
    }
    return char;
  });
}
