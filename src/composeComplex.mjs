import assertChar from './assertChar';
import Y from './ComposeGeneratorYield';
import isComplex from './isComplex';
import fuel from './fuel';

export function* generator(...objList) {
  if (!objList.length) {
    throw new Error('Cannot compose complex without a list of complex to compose!');
  }
  let charsReceived = 0;
  while (true) {
    const previous = typeof objList[0] === 'string' ? objList[0] : objList[0].$;
    const previousIsComplex = objList[0].isComplex;
    let currentChar;
    if (!charsReceived) {
      currentChar = yield new Y('');
    } else if (charsReceived === 1) {
      currentChar = yield new Y('', previous);
    } else if (previousIsComplex) {
      currentChar = yield new Y(previous);
    } else {
      currentChar = yield new Y('', previous);
    }
    charsReceived++;
    if (currentChar === null) {
      return new Y(objList[0], currentChar);
    }
    assertChar(currentChar);
    const currentCharObj = objList.map(obj => obj[currentChar]).filter(v => v);
    if (typeof currentCharObj[0] === 'string') {
      return new Y(currentCharObj[0]);
    } if (!currentCharObj.length) {
      if (previousIsComplex) {
        return new Y(previous, currentChar);
      }
      if (previous) {
        return new Y('', previous, currentChar);
      }
      if (isComplex(currentChar)) {
        return new Y(currentChar);
      }
      return new Y('', currentChar);
    }
    objList = currentCharObj;
  }
}
export default (fuel(generator));
