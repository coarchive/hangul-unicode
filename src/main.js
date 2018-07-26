// I know I can export everything at once,
// I just don't like to because during development
// I have to adjust the export names and stuff so
// it's better if it's organized

import composeAnyComplex from './composeAnyComplex';
import decomposeSyllable from './decomposeSyllable';
import { Character, CharacterGroup } from './internalTypes';
import transform from './transformer';

export { Character, CharacterGroup };
export { composeAnyComplex as composeComplex };
export { decomposeSyllable };
export { transform };
