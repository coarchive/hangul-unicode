import mappings from './unicode/mappings';

export const str = Object.keys(mappings).join``;
export { default as composeAnyComplex } from './composeAnyComplex';
export { default as decomposeSyllable } from './decomposeSyllable';
export { Character, CharacterGroup } from './internalTypes';
export { default as transform } from './transformer';
