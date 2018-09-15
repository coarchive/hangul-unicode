import { standardizeCharacterBase_U } from './standardize';
import { Character } from './types';

const cs = standardizeCharacterBase_U({
  complex3: true,
  complexArchaic: true,
});
export default (datum => datum |> Character |> cs);
// support all types of complex and check for Characters
