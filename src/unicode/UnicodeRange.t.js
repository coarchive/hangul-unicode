import { CombinedRange, UnicodeRange } from './UnicodeRange';

const uRange0 = new UnicodeRange(0, 50);
const uRange1 = new UnicodeRange(80, 100);
const cRange = new CombinedRange([uRange0, uRange1], { 1337: true });
test('10 is within 0 & 50', () => {
  expect(uRange0.containsCodePoint(10)).toBeTruthy();
});
test('0 is within 0 & 50 (inclusivity check)', () => {
  expect(uRange0.containsCodePoint(0)).toBeTruthy();
});
test("10 isn't within 80 & 100", () => {
  expect(uRange1.containsCodePoint(10)).toBeFalsy();
});
test('"a" is within 80 & 100', () => {
  expect(uRange1.contains('a')).toBeTruthy();
});
test('10 is within the CombinedRange', () => {
  expect(cRange.containsCodePoint(10)).toBeTruthy();
});
test('70 is not within the CombinedRange', () => {
  expect(cRange.containsCodePoint(70)).toBeFalsy();
});
test('"b" is within the CombinedRange', () => {
  expect(cRange.contains('b')).toBeTruthy();
});
test('1337 is witin the CombinedRange', () => {
  expect(cRange.containsCodePoint(1337)).toBeTruthy();
});
