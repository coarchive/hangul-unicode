export default class UnicodeRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  containsCodePoint(num) {
    return num >= this.start && num <= this.end;
  }

  contains(char) {
    return this.containsCodePoint(char.codePointAt(0));
  }
}
export class CombinedRange {
  constructor(ranges, codePoints = {}) {
    this.ranges = ranges;
    this.codePoints = codePoints;
  }

  contains(char) {
    const num = char.codePointAt(0);
    return (
      (this.codePoints && this.codePoints[char])
      || this.ranges.some(range => range.containsCodePoint(num))
    );
  }
}
