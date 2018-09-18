import * as types from './types';

describe('types.Character Values', () => {
  test('types.Character("a") returns a', () => {
    expect(types.Character('a')).toBe('a');
  });
  test('["a"] returns a', () => {
    expect(types.Character(['a'])).toBe('a');
  });
  test('.toString is called', () => {
    const toString = jest.fn(() => 'a');
    types.Character({ toString });
    expect(toString).toBeCalled();
  });
  test('[Symbol.toPrimitive] is called with "string" instead of .toString', () => {
    const toString = jest.fn();
    const primitive = jest.fn(() => 'a');
    types.Character({ toString, [Symbol.toPrimitive]: primitive });
    expect(toString).not.toBeCalled();
    expect(primitive).toBeCalledWith('string');
  });
  test('errors on undefined', () => expect(() => types.Character({})).toThrow());
  test('errors on "foobar"', () => expect(() => types.Character('foobar')).toThrow());
  test('errors on {}', () => expect(() => types.Character({})).toThrow());
  test('errors on []', () => expect(() => types.Character({})).toThrow());
});
test('ENOARYLIKE errors', () => expect(() => types.ENOARYLIKE()).toThrow());
describe('toArray', () => {
  test('returns the same Array', () => expect(types.toArray([1])).toStrictEqual([1]));
  test('converts "foo" to ["f", "o", "o"]', () => expect(types.toArray('foo')).toStrictEqual(['f', 'o', 'o']));
  test('errors on other types', expect(() => types.toArray({}).toThrow()));
});
describe('toString', () => {
  test('returns the same String', () => expect(types.toString('a')).toBe('a'));
  test('converts ["f", "o", "o"] to "foo"', () => expect(types.toString(['f', 'o', 'o'])).toBe('foo'));
  test('errors on other types', expect(() => types.toString({}).toThrow()));
});
