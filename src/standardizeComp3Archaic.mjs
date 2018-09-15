import { standardizeCharacterBase } from './standardize';
import { Character } from './types';

const cs = standardizeCharacterBase({
  complex3: true,
  complexArchaic: true,
});
export default (
  datum => datum
    |> Character
    |> cs
);
// support all types of complex and check for Characters
