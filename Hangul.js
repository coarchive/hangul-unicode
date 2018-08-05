var Hangul = (function (exports) {
  'use strict';

  const isCharacterGroup = val => val.length > 1 && (Array.isArray(val) || typeof val === 'string');
  const deepFlatMap = (aryOrStr, func) => {
    let res = ''; // changing this to an array makes the entire thing not flat
    // of course, the concatination in the while loop would need to be changed
    // too, but it's neat how a change in a data type makes changes this dramatic
    let rem;
    // if the group is not a String then there can't be any sub groups
    if (Array.isArray(aryOrStr)) {
      rem = aryOrStr.map((val) => {
        if (isCharacterGroup(val)) {
          return deepFlatMap(val, func);
        }
        return val;
      });
    } else {
      rem = aryOrStr.split('');
    }
    while (rem.length) {
      const comp = func(rem);
      // func needs to return a Result like interface for this to work
      res += comp.result;
      rem = comp.remainder;
    }
    return res;
  };

  const cho = {
    ㄱㄱ: 'ㄲ',
    ㄷㄷ: 'ㄸ',
    ㅅㅅ: 'ㅆ',
    ㅈㅈ: 'ㅉ',
    ㅂㅂ: 'ㅃ',
  };
  const jung = {
    ㅗㅏ: 'ㅘ',
    ㅗㅐ: 'ㅙ',
    ㅗㅣ: 'ㅚ',
    ㅜㅓ: 'ㅝ',
    ㅜㅔ: 'ㅞ',
    ㅜㅣ: 'ㅟ',
    ㅡㅣ: 'ㅢ',
  };
  const jong = {
    ㄱㄱ: 'ㄲ',
    ㄱㅅ: 'ㄳ',
    ㄴㅈ: 'ㄵ',
    ㄴㅎ: 'ㄶ',
    ㄹㄱ: 'ㄺ',
    ㄹㅁ: 'ㄻ',
    ㄹㅂ: 'ㄼ',
    ㄹㅅ: 'ㄽ',
    ㄹㅌ: 'ㄾ',
    ㄹㅍ: 'ㄿ',
    ㄹㅎ: 'ㅀ',
    ㅂㅅ: 'ㅄ',
    ㅅㅅ: 'ㅆ',
  };
  const irregular = {
    ㄴㄴ: 'ㅥ',
    ㄴㄷ: 'ㅦ',
    ㄴㅅ: 'ㅧ',
    ㄴㅿ: 'ㅨ',
    ㄹㄱㅅ: 'ㅩ',
    ㄹㄷ: 'ㅪ',
    ㄹㅂㅅ: 'ㅫ',
    ㄹㅿ: 'ㅬ',
    ㄹㆆ: 'ㅭ',
    ㅁㅂ: 'ㅮ',
    ㅁㅅ: 'ㅯ',
    ㅁㅿ: 'ㅰ',
    ㅂㄱ: 'ㅲ',
    ㅂㄷ: 'ㅳ',
    ㅂㅅㄱ: 'ㅴ',
    ㅂㅅㄷ: 'ㅵ',
    ㅂㅈ: 'ㅶ',
    ㅂㅌ: 'ㅷ',
    ㅅㄱ: 'ㅺ',
    ㅅㄴ: 'ㅻ',
    ㅅㄷ: 'ㅼ',
    ㅅㅂ: 'ㅽ',
    ㅅㅈ: 'ㅾ',
    ㅇㅇ: 'ㆀ',
    ㆁㅅ: 'ㆁ',
    ㆁㅿ: 'ㅿ',
    ㅎㅎ: 'ㆅ',
    ㅛㅑ: 'ㆇ',
    ㅛㅒ: 'ㆈ',
    ㅛㅣ: 'ㆉ',
    ㅠㅕ: 'ㆊ',
    ㅠㅖ: 'ㆋ',
    ㅠㅣ: 'ㆌ',
    ㆍㅣ: 'ㆎ',
  };
  const all = Object.assign({}, cho, jung, jong, irregular);

  // CombinedRange: T:>Array => T:> Object => CombinedRange

  // { reserved, standardHangul, hangul } @CombinedRange

  // default: T:>Integer, T:>Integer [, T:>Integer] => Character

  class Result {
    constructor(result = '', remainder = []) {
      this.result = result;
      this.remainder = remainder;
    }
  }
  // Result: T:>Character => T:>CharacterGroup => Result

  const composeComplex = (...objList) => {
    const obj = Object.assign({}, ...objList);
    return ((ary) => {
      if (ary.length < 2) {
        return new Result(ary[0]);
      }
      const comp2 = obj[ary.slice(0, 2).join('')];
      if (comp2) {
        const comp3 = ary.length > 2 && obj[ary.slice(0, 3).join('')];
        if (comp3) {
          return new Result(comp3, ary.slice(3));
        }
        return new Result(comp2, ary.slice(2));
      }
      return new Result(ary[0], ary.slice(1));
    });
  };
  //
  const composeAnyComplexBase = composeComplex(
    cho,
    jung,
    jong,
    irregular,
  );
  const composeAnyComplex = ary => deepFlatMap(ary, composeAnyComplexBase);
  // default @ComposeFunction: ...Character => Result

  // export { default as decomposeSyllable } from './decomposeSyllable';
  // new Hangul.CharacterGroup(['ㄱㄱ', ['ㄹ', 'ㄱ']]).deepMap(Hangul.composeAnyComplex)
  // code to run tomorrow ^

  exports.deepFlatMap = deepFlatMap;
  exports.composeComplex = composeComplex;
  exports.composeAnyComplex = composeAnyComplex;

  return exports;

}({}));
//# sourceMappingURL=Hangul.js.map
