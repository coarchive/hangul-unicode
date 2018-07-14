import { isStandardHangul, containsStandardHangul, whatIsStandardHangul, isHangul, containsHangul } from './types';
import transform from './transformer';
import { jamoExtendedB, isReserved } from './unicode/blocks';

const string = jamoExtendedB.map(v => String.fromCodePoint(v));
export {
  transform as toStandard,
  string,
  isStandardHangul,
  isHangul,
  containsHangul,
  containsStandardHangul,
  whatIsStandardHangul,
  isReserved,
};
