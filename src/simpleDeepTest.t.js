import { contains, isAll } from './simpleDeepTest';

const boolArray = [true, false, true, [false, true, false, [true, false], true], false, [[[true]], false]];
const intArray = [1, 2, 3, 4, 5, [6, 7, 8, [9, 10, 11], 12, 13], 14, 15, [16, 17, [18], [19, [20]]]];
const intLT5 = [1, 2, 3, 4, 3, 2, 1, [3, 2, [1]]];
const intGT5 = [6, 7, 8, [9, 10], [12]];
const string = 'Hello world!';
const stringGroup = ['hell', ['o'], ['w', 'o', ['rl', 'd']], '!'];
const mixedArray = [true, [1, 2, ['3', 'four'], false, 12, {}, [[41]]]];

const isBoolean = v => typeof v === 'boolean';
const isString = v => typeof v === 'string';
const isGreaterThan5 = v => v > 5;

const containsBoolean = contains(isBoolean);
const containsInteger = contains(Number.isInteger);
const containsString = contains(isString);
const containsGreaterThan5 = contains(isGreaterThan5);

const isAllBoolean = isAll(isBoolean);
const isAllInteger = isAll(Number.isInteger);
const isAllString = isAll(isString);
const isAllGreaterThan5 = isAll(isGreaterThan5);
describe('contains', () => {
  describe('containsBoolean', () => {
    test('on an Array of booleans', () => {
      expect(containsBoolean(boolArray)).toBe(true);
    });
    test('on a mixed Array that has booleans', () => {
      expect(containsBoolean(mixedArray)).toBe(true);
    });
    test('not on an Array of integers', () => {
      expect(containsBoolean(intArray)).toBe(false);
    });
    test('not on a String', () => {
      expect(containsBoolean(string)).toBe(false);
    });
    test('not on a stringGroup', () => {
      expect(containsBoolean(stringGroup)).toBe(false);
    });
  });
  describe('containsInteger', () => {
    test('on an Array of integers', () => {
      expect(containsInteger(intArray)).toBe(true);
    });
    test('on a mixed Array that has integers', () => {
      expect(containsInteger(mixedArray)).toBe(true);
    });
    test('not on an Array of booleans', () => {
      expect(containsInteger(boolArray)).toBe(false);
    });
    test('not on a String', () => {
      expect(containsInteger(string)).toBe(false);
    });
    test('not on a stringGroup', () => {
      expect(containsInteger(stringGroup)).toBe(false);
    });
  });
  describe('containsString', () => {
    test('on a String', () => {
      expect(containsString(string)).toBe(true);
    });
    test('on a stringGroup', () => {
      expect(containsString(stringGroup)).toBe(true);
    });
    test('on a mixed Array that has strings', () => {
      expect(containsString(mixedArray)).toBe(true);
    });
    test('not on an Array of booleans', () => {
      expect(containsString(boolArray)).toBe(false);
    });
    test('not on an Array of integers', () => {
      expect(containsString(intArray)).toBe(false);
    });
  });
  describe('containsGreaterThan5', () => {
    test('on an Array that has integers greater than 5', () => {
      expect(containsGreaterThan5(intArray)).toBe(true);
    });
    test('on a mixed Array that has integers greater than 5', () => {
      expect(containsGreaterThan5(mixedArray)).toBe(true);
    });
    test('not on an Array that has no integers greater than 5', () => {
      expect(containsGreaterThan5(intLT5)).toBe(false);
    });
    test('not on a String', () => {
      expect(containsGreaterThan5(string)).toBe(false);
    });
    test('not on a stringGroup', () => {
      expect(containsGreaterThan5(stringGroup)).toBe(false);
    });
    test('not on an Array of booleans', () => {
      expect(containsGreaterThan5(boolArray)).toBe(false);
    });
  });
});
describe('isAll', () => {
  describe('isAllBoolean', () => {
    test('on an Array of only booleans', () => {
      expect(isAllBoolean(boolArray)).toBe(true);
    });
    test('not on a mixed Array that has booleans', () => {
      expect(isAllBoolean(mixedArray)).toBe(false);
    });
    test('not on an Array of integers', () => {
      expect(isAllBoolean(intArray)).toBe(false);
    });
    test('not on a String', () => {
      expect(isAllBoolean(string)).toBe(false);
    });
    test('not on a stringGroup', () => {
      expect(isAllBoolean(stringGroup)).toBe(false);
    });
  });
  describe('isAllInteger', () => {
    test('on an Array of only integers', () => {
      expect(isAllInteger(intArray)).toBe(true);
    });
    test('not on a mixed Array that has integers', () => {
      expect(isAllInteger(mixedArray)).toBe(false);
    });
    test('not on an Array of booleans', () => {
      expect(isAllInteger(boolArray)).toBe(false);
    });
    test('not on a String', () => {
      expect(isAllInteger(string)).toBe(false);
    });
    test('not on a stringGroup', () => {
      expect(isAllInteger(stringGroup)).toBe(false);
    });
  });
  describe('isAllString', () => {
    test('on a String', () => {
      expect(isAllString(string)).toBe(true);
    });
    test('on a stringGroup', () => {
      expect(isAllString(stringGroup)).toBe(true);
    });
    test('not on a mixed Array that has strings', () => {
      expect(isAllString(mixedArray)).toBe(false);
    });
    test('not on an Array of booleans', () => {
      expect(isAllString(boolArray)).toBe(false);
    });
    test('not on an Array of integers', () => {
      expect(isAllString(intArray)).toBe(false);
    });
  });
  describe('isAllGreaterThan5', () => {
    test('on an Array that only has integers greater than 5', () => {
      expect(isAllGreaterThan5(intGT5)).toBe(true);
    });
    test('not on an Array that has integers greater than 5', () => {
      expect(isAllGreaterThan5(intArray)).toBe(false);
    });
    test('not on a mixed Array that has integers greater than 5', () => {
      expect(isAllGreaterThan5(mixedArray)).toBe(false);
    });
    test('not on an Array that has no integers greater than 5', () => {
      expect(isAllGreaterThan5(intLT5)).toBe(false);
    });
    test('not on a String', () => {
      expect(isAllGreaterThan5(string)).toBe(false);
    });
    test('not on a stringGroup', () => {
      expect(isAllGreaterThan5(stringGroup)).toBe(false);
    });
    test('not on an Array of booleans', () => {
      expect(isAllGreaterThan5(boolArray)).toBe(false);
    });
  });
});
