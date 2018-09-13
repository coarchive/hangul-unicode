import * as blocks from './unicode/blocks';
import * as test from './simpleDeepTest';
import { Character } from './types';

const isFactory = blockName => datum => blocks[blockName].contains(Character(datum));
export const is = {
  jamo: isFactory('jamo'),
  compatibilityJamo: isFactory('compatibilityJamo'),
  jamoExtendedA: isFactory('jamoExtendedA'),
  syllable: isFactory('syllable'),
  jamoExtendedB: isFactory('jamoExtendedB'),
  halfwidth: isFactory('halfwidth'),
  reserved: isFactory('reserved'),
  standardHangul: isFactory('standardHangul'),
  hangul: isFactory('hangul'),
};
export const isAll = {
  jamo: test.isAll(is.jamo),
  compatibilityJamo: test.isAll(is.compatibilityJamo),
  jamoExtendedA: test.isAll(is.jamoExtendedA),
  syllable: test.isAll(is.syllable),
  jamoExtendedB: test.isAll(is.jamoExtendedB),
  halfwidth: test.isAll(is.halfwidth),
  reserved: test.isAll(is.reserved),
  standardHangul: test.isAll(is.standardHangul),
  hangul: test.isAll(is.hangul),
};
export const contains = {
  jamo: test.contains(is.jamo),
  compatibilityJamo: test.contains(is.compatibilityJamo),
  jamoExtendedA: test.contains(is.jamoExtendedA),
  syllable: test.contains(is.syllable),
  jamoExtendedB: test.contains(is.jamoExtendedB),
  halfwidth: test.contains(is.halfwidth),
  reserved: test.contains(is.reserved),
  standardHangul: test.contains(is.standardHangul),
  hangul: test.contains(is.hangul),
};
