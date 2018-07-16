export default class Range {
  constructor(start, end) {
    if (typeof (start + end) !== 'number') {
      throw new TypeError('Both arguments to the Range constructor must be numbers!');
    }
    this.start = start;
    this.end = end;
    this.length = this.end - this.start + 1;
  }

  contains(num) {
    return num >= this.start && num <= this.end;
  }

  forEach(fn) {
    for (let i = this.start; i <= this.end; i++) {
      fn(i);
    }
  }

  map(fn) {
    return Array(this.length).fill``.map((v, i) => fn(i + this.start));
  }
}
