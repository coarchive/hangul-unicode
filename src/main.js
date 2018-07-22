// I know I can export everything at once,
// I just don't like to because during development
// I have to adjust the export names and stuff so
// it's better if it's organized

import { isAll, contains } from './array';

import { isSyllable } from './unicode/blocks';
import { isConsonant, isVowel } from './unicode/characters';
import { isHangul, isStandardHangul } from './unicode/groups';

import composeAnyComplex from './composeAnyComplex';
import composeSyllable from './composeSyllable';
import decomposeSyllable from './decomposeSyllable';
import disassemble from './disassemble';
import transformNonStandardChar from './transformer';

export const isAllHangul = isAll(isHangul);
export const isAllStandardHangul = isAll(isStandardHangul);
export const containsStandardHangul = contains(isStandardHangul);
export const containsHangul = contains(isHangul);

export { isSyllable };
export { isConsonant, isVowel };
export { isHangul, isStandardHangul };
export { decomposeSyllable, disassemble };
export { composeAnyComplex as composeComplex };
export { composeSyllable };
export { transformNonStandardChar as transform };
