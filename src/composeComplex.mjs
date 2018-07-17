import assertChar from './assertChar';
import { complex, irregular } from './unicode/complex';
import Y from './ComposeGeneratorYield';

export default function* (includeIrregular = false) {
  let objList = [complex];
  if (includeIrregular) {
    objList.push(irregular);
  }
  let lastChar;
  while (true) {
    const currentChar = yield new Y('', lastChar);
    if (currentChar === null) {
      return objList[0];
    }
    assertChar(currentChar);
    const currentCharObj = objList.map(obj => obj[currentChar]).filter(v => v);
    if (currentCharObj.length === 1 && typeof currentCharObj[0] === 'string') {
      return currentCharObj[0];
    } if (!currentCharObj.length) {
      return `${objList[0].$ || ''}${currentChar}`;
    }
    objList = currentCharObj;
    [lastChar] = currentCharObj;
  }
}
