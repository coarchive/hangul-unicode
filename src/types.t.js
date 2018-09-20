import * as types from './types';

describe('types.character Values', () => {
  test('types.character("a") returns a', () => {
    expect(types.character('a')).toBe('a');
  });
  test('["a"] returns a', () => {
    expect(types.character(['a'])).toBe('a');
  });
  test('.toString is called', () => {
    const toString = jest.fn(() => 'a');
    types.character({ toString });
    expect(toString).toBeCalled();
  });
  test('[Symbol.toPrimitive] is called with "string" instead of .toString', () => {
    const toString = jest.fn();
    const primitive = jest.fn(() => 'a');
    types.character({ toString, [Symbol.toPrimitive]: primitive });
    expect(toString).not.toBeCalled();
    expect(primitive).toBeCalledWith('string');
  });
  test('errors on undefined', () => expect(() => types.character({})).toThrow());
  test('errors on "foobar"', () => expect(() => types.character('foobar')).toThrow());
  test('errors on {}', () => expect(() => types.character({})).toThrow());
  test('errors on []', () => expect(() => types.character({})).toThrow());
});
test('ENOARYLIKE errors', () => expect(() => types.ENOARYLIKE()).toThrow());
describe('toArray', () => {
  test('returns the same Array', () => expect(types.toArray([1])).toStrictEqual([1]));
  test('converts "foo" to ["f", "o", "o"]', () => expect(types.toArray('foo')).toStrictEqual(['f', 'o', 'o']));
});
describe('toString', () => {
  test('returns the same String', () => expect(types.toString('a')).toBe('a'));
  test('converts ["f", "o", "o"] to "foo"', () => expect(types.toString(['f', 'o', 'o'])).toBe('foo'));
  test("[[['foobar'], 'baz'], 'q', 'u', 'x'] => 'foobarbazqux'", () => {
    expect(types.toString([[['foobar'], 'baz'], 'q', 'u', 'x'])).toBe('foobarbazqux');
  });
});
