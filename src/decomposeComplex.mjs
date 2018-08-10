import { transformEverything } from './transform';
import { Character, toArray } from './types';

export default (val => toArray(transformEverything(Character(val))));
