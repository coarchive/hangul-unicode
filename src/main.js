// I know I can export everything at once,
// I just don't like to because during development
// I have to adjust the export names and stuff so
// it's better if it's organized

import { isAll, contains } from './array';

import { isSyllable } from './unicode/blocks';
import { isConsonant, isVowel } from './unicode/characters';
import { isHangul, isStandardHangul } from './unicode/groups';

import compose from './compose';
import composeAnyComplex from './composeAnyComplex';
import composeSyllable from './composeSyllable';
import decomposeSyllable from './decomposeSyllable';
import disassemble from './disassemble';
import toStandard, { toStandardChar } from './toStandard';
import transform, { transformChar } from './transformer';

export const isAllHangul = isAll(isHangul);
export const isAllStandardHangul = isAll(isStandardHangul);
export const containsStandardHangul = contains(isStandardHangul);
export const containsHangul = contains(isHangul);

export { isSyllable };
export { isConsonant, isVowel };
export { isHangul, isStandardHangul };

export { compose };
export { composeAnyComplex as composeComplex };
export { composeSyllable };
export { decomposeSyllable };
export { disassemble };
export { toStandard, toStandardChar };
export { transform, transformChar };
