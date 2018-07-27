import { E, Character } from '../internalTypes';

export default class UnicodeRange {
  constructor(start, end) {
    if (!Number.isInteger(start + end)) {
      E('UnicodeRange', 'Both arguments to the Range constructor must be Integers!', { start, end });
    }
    this.start = start;
    this.end = end;
  }

  containsCodePoint(num) {
    return num >= this.start && num <= this.end;
  }

  contains(char) {
    return this.containsCodePoint(Character(char).codePointAt(0));
  }
}
// UnicodeRange: UI:> Number => UI:> Number => UnicodeRange
export class CombinedRange {
  constructor(ranges, codePoints = {}) {
    if (!Array.isArray(ranges)) {
      E('CombinedRange', 'ranges must be an Array!', ranges);
    }
    if (!codePoints && typeof codePoints !== 'object') {
      E('CombinedRange', 'codePoints must be an Object!', codePoints);
    }
    this.ranges = ranges;
    this.codePoints = codePoints;
  }

  contains(char) {
    const num = Character(char).codePointAt(0);
    return (
      (this.codePoints && this.codePoints[char])
      || this.ranges.some(range => range.containsCodePoint(num))
    );
  }
}
// CombinedRange: UI:>Array => UI:> Object => CombinedRange
