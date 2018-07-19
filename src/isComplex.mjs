import assertChar from './assertChar';
import { transformChar } from './transformer';

export default ((char) => {
  assertChar(char);
  return !!(transformChar(char).length - 1);
});
