import { composeComplex } from './compose';
import { transformEveryChar } from './transform';
import {
  Character, isCharacterGroup, makeNiceOutput,
} from './types';

const composeComplexCho = composeComplex({ complexJung: false, complexJong: false });
export const transformLeavingCho = (char) => {
  const res = transformEveryChar(char);
  if (isCharacterGroup(res)) {
    return res |> composeComplexCho |> makeNiceOutput;
  }
  return res;
};
export default (datum, opts) => datum
  |> Character // turn the datum into a Character
  |> (opts.decomposeComplexDouble ? transformEveryChar : transformLeavingCho);
