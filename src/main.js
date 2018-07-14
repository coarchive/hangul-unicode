import { isCompatibilityJamo, isSyllable, isStandard, isHangul } from './types';
import transform from './transformer';
import { jamoExtendedB } from './blocks';

const string = jamoExtendedB.map(v => String.fromCodePoint(v));
export default {
  transform,
  string,
  isCompatibilityJamo,
  isSyllable,
  isStandard,
  isHangul,
};
