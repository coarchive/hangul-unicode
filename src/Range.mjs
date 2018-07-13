export default class Range {
  constructor(start, end) {
    if (typeof (start + end) !== 'number') {
      throw new Error('Both arguments to the Range constructor must be numbers!');
    }
    this.start = start;
    this.end = end;
  }

  contains(num) {
    return num >= this.start && num <= this.end;
  }
};
