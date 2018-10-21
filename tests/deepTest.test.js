import { contains, isAll } from '../src/deepTest';

const string = 'Hello, world!';
const stringGroup = ['hell', ['o'], ['w', 'o', ['rl', 'd']], '!', [[['5']]]];
const mixedArray = [1, [1, 2, ['3', 'four'], 1, 12, [[41]]]];

const is_5 = v => v === '5';
const is_e = v => v === 'e';
const isString = v => typeof v === 'string';
const isGreaterThan5 = v => v > 5;

const contains_5 = contains(is_5);
const contains_e = contains(is_e);
const containsString = contains(isString);
const containsGreaterThan5 = contains(isGreaterThan5);

const isAll_5 = isAll(is_5);
const isAll_e = isAll(is_e);
const isAllString = isAll(isString);
const isAllGreaterThan5 = isAll(isGreaterThan5);
describe('contains', () => {
  describe('5', () => {
    test('not on "Hello, world!"', () => expect(contains_5(string)).toBe(false));
    test('on an Array that has a "5"', () => expect(contains_5(stringGroup)).toBe(true));
    test('not on a mixed Array that has no a "5"', () => expect(contains_5(mixedArray)).toBe(false));
  });
  describe('e', () => {
    test('on "Hello, world!"', () => expect(contains_e(string)).toBe(true));
    test('on an Array that has an "e" in it', () => expect(contains_e(stringGroup)).toBe(true));
    test('not on a mixed Array that has no "e"', () => expect(contains_e(mixedArray)).toBe(false));
  });
  describe('string', () => {
    test('on "Hello, world!"', () => expect(containsString(string)).toBe(true));
    test('on an Array that has an "e" in it', () => expect(containsString(stringGroup)).toBe(true));
    test('on a mixed Array that has no "e"', () => expect(containsString(mixedArray)).toBe(true));
  });
  describe('> 5', () => {
    test('not on "Hello, world!"', () => expect(containsGreaterThan5(string)).toBe(false));
    test('not on an Array that has an "e" in it', () => expect(containsGreaterThan5(stringGroup)).toBe(false));
    test('not on a mixed Array that has a "41"', () => expect(containsGreaterThan5(mixedArray)).toBe(false));
    test('on an array which contains values > 5', () => expect(containsGreaterThan5(['44', 4, '283', ['1', 0]])).toBe(true));
  });
  test('Errors on non Array likes', () => {
    expect(() => contains_e({})).toThrow();
    expect(() => contains_e(true)).toThrow();
    expect(() => contains_e(1)).toThrow();
    expect(() => contains_e(new Map())).toThrow();
    expect(() => contains_e(() => true)).toThrow();
  });
});
describe('isAll', () => {
  describe('5', () => {
    test('not on "Hello, world!"', () => expect(isAll_5(string)).toBe(false));
    test('not on an Array that has no "5"', () => expect(isAll_5(stringGroup)).toBe(false));
    test('not on a mixed Array that has a "5"', () => expect(isAll_5(mixedArray)).toBe(false));
    test('on an array of only "5"', () => expect(isAll_5([5, 5, '55555', ['5']])).toBe(true));
  });
  describe('e', () => {
    test('not on "Hello, world!"', () => expect(isAll_e(string)).toBe(false));
    test('not on an Array that has an "e" in it', () => expect(isAll_e(stringGroup)).toBe(false));
    test('not on a mixed Array that has no "e"', () => expect(isAll_e(mixedArray)).toBe(false));
    test('on an array of only "e"', () => expect(isAll_e(['ee', 'ee', 'e', ['e']])).toBe(true));
  });
  describe('string', () => {
    test('on "Hello, world!"', () => expect(isAllString(string)).toBe(true));
    test('on an Array', () => expect(isAllString(stringGroup)).toBe(true));
    test('on a mixed Array', () => expect(isAllString(mixedArray)).toBe(true));
  });
  describe('> 5', () => {
    test('not on "Hello, world!"', () => expect(isAllGreaterThan5(string)).toBe(false));
    test('not on an Array that has an "e" in it', () => expect(isAllGreaterThan5(stringGroup)).toBe(false));
    test('not on a mixed Array that has a "41"', () => expect(isAllGreaterThan5(mixedArray)).toBe(false));
    test('on an array of only values > 5', () => expect(isAllGreaterThan5([7, 6, '986', ['9']])).toBe(true));
  });
  test('Errors on non Array likes', () => {
    expect(() => isAll_e({})).toThrow();
    expect(() => isAll_e(true)).toThrow();
    expect(() => isAll_e(1)).toThrow();
    expect(() => isAll_e(new Map())).toThrow();
    expect(() => isAll_e(() => true)).toThrow();
  });
});
