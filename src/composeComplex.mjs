import assertChar from './assertChar';
import { complex, irregular } from './unicode/complex';
import Y from './ComposeGeneratorYield';

export default function* (includeIrregular = false) {
  let objList = [complex];
  if (includeIrregular) {
    objList.push(irregular);
  }
  let charsReceived = 0;
  while (true) {
    const previous = typeof objList[0] === 'string' ? objList[0] : objList[0].$;
    let currentChar;
    if (!charsReceived) {
      currentChar = yield new Y('');
    } else if (charsReceived === 1) {
      currentChar = yield new Y('', previous);
    } else {
      currentChar = yield new Y(previous);
    }
    charsReceived++;
    if (currentChar === null) {
      return new Y(objList[0], currentChar);
    }
    assertChar(currentChar);
    const currentCharObj = objList.map(obj => obj[currentChar]).filter(v => v);
    if (currentCharObj.length === 1 && typeof currentCharObj[0] === 'string') {
      return new Y(currentCharObj[0]);
    } if (!currentCharObj.length) {
      return new Y(previous, currentChar);
    }
    objList = currentCharObj;
  }
}
