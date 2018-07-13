// tries to transform everything into standard hangul
import { isStandard, isHangul } from './blocks';
import eq from './eq';

export default function (str) {
  if (typeof str !== 'string') {
    throw new Error('Cannot transform things that are not strings');
  }
  console.log(str.length);
  return str.split``.map((char) => {
    if (isHangul(char) && !isStandard(char)) {
      console.log('Non-standard hangul character!');
      const comp = eq[char];
      if (comp) {
        return comp;
      }
      return char;
    }
    return char;
  });
}
