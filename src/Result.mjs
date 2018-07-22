export default class Result {
  constructor(result = '', remainder) {
    this.result = result;
    if (!Array.isArray(remainder)) {
      throw new TypeError('The remainder of a new Result must be an array!');
    }
    this.remainder = remainder;
  }
}
