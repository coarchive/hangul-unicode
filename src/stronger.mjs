import { stronger } from './unicode/complex';
import { curriedMap } from './map';
import { standardizeCharacter } from './standardize';

const transform = char => stronger[char] || char;
const standardizeAndTransform = char => char
  |> standardizeCharacter
  |> transform;
export default (curriedMap(standardizeAndTransform));
// TODO: this should take a grouped option
