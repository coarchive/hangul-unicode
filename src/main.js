import { isStandardHangul, containsStandardHangul, isHangul, containsHangul } from './types';
import transform from './transformer';
import { jamoExtendedB } from './blocks';

const string = jamoExtendedB.map(v => String.fromCodePoint(v));
export {
  transform as toStandard,
  string,
  isStandardHangul,
  isHangul,
  containsHangul,
  containsStandardHangul,
};
