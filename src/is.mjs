import Range from './unicode/Range';
import assertChar from './assertChar';

export default (range => (char) => {
  assertChar(char);
  if (range instanceof Range) {
    return range.contains(char.codePointAt(0));
  } if (Array.isArray(range)) {
    return range.includes(char);
  } if (typeof range === 'object') {
    return !!range[char];
  }
  return false;
});
