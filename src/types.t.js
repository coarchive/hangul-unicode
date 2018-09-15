import { Character } from './types';

describe('Character Values', () => {
  test('Character("a") returns a', () => {
    expect(Character('a')).toBe('a');
  });
  test('["a"] returns a', () => {
    expect(Character(['a'])).toBe('a');
  });
  test('.toString is called', () => {
    const toString = jest.fn(() => 'a');
    Character({ toString });
    expect(toString).toBeCalled();
  });
  test('[Symbol.toPrimitive] is called with "string" instead of .toString', () => {
    const toString = jest.fn();
    const primitive = jest.fn(() => 'a');
    Character({ toString, [Symbol.toPrimitive]: primitive });
    expect(toString).not.toBeCalled();
    expect(primitive).toBeCalledWith('string');
  });
  test('errors on undefined', () => {
    expect(() => Character({})).toThrow('is not a Character!');
  });
  test('errors on "foobar"', () => {
    expect(() => Character('foobar')).toThrow('is not a Character!');
  });
  test('errors on {}', () => {
    expect(() => Character({})).toThrow('is not a Character!');
  });
  test('errors on []', () => {
    expect(() => Character({})).toThrow('is not a Character!');
  });
});
