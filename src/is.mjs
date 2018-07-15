import Range from './unicode/Range';
import assertChar from './assertChar';

export default (range => (char) => {
  assertChar(char);
  if (Array.isArray(range)) {
    return range.includes(char);
  } if (range instanceof Range) {
    return range.contains(char.charCodeAt(0));
  } if (typeof range === 'object') {
    return !!range[char];
  }
  return false;
});
