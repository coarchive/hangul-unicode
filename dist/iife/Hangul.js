var Hangul = (function (exports) {
  'use strict';

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
  const archaic = {
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
  const pairs = {
    ㄲ: ['ㄱ', 'ㄱ'],
    ㄳ: ['ㄱ', 'ㅅ'],
    ㄵ: ['ㄴ', 'ㅈ'],
    ㄶ: ['ㄴ', 'ㅎ'],
    ㄸ: ['ㄷ', 'ㄷ'],
    ㄻ: ['ㄹ', 'ㅁ'],
    ㄺ: ['ㄹ', 'ㄱ'],
    ㄼ: ['ㄹ', 'ㅂ'],
    ㄽ: ['ㄹ', 'ㅅ'],
    ㄾ: ['ㄹ', 'ㅌ'],
    ㄿ: ['ㄹ', 'ㅍ'],
    ㅀ: ['ㄹ', 'ㅎ'],
    ㅃ: ['ㅂ', 'ㅂ'],
    ㅄ: ['ㅂ', 'ㅅ'],
    ㅆ: ['ㅅ', 'ㅅ'],
    ㅉ: ['ㅈ', 'ㅈ'],
    ㅘ: ['ㅗ', 'ㅏ'],
    ㅙ: ['ㅗ', 'ㅐ'],
    ㅚ: ['ㅗ', 'ㅣ'],
    ㅝ: ['ㅜ', 'ㅓ'],
    ㅞ: ['ㅜ', 'ㅔ'],
    ㅟ: ['ㅜ', 'ㅣ'],
    ㅢ: ['ㅡ', 'ㅣ'],
    ㅥ: ['ㄴ', 'ㄴ'],
    ㅦ: ['ㄴ', 'ㄷ'],
    ㅧ: ['ㄴ', 'ㅅ'],
    ㅨ: ['ㄴ', 'ㅿ'],
    ㅩ: ['ㄹ', 'ㄱ', 'ㅅ'],
    ㅪ: ['ㄹ', 'ㄷ'],
    ㅫ: ['ㄹ', 'ㅂ', 'ㅅ'],
    ㅬ: ['ㄹ', 'ㅿ'],
    ㅭ: ['ㄹ', 'ㆆ'],
    ㅮ: ['ㅁ', 'ㅂ'],
    ㅯ: ['ㅁ', 'ㅅ'],
    ㅰ: ['ㅁ', 'ㅿ'],
    ㅲ: ['ㅂ', 'ㄱ'],
    ㅳ: ['ㅂ', 'ㄷ'],
    ㅴ: ['ㅂ', 'ㅅ', 'ㄱ'],
    ㅵ: ['ㅂ', 'ㅅ', 'ㄷ'],
    ㅶ: ['ㅂ', 'ㅈ'],
    ㅷ: ['ㅂ', 'ㅌ'],
    ㅺ: ['ㅅ', 'ㄱ'],
    ㅻ: ['ㅅ', 'ㄴ'],
    ㅼ: ['ㅅ', 'ㄷ'],
    ㅽ: ['ㅅ', 'ㅂ'],
    ㅾ: ['ㅅ', 'ㅈ'],
    ㆀ: ['ㅇ', 'ㅇ'],
    ㆂ: ['ㆁ', 'ㅅ'],
    ㆃ: ['ㆁ', 'ㅿ'],
    ㆅ: ['ㅎ', 'ㅎ'],
    ㆇ: ['ㅛ', 'ㅑ'],
    ㆈ: ['ㅛ', 'ㅒ'],
    ㆉ: ['ㅛ', 'ㅣ'],
    ㆊ: ['ㅠ', 'ㅕ'],
    ㆋ: ['ㅠ', 'ㅖ'],
    ㆌ: ['ㅠ', 'ㅣ'],
    ㆎ: ['ㆍ', 'ㅣ'],
  };
  const complex = {
    ㄲ: 1,
    ㄳ: 1,
    ㄵ: 1,
    ㄶ: 1,
    ㄸ: 1,
    ㄺ: 1,
    ㄻ: 1,
    ㄼ: 1,
    ㄽ: 1,
    ㄾ: 1,
    ㄿ: 1,
    ㅀ: 1,
    ㅃ: 1,
    ㅄ: 1,
    ㅆ: 1,
    ㅉ: 1,
    ㅘ: 1,
    ㅙ: 1,
    ㅚ: 1,
    ㅝ: 1,
    ㅞ: 1,
    ㅟ: 1,
    ㅢ: 1,
  };
  const irregularComplex = {
    ㅥ: 1,
    ㅦ: 1,
    ㅧ: 1,
    ㅨ: 1,
    ㅩ: 1,
    ㅪ: 1,
    ㅫ: 1,
    ㅬ: 1,
    ㅭ: 1,
    ㅮ: 1,
    ㅯ: 1,
    ㅰ: 1,
    ㅱ: 1,
    ㅲ: 1,
    ㅳ: 1,
    ㅴ: 1,
    ㅵ: 1,
    ㅶ: 1,
    ㅷ: 1,
  };
  const complexList = Object.assign({}, complex, irregularComplex);
  // yes, I know that this is not a list.
  const stronger = {
    ㄱ: 'ㄲ',
    ㅋ: 'ㄲ',
    ㄷ: 'ㄸ',
    ㅌ: 'ㄸ',
    ㅂ: 'ㅃ',
    ㅍ: 'ㅃ',
    ㅅ: 'ㅆ',
    ㅈ: 'ㅉ',
    ㅊ: 'ㅉ',
  };
  // I would add a weaker export
  // except that I can't reverse the outputs

  const cho$1 = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
    'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
    'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];
  const jung$1 = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
    'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
    'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
  ];
  const jong$1 = [
    null, 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
    'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];
  const choNum = {
    ㄱ: 0,
    ㄲ: 1,
    ㄴ: 2,
    ㄷ: 3,
    ㄸ: 4,
    ㄹ: 5,
    ㅁ: 6,
    ㅂ: 7,
    ㅃ: 8,
    ㅅ: 9,
    ㅆ: 10,
    ㅇ: 11,
    ㅈ: 12,
    ㅉ: 13,
    ㅊ: 14,
    ㅋ: 15,
    ㅌ: 16,
    ㅍ: 17,
    ㅎ: 18,
  };
  const jungNum = {
    ㅏ: 0,
    ㅐ: 1,
    ㅑ: 2,
    ㅒ: 3,
    ㅓ: 4,
    ㅔ: 5,
    ㅕ: 6,
    ㅖ: 7,
    ㅗ: 8,
    ㅘ: 9,
    ㅙ: 10,
    ㅚ: 11,
    ㅛ: 12,
    ㅜ: 13,
    ㅝ: 14,
    ㅞ: 15,
    ㅟ: 16,
    ㅠ: 17,
    ㅡ: 18,
    ㅢ: 19,
    ㅣ: 20,
  };
  const jongNum = {
    ㄱ: 1,
    ㄲ: 2,
    ㄳ: 3,
    ㄴ: 4,
    ㄵ: 5,
    ㄶ: 6,
    ㄷ: 7,
    ㄹ: 8,
    ㄺ: 9,
    ㄻ: 10,
    ㄼ: 11,
    ㄽ: 12,
    ㄾ: 13,
    ㄿ: 14,
    ㅀ: 15,
    ㅁ: 16,
    ㅂ: 17,
    ㅄ: 18,
    ㅅ: 19,
    ㅆ: 20,
    ㅇ: 21,
    ㅈ: 22,
    ㅊ: 23,
    ㅋ: 24,
    ㅌ: 25,
    ㅍ: 26,
    ㅎ: 27,
  };

  class UnicodeRange {
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
  class CombinedRange {
    constructor(ranges, codePoints = {}) {
      this.ranges = ranges;
      this.codePoints = codePoints;
    }

    containsCodePoint(num) {
      return (
        (this.codePoints && this.codePoints[num])
        || this.ranges.some(range => range.containsCodePoint(num))
      );
    }

    contains(char) {
      const num = char.codePointAt(0);
      return this.containsCodePoint(num);
    }
  }

  const jamo = new UnicodeRange(0x1100, 0x11FF);
  const compatibilityJamo = new UnicodeRange(0x3130, 0x318F);
  const jamoExtendedA = new UnicodeRange(0xA960, 0xA97F);
  const syllables = new UnicodeRange(0xAC00, 0xD7AF);
  const jamoExtendedB = new UnicodeRange(0xD7B0, 0xD7FF);
  const halfwidth = new UnicodeRange(0xFFA0, 0xFFDF);
  const reserved = new CombinedRange([
    new UnicodeRange(0xA97D, 0xA97F), // jamoExtendedA
    new UnicodeRange(0xD7A4, 0xD7AF), // syllables
    new UnicodeRange(0xD7C7, 0xD7CA), // jamoExtendedB
    new UnicodeRange(0xD7FC, 0xD7FF), // jamoExtendedB
  ], { 0x3130: 1, 0x318F: 1 });
  const standardHangul = new CombinedRange([compatibilityJamo, syllables]);
  const hangul = new CombinedRange([
    jamo,
    compatibilityJamo,
    jamoExtendedA,
    syllables,
    jamoExtendedB,
    halfwidth,
    reserved,
  ]);

  var composeSyllable = ((cho, jung, jong = 0) => (
    String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start)
    // this is the actual function that makes unicode syllable characters
    // where the characters are mapped to numbers. Take a look at
    // { choNum, jungNum, jongNum } from './unicode/syllable'
  ));

  class Result {
    constructor(result = '', remainder = []) {
      this.result = result;
      this.remainder = remainder;
    }
  }

  const Character = (val) => {
    const str = `${val}`;
    // not using .toString because Symbol.toPrimitive overrides when present
    if (str.length !== 1) {
      throw Error(`"${str}" is not a Character!`);
    }
    return str;
  };
  // this function turns values into characters if it can
  // otherwise it just fails
  const ENOARYLIKE = () => { throw TypeError('The data must be an Array or a String!'); };
  const toArray = aryOrStr => (Array.isArray(aryOrStr) ? aryOrStr : aryOrStr.split(''));
  // as a general note, calling .split like that instead of .split`` is faster
  const isCharacterGroup = (val) => {
    if (val.length < 1) {
      return false;
    } if (Array.isArray(val)) {
      if (val.length > 1) {
        return true;
      }
      return isCharacterGroup(val[0]);
    } if (typeof val === 'string' && val.length > 1) {
      return true;
    }
    return false;
  };
  // while Characters can be a CharacterGroup,
  // this function ignores characters
  const identity = i => i;
  const deepMap = (data, func, useToArray) => {
    const modifier = useToArray ? toArray : identity;
    if (Array.isArray(data)) {
      return data.map(val => (isCharacterGroup(val) ? deepMap(val, func, useToArray) : modifier(func(val))));
    } if (typeof data === 'string') {
      // since the data was a string, the array created from
      // the string won't contain any character groups
      return data.split('').map(char => modifier(func(char)));
    }
    ENOARYLIKE();
  };
  const deepFlatMap = (data, func) => {
    let res = '';
    if (Array.isArray(data)) {
      const len = data.length;
      for (let i = 0; i < len; i++) {
        // for is faster than forEach
        // this function is used a lot so I'll
        // take any optimization that I can get
        const val = data[i];
        if (isCharacterGroup(val)) {
          res += deepFlatMap(val, func);
        } else {
          const recurseRes = func(val);
          if (isCharacterGroup(recurseRes)) {
            res += deepFlatMap(recurseRes, identity);
          } else {
            res += recurseRes;
          }
        }
      }
    } else if (typeof data === 'string') {
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const recurseRes = func(data[i]);
        if (isCharacterGroup(recurseRes)) {
          res += deepFlatMap(recurseRes, identity);
        } else {
          res += recurseRes;
        }
      }
    } else {
      ENOARYLIKE();
    }
    return res;
  };
  const flatten = (data) => {
    if (Array.isArray(data)) {
      const res = [];
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (isCharacterGroup(val)) {
          res.push(...flatten(val));
        } else {
          res.push(val);
        }
      }
      return res;
    } if (typeof data === 'string') {
      return data.split('');
    }
    ENOARYLIKE();
  };
  const deepFlatResMap = (data, func) => {
    // this is different since it deals with functions that return Result objects.
    // consumeLeftovers
    let rem;
    // remaining
    const res = [];
    // result
    if (Array.isArray(data)) {
      rem = [];
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (isCharacterGroup(val)) {
          rem.push(...deepFlatResMap(val, func));
          // deepFlatResMap always returns an array
          // (or at least it should)
        } else {
          rem.push(val);
        }
      }
    } else if (typeof data === 'string') {
      rem = data.split('');
      // could have used toArray but since we already know
      // the type of this, there's no need to
    } else {
      // it's not an Array or a String
      ENOARYLIKE();
    }
    while (rem.length) {
      const comp = func(rem);
      // func needs to return a Result like interface for this to work
      // otherwise we'll get a really nasty to debug error
      res.push(comp.result);
      rem = comp.remainder;
    }
    return res;
  };

  // important note!
  // these functions aren't going to really make any sense until
  // you understand how they work in conjunction with the stuff
  // that's in './types'. Read './Result' and './types' first.
  // then read this.
  const objCache = [];
  const useComp3 = 0b001;
  const useArchaic = 0b010;
  const noUseJungJong = 0b100;
  const noCompDouble = 0b1000;
  const composeComplexBase = mode => (chars) => {
    // mode is being used as a bitfield
    if (mode < 0 || mode > 8) {
      throw Error('The mode cannot be less than zero or greater than eight!');
    }
    const usingArchaic = mode & useArchaic;
    const usingComp3 = usingArchaic && mode & useComp3;
    const usingNoCompDouble = mode & noCompDouble;
    let obj = objCache[mode];
    if (!obj) {
      const objs = [cho];
      // there are no comp3 values in non archaic complex objects
      if (!(mode & noUseJungJong)) {
        // if you're usingJungJong
        objs.push(jung, jong);
      } {
        objs.push(archaic);
      }
      obj = Object.assign({}, ...objs);
      objCache[mode] = obj;
      // eslint got mad at me for chaining assignments
    }
    const len = chars.length;
    if (len < 1) {
      throw Error('Cannot compose array of zero characters!');
    }
    const char1 = chars[0];
    if (len < 2) {
      // if there aren't even two Characters to use
      return new Result(char1);
    }
    const char2 = chars[1];
    if (usingNoCompDouble && char1 === char2) {
      return new Result(char1, chars.slice(1));
    }
    const comp2 = obj[char1 + char2];
    // comp2 = composition of 2 characters
    if (comp2) {
      if (usingComp3 && len > 2) {
        // if there's more data, try to compose a tripple
        const comp3 = obj[char1 + char2 + chars[2]];
        if (comp3) {
          return new Result(comp3, chars.slice(3));
        }
      }
      console.log({ char1, char2, comp2 });
      // there's no more data or couldn't find a comp3
      return new Result(comp2, chars.slice(2));
    }
    // couldn't find a comp2
    return new Result(char1, chars.slice(1));
  };
  const composeComplex = (ary, mode) => deepFlatResMap(ary, composeComplexBase(mode));
  var composeAnything = (mode => (ary) => {
    // while this function is named "composeSyllable", it actually
    // can be used to compose anything, really.
    if (ary.length < 2) {
      return new Result(ary[0]);
      // don't do extra computing for small operations
    }
    const cc = composeComplexBase(mode);
    // the composeComplex function with the mode that is specified
    const choRes = cc(ary);
    // ^^ that's a Result object
    const choChar = choRes.result;
    // the result of the composition, should be a Character
    const cho$$1 = choNum[choChar];
    // the number that the character is mapped to
    if (choRes.remainder.length < 1 || !Number.isInteger(cho$$1)) {
      // check if there's any more characters remaining
      // also check if it's not an integer since 0 == false
      // if it's not an integer, then return the potential
      // complex or Character that was made from composeAnyComplex
      return choRes;
      // choRes is already a Result so no need to make another
    }
    const jungRes = cc(choRes.remainder);
    const jungChar = jungRes.result;
    const jung$$1 = jungNum[jungChar];
    if (!Number.isInteger(jung$$1)) {
      // there's no need to check to see if there's any more
      // remaining since cho and jung are all that's needed
      // to compose a syllable
      return new Result(choChar, [jungChar, ...jungRes.remainder]);
      // still only return choChar as a result since we want
      // to try starting a syllable off with the jungChar next
      // time this function is called
    }
    if (jungRes.remainder.length > 0) {
      const jongRes = cc(jungRes.remainder);
      const jongChar = jongRes.result;
      const jong$$1 = jongNum[jongChar];
      if (!jong$$1) {
        // at this point, we've confirmed cho and jung characters
        // so return just a syllable of those two combined.
        return new Result(composeSyllable(cho$$1, jung$$1), [jongChar, ...jongRes.remainder]);
        // the jongChar, and the jungRes.remainder can be saved for later.
      }
      return new Result(composeSyllable(cho$$1, jung$$1, jong$$1), jongRes.remainder);
      // yay! complete syllable!
    }
    return new Result(composeSyllable(cho$$1, jung$$1));
    // The last argument is optional for the Result constructor
  });

  // if you're gonna copy this part, at least give me credit.
  // I had to do all of this manually.
  // also, I think turning all of these arrays into strings
  // might speed up composition by a bit.
  const jamo$1 = {
    ᄀ: 'ㄱ',
    ᄁ: ['ㄱ', 'ㄱ'],
    ᄂ: 'ㄴ',
    ᄃ: 'ㄷ',
    ᄄ: ['ㄷ', 'ㄷ'],
    ᄅ: 'ㄹ',
    ᄆ: 'ㅁ',
    ᄇ: 'ㅂ',
    ᄈ: ['ㅂ', 'ㅂ'],
    ᄉ: 'ㅅ',
    ᄊ: ['ㅅ', 'ㅅ'],
    ᄋ: 'ㅇ',
    ᄌ: 'ㅈ',
    ᄍ: ['ㅈ', 'ㅈ'],
    ᄎ: 'ㅊ',
    ᄏ: 'ㅋ',
    ᄐ: 'ㅌ',
    ᄑ: 'ㅍ',
    ᄒ: 'ㅎ',
    ᄓ: ['ㄴ', 'ㄱ'],
    ᄔ: ['ㄴ', 'ㄴ'],
    ᄕ: ['ㄴ', 'ㄷ'],
    ᄖ: ['ㄴ', 'ㅂ'],
    ᄗ: ['ㄷ', 'ㄱ'],
    ᄘ: ['ㄹ', 'ㄴ'],
    ᄙ: ['ㄹ', 'ㄹ'],
    ᄚ: ['ㄹ', 'ㅎ'],
    ᄛ: ['ㄹ', 'ㅇ'],
    ᄜ: ['ㅁ', 'ㅂ'],
    ᄝ: 'ㅱ',
    ᄞ: ['ㅂ', 'ㄱ'],
    ᄟ: ['ㅂ', 'ㄴ'],
    ᄠ: ['ㅂ', 'ㄷ'],
    ᄡ: ['ㅂ', 'ㅅ'],
    ᄢ: ['ㅂ', 'ㅅ', 'ㄱ'],
    ᄣ: ['ㅂ', 'ㅅ', 'ㄷ'],
    ᄤ: ['ㅂ', 'ㅅ', 'ㅂ'],
    ᄥ: ['ㅂ', 'ㅅ', 'ㅅ'],
    ᄦ: ['ㅂ', 'ㅅ', 'ㅈ'],
    ᄧ: ['ㅂ', 'ㅈ'],
    ᄨ: ['ㅂ', 'ㅊ'],
    ᄩ: ['ㅂ', 'ㅌ'],
    ᄪ: ['ㅂ', 'ㅍ'],
    ᄫ: ['ㅂ', 'ㅇ'],
    ᄬ: ['ㅂ', 'ㅂ', 'ㅇ'],
    ᄭ: ['ㅅ', 'ㄱ'],
    ᄮ: ['ㅅ', 'ㄴ'],
    ᄯ: ['ㅅ', 'ㄷ'],
    ᄰ: ['ㅅ', 'ㄹ'],
    ᄱ: ['ㅅ', 'ㅁ'],
    ᄲ: ['ㅅ', 'ㅂ'],
    ᄳ: ['ㅅ', 'ㅂ', 'ㄱ'],
    ᄴ: ['ㅅ', 'ㅅ', 'ㅅ'],
    ᄵ: ['ㅅ', 'ㅇ'],
    ᄶ: ['ㅅ', 'ㅈ'],
    ᄷ: ['ㅅ', 'ㅊ'],
    ᄸ: ['ㅅ', 'ㅋ'],
    ᄹ: ['ㅅ', 'ㅌ'],
    ᄺ: ['ㅅ', 'ㅍ'],
    ᄻ: ['ㅅ', 'ㅎ'],
    ᄼ: null,
    ᄽ: null,
    ᄾ: null,
    ᄿ: null,
    ᅀ: 'ㅿ',
    ᅁ: ['ㅇ', 'ㄱ'],
    ᅂ: ['ㅇ', 'ㄷ'],
    ᅃ: ['ㅇ', 'ㅁ'],
    ᅄ: ['ㅇ', 'ㅂ'],
    ᅅ: ['ㅇ', 'ㅅ'],
    ᅆ: ['ㅇ', 'ㅿ'],
    ᅇ: ['ㅇ', 'ㅇ'],
    ᅈ: ['ㅇ', 'ㅈ'],
    ᅉ: ['ㅇ', 'ㅊ'],
    ᅊ: ['ㅇ', 'ㅌ'],
    ᅋ: ['ㅇ', 'ㅍ'],
    ᅌ: 'ㆁ',
    ᅍ: ['ㅈ', 'ㅇ'],
    ᅎ: null,
    ᅏ: null,
    ᅐ: null,
    ᅑ: null,
    ᅒ: ['ㅊ', 'ㅋ'],
    ᅓ: ['ㅊ', 'ㅎ'],
    ᅔ: null,
    ᅕ: null,
    ᅖ: ['ㅂ', 'ㅂ'],
    ᅗ: 'ㆄ',
    ᅘ: ['ㅎ', 'ㅎ'],
    ᅙ: 'ㆆ',
    ᅚ: ['ㄱ', 'ㄷ'],
    ᅛ: ['ㄱ', 'ㅅ'],
    ᅜ: ['ㄱ', 'ㅈ'],
    ᅝ: ['ㄱ', 'ㅎ'],
    ᅞ: ['ㄷ', 'ㄹ'],
    ᅡ: 'ㅏ',
    ᅢ: 'ㅐ',
    ᅣ: 'ㅑ',
    ᅤ: 'ㅒ',
    ᅥ: 'ㅓ',
    ᅦ: 'ㅔ',
    ᅧ: 'ㅕ',
    ᅨ: 'ㅖ',
    ᅩ: 'ㅗ',
    ᅪ: ['ㅗ', 'ㅏ'],
    ᅫ: ['ㅗ', 'ㅐ'],
    ᅬ: ['ㅗ', 'ㅣ'],
    ᅭ: 'ㅛ',
    ᅮ: 'ㅜ',
    ᅯ: ['ㅜ', 'ㅓ'],
    ᅰ: ['ㅜ', 'ㅔ'],
    ᅱ: ['ㅜ', 'ㅣ'],
    ᅲ: 'ㅠ',
    ᅳ: 'ㅡ',
    ᅴ: ['ㅡ', 'ㅣ'],
    ᅵ: 'ㅣ',
    ᅶ: ['ㅏ', 'ㅗ'],
    ᅷ: ['ㅏ', 'ㅜ'],
    ᅸ: ['ㅑ', 'ㅗ'],
    ᅹ: ['ㅑ', 'ㅛ'],
    ᅺ: ['ㅓ', 'ㅗ'],
    ᅻ: ['ㅓ', 'ㅜ'],
    ᅼ: ['ㅓ', 'ㅡ'],
    ᅽ: ['ㅕ', 'ㅗ'],
    ᅾ: ['ㅕ', 'ㅜ'],
    ᅿ: ['ㅗ', 'ㅓ'],
    ᆀ: ['ㅔ', 'ㅗ'],
    ᆁ: ['ㅖ', 'ㅗ'],
    ᆂ: ['ㅗ', 'ㅗ'],
    ᆃ: ['ㅗ', 'ㅜ'],
    ᆄ: ['ㅛ', 'ㅑ'],
    ᆅ: ['ㅛ', 'ㅒ'],
    ᆆ: ['ㅛ', 'ㅕ'],
    ᆇ: ['ㅛ', 'ㅗ'],
    ᆈ: ['ㅛ', 'ㅣ'],
    ᆉ: ['ㅜ', 'ㅏ'],
    ᆊ: ['ㅜ', 'ㅐ'],
    ᆋ: ['ㅜ', 'ㅓ', 'ㅡ'],
    ᆌ: ['ㅜ', 'ㅖ'],
    ᆍ: ['ㅜ', 'ㅜ'],
    ᆎ: ['ㅠ', 'ㅏ'],
    ᆏ: ['ㅠ', 'ㅓ'],
    ᆐ: ['ㅠ', 'ㅔ'],
    ᆑ: ['ㅠ', 'ㅕ'],
    ᆒ: ['ㅠ', 'ㅔ'],
    ᆓ: ['ㅠ', 'ㅜ'],
    ᆔ: ['ㅠ', 'ㅣ'],
    ᆕ: ['ㅡ', 'ㅜ'],
    ᆖ: ['ㅡ', 'ㅡ'],
    ᆗ: ['ㅡ', 'ㅣ', 'ㅜ'],
    ᆘ: ['ㅣ', 'ㅏ'],
    ᆙ: ['ㅣ', 'ㅑ'],
    ᆚ: ['ㅣ', 'ㅗ'],
    ᆛ: ['ㅣ', 'ㅜ'],
    ᆜ: ['ㅣ', 'ㅡ'],
    ᆝ: null,
    ᆞ: 'ㆍ',
    ᆟ: ['ㆍ', 'ㅓ'],
    ᆠ: ['ㆍ', 'ㅜ'],
    ᆡ: ['ㆍ', 'ㅣ'],
    ᆢ: ['ㆍ', 'ㆍ'],
    ᆣ: ['ㅏ', 'ㅡ'],
    ᆤ: ['ㅑ', 'ㅜ'],
    ᆥ: ['ㅕ', 'ㅑ'],
    ᆦ: ['ㅗ', 'ㅑ'],
    ᆧ: ['ㅗ', 'ㅒ'],
    ᆨ: 'ㄱ',
    ᆩ: ['ㄱ', 'ㄱ'],
    ᆪ: ['ㄱ', 'ㅅ'],
    ᆫ: 'ㄴ',
    ᆬ: ['ㄴ', 'ㅈ'],
    ᆭ: ['ㄴ', 'ㅎ'],
    ᆮ: 'ㄷ',
    ᆯ: 'ㄹ',
    ᆰ: ['ㄹ', 'ㄱ'],
    ᆱ: ['ㄹ', 'ㅁ'],
    ᆲ: ['ㄹ', 'ㅂ'],
    ᆳ: ['ㄹ', 'ㅅ'],
    ᆴ: ['ㄹ', 'ㅌ'],
    ᆵ: ['ㄹ', 'ㅍ'],
    ᆶ: ['ㄹ', 'ㅎ'],
    ᆷ: 'ㅁ',
    ᆸ: 'ㅂ',
    ᆹ: ['ㅂ', 'ㅅ'],
    ᆺ: 'ㅅ',
    ᆻ: ['ㅅ', 'ㅅ'],
    ᆼ: 'ㅇ',
    ᆽ: 'ㅈ',
    ᆾ: 'ㅊ',
    ᆿ: 'ㅋ',
    ᇀ: 'ㅌ',
    ᇁ: 'ㅍ',
    ᇂ: 'ㅎ',
    ᇃ: ['ㄱ', 'ㄹ'],
    ᇄ: ['ㄱ', 'ㅅ', 'ㄱ'],
    ᇅ: ['ㄴ', 'ㄱ'],
    ᇆ: ['ㄴ', 'ㄷ'],
    ᇇ: ['ㄴ', 'ㅅ'],
    ᇈ: ['ㄴ', 'ㅿ'],
    ᇉ: ['ㄴ', 'ㅌ'],
    ᇊ: ['ㄷ', 'ㄱ'],
    ᇋ: ['ㄷ', 'ㄹ'],
    ᇌ: ['ㄹ', 'ㄱ', 'ㅅ'],
    ᇍ: ['ㄹ', 'ㄴ'],
    ᇎ: ['ㄹ', 'ㄷ'],
    ᇏ: ['ㄹ', 'ㄷ', 'ㅎ'],
    ᇐ: ['ㄹ', 'ㄹ'],
    ᇑ: ['ㄹ', 'ㅁ', 'ㄱ'],
    ᇒ: ['ㄹ', 'ㅁ', 'ㅅ'],
    ᇓ: ['ㄹ', 'ㅂ', 'ㅅ'],
    ᇔ: ['ㄹ', 'ㅂ', 'ㅎ'],
    ᇕ: ['ㄹ', 'ㅸ'],
    ᇖ: ['ㄹ', 'ㅅ', 'ㅅ'],
    ᇗ: ['ㄹ', 'ㅿ'],
    ᇘ: ['ㄹ', 'ㅋ'],
    ᇙ: ['ㄹ', 'ㆆ'],
    ᇚ: ['ㅁ', 'ㄱ'],
    ᇛ: ['ㅁ', 'ㄹ'],
    ᇜ: ['ㅁ', 'ㅂ'],
    ᇝ: ['ㅁ', 'ㅅ'],
    ᇞ: ['ㅁ', 'ㅅ', 'ㅅ'],
    ᇟ: ['ㅁ', 'ㅿ'],
    ᇠ: ['ㅁ', 'ㅊ'],
    ᇡ: ['ㅁ', 'ㅎ'],
    ᇢ: 'ㅱ',
    ᇣ: ['ㅂ', 'ㄹ'],
    ᇤ: ['ㅂ', 'ㅍ'],
    ᇥ: ['ㅂ', 'ㅎ'],
    ᇦ: ['ㅂ', 'ㅇ'],
    ᇧ: ['ㅅ', 'ㄱ'],
    ᇨ: ['ㅅ', 'ㄷ'],
    ᇩ: ['ㅅ', 'ㄹ'],
    ᇪ: ['ㅅ', 'ㅂ'],
    ᇫ: 'ㅿ',
    ᇬ: ['ㆁ', 'ㄱ'],
    ᇭ: ['ㆁ', 'ㄱ', 'ㄱ'],
    ᇮ: ['ㆁ', 'ㆁ'],
    ᇯ: ['ㆁ', 'ㅋ'],
    ᇰ: 'ㆁ',
    ᇱ: ['ㆁ', 'ㅅ'],
    ᇲ: ['ㆁ', 'ㅿ'],
    ᇳ: ['ㅍ', 'ㅂ'],
    ᇴ: 'ㆄ',
    ᇵ: ['ㅎ', 'ㄴ'],
    ᇶ: ['ㅎ', 'ㄹ'],
    ᇷ: ['ㅎ', 'ㅁ'],
    ᇸ: ['ㅎ', 'ㅂ'],
    ᇹ: 'ㆆ',
    ᇺ: ['ㄱ', 'ㄴ'],
    ᇻ: ['ㄱ', 'ㅂ'],
    ᇼ: ['ㄱ', 'ㅊ'],
    ᇽ: ['ㄱ', 'ㅋ'],
    ᇾ: ['ㄱ', 'ㅎ'],
    ᇿ: ['ㄴ', 'ㄴ'],
  };
  const jamoExtendedA$1 = {
    ꥠ: ['ㄷ', 'ㅁ'],
    ꥡ: ['ㄷ', 'ㅂ'],
    ꥢ: ['ㄷ', 'ㅅ'],
    ꥣ: ['ㄷ', 'ㅈ'],
    ꥤ: ['ㄹ', 'ㄱ'],
    ꥥ: ['ㄹ', 'ㄱ', 'ㄱ'],
    ꥦ: ['ㄹ', 'ㄷ'],
    ꥧ: ['ㄹ', 'ㄷ', 'ㄷ'],
    ꥨ: ['ㄹ', 'ㅁ'],
    ꥩ: ['ㄹ', 'ㅂ'],
    ꥪ: ['ㄹ', 'ㅂ', 'ㅂ'],
    ꥫ: ['ㄹ', 'ㅸ'],
    ꥬ: ['ㄹ', 'ㅅ'],
    ꥭ: ['ㄹ', 'ㅈ'],
    ꥮ: ['ㄹ', 'ㅋ'],
    ꥯ: ['ㅁ', 'ㄱ'],
    ꥰ: ['ㅁ', 'ㄷ'],
    ꥱ: ['ㅁ', 'ㅅ'],
    ꥲ: ['ㅂ', 'ㅅ', 'ㅌ'],
    ꥳ: ['ㅂ', 'ㅋ'],
    ꥴ: ['ㅂ', 'ㅎ'],
    ꥵ: ['ㅅ', 'ㅅ', 'ㅂ'],
    ꥶ: ['ㅇ', 'ㄹ'],
    ꥷ: ['ㅇ', 'ㅎ'],
    ꥸ: ['ㅈ', 'ㅈ', 'ㅎ'],
    ꥹ: ['ㅌ', 'ㅌ'],
    ꥺ: ['ㅍ', 'ㅎ'],
    ꥻ: ['ㅎ', 'ㅅ'],
    ꥼ: ['ㆆ', 'ㆆ'],
  };
  const jamoExtendedB$1 = {
    ힰ: ['ㅗ', 'ㅕ'],
    ힱ: ['ㅗ', 'ㅗ', 'ㅣ'],
    ힲ: ['ㅛ', 'ㅏ'],
    ힳ: ['ㅛ', 'ㅐ'],
    ힴ: ['ㅛ', 'ㅓ'],
    ힵ: ['ㅜ', 'ㅕ'],
    ힶ: ['ㅜ', 'ㅣ', 'ㅣ'],
    ힷ: ['ㅠ', 'ㅐ'],
    ힸ: ['ㅠ', 'ㅗ'],
    ힹ: ['ㅡ', 'ㅏ'],
    ힺ: ['ㅡ', 'ㅓ'],
    ힻ: ['ㅡ', 'ㅔ'],
    ힼ: ['ㅡ', 'ㅗ'],
    ힽ: ['ㅣ', 'ㅏ', 'ㅗ'],
    ힾ: ['ㅣ', 'ㅒ'],
    ힿ: ['ㅣ', 'ㅕ'],
    ퟀ: ['ㅣ', 'ㅖ'],
    ퟁ: ['ㅣ', 'ㅗ', 'ㅣ'],
    ퟂ: ['ㅣ', 'ㅛ'],
    ퟃ: ['ㅣ', 'ㅠ'],
    ퟄ: ['ㅣ', 'ㅣ'],
    ퟅ: ['ㆍ', 'ㅏ'],
    ퟆ: ['ㆍ', 'ㅔ'],
    ퟋ: ['ㄴ', 'ㄹ'],
    ퟌ: ['ㄴ', 'ㅈ'],
    ퟍ: ['ㄷ', 'ㄷ'],
    ퟎ: ['ㄷ', 'ㄷ', 'ㅂ'],
    ퟏ: ['ㄷ', 'ㅂ'],
    ퟐ: ['ㄷ', 'ㅅ'],
    ퟑ: ['ㄷ', 'ㅅ', 'ㄱ'],
    ퟒ: ['ㄷ', 'ㅈ'],
    ퟓ: ['ㄷ', 'ㅊ'],
    ퟔ: ['ㄷ', 'ㅌ'],
    ퟕ: ['ㄹ', 'ㄱ', 'ㄱ'],
    ퟖ: ['ㄹ', 'ㄱ', 'ㅎ'],
    ퟗ: ['ㄹ', 'ㄹ', 'ㅋ'],
    ퟘ: ['ㄹ', 'ㅁ', 'ㅎ'],
    ퟙ: ['ㄹ', 'ㅂ', 'ㄷ'],
    ퟚ: ['ㄹ', 'ㅂ', 'ㅍ'],
    ퟛ: ['ㄹ', 'ㆁ'],
    ퟜ: ['ㄹ', 'ㆆ', 'ㅎ'],
    ퟝ: null,
    ퟞ: ['ㅁ', 'ㄴ'],
    ퟟ: ['ㅁ', 'ㄴ', 'ㄴ'],
    ퟠ: ['ㅁ', 'ㅁ'],
    ퟡ: ['ㅁ', 'ㅂ', 'ㅅ'],
    ퟢ: ['ㅁ', 'ㅈ'],
    ퟣ: ['ㅂ', 'ㄷ'],
    ퟤ: ['ㅂ', 'ㄹ', 'ㅍ'],
    ퟥ: ['ㅂ', 'ㅁ'],
    ퟦ: ['ㅂ', 'ㅂ'],
    ퟧ: ['ㅂ', 'ㅅ', 'ㄷ'],
    ퟨ: ['ㅂ', 'ㅈ'],
    ퟩ: ['ㅂ', 'ㅊ'],
    ퟪ: ['ㅅ', 'ㅁ'],
    ퟫ: ['ㅅ', 'ㅸ'],
    ퟬ: ['ㅅ', 'ㅅ', 'ㄱ'],
    ퟭ: ['ㅅ', 'ㅅ', 'ㄷ'],
    ퟮ: ['ㅅ', 'ㅿ'],
    ퟯ: ['ㅅ', 'ㅈ'],
    ퟰ: ['ㅅ', 'ㅊ'],
    ퟱ: ['ㅅ', 'ㅌ'],
    ퟲ: ['ㅅ', 'ㅎ'],
    ퟳ: ['ㅿ', 'ㅂ'],
    ퟴ: ['ㅿ', 'ㅸ'],
    ퟵ: ['ㆁ', 'ㅁ'],
    ퟶ: ['ㆁ', 'ㅎ'],
    ퟷ: ['ㅈ', 'ㅂ'],
    ퟸ: ['ㅈ', 'ㅂ', 'ㅂ'],
    ퟹ: ['ㅈ', 'ㅈ'],
    ퟺ: ['ㅍ', 'ㅅ'],
    ퟻ: ['ㅍ', 'ㅌ'],
  };
  const halfwidth$1 = {
    ﾡ: 'ㄱ',
    ﾢ: ['ㄱ', 'ㄱ'],
    ﾣ: ['ㄱ', 'ㅅ'],
    ﾤ: 'ㄴ',
    ﾥ: ['ㄴ', 'ㅈ'],
    ﾦ: ['ㄴ', 'ㅎ'],
    ﾧ: 'ㄷ',
    ﾨ: ['ㄷ', 'ㄷ'],
    ﾩ: 'ㄹ',
    ﾪ: ['ㄹ', 'ㄱ'],
    ﾫ: ['ㄹ', 'ㅁ'],
    ﾬ: ['ㄹ', 'ㅂ'],
    ﾭ: ['ㄹ', 'ㅅ'],
    ﾮ: ['ㄹ', 'ㅌ'],
    ﾯ: ['ㄹ', 'ㅍ'],
    ﾰ: ['ㄹ', 'ㅎ'],
    ﾱ: 'ㅁ',
    ﾲ: 'ㅂ',
    ﾳ: ['ㅂ', 'ㅂ'],
    ﾴ: ['ㅂ', 'ㅅ'],
    ﾵ: 'ㅅ',
    ﾶ: ['ㅅ', 'ㅅ'],
    ﾷ: 'ㅇ',
    ﾸ: 'ㅈ',
    ﾹ: ['ㅈ', 'ㅈ'],
    ﾺ: 'ㅊ',
    ﾻ: 'ㅋ',
    ﾼ: 'ㅌ',
    ﾽ: 'ㅍ',
    ﾾ: 'ㅎ',
    ￂ: 'ㅏ',
    ￃ: 'ㅐ',
    ￄ: 'ㅑ',
    ￅ: 'ㅒ',
    ￆ: 'ㅓ',
    ￇ: 'ㅔ',
    ￊ: 'ㅕ',
    ￋ: 'ㅖ',
    ￌ: 'ㅗ',
    ￍ: ['ㅗ', 'ㅏ'],
    ￎ: ['ㅗ', 'ㅐ'],
    ￏ: ['ㅗ', 'ㅣ'],
    ￒ: 'ㅛ',
    ￓ: 'ㅜ',
    ￔ: ['ㅜ', 'ㅓ'],
    ￕ: ['ㅜ', 'ㅔ'],
    ￖ: ['ㅜ', 'ㅣ'],
    ￗ: 'ㅠ',
    ￚ: 'ㅡ',
    ￛ: ['ㅡ', 'ㅣ'],
    ￜ: 'ㅣ',
  };
  const all = Object.assign({}, jamo$1, jamoExtendedA$1, jamoExtendedB$1, halfwidth$1);

  // tries to transform everything into disassembled standard hangul

  const transformChar = char => (!standardHangul.contains(char) && all[char]) || char;
  const transformDatum = datum => transformChar(Character(datum));
  const transformEveryChar = char => (
    (standardHangul.contains(char) ? pairs : all)[char]
    || char
  );
  const transformEveryDatum = datum => transformEveryChar(Character(datum));
  // transform everything just means that it also transforms
  // standard hangul characters instead of ignoring them

  // this way, we can trust the inputs to composeAnything
  const assembleFactory = transformer => (data, mode) => deepFlatResMap(transformer(data), composeAnything(mode));
  // the transformer should verify that each datum is a Character!
  const assembleTransformer = data => deepMap(data, transformEveryDatum);
  // this takes a CharacterGroup and transforms characters and
  // complex characters, effectively leaving behind only the
  // base Characters
  // it doesn't decomposeSyllables though
  var assemble = (assembleFactory(assembleTransformer));

  const transformExceptCho = (char) => {
    const res = transformEveryChar(char);
    if (Array.isArray(res)) {
      const comp = composeComplex(res, noUseJungJong);
      // the default composeComplex only composes cho
      // HACK: this bug might be an issue with composeComplex
      // it also might be present in './standardize' line 13
      if (Array.isArray(comp) && comp.length === 1) {
        // if the composition actually ends up composing
        // something and it's only one Character, just
        // return the Character instead of an Array
        return Character(comp);
      }
      return comp;
    }
    return res;
  };
  // this function is needed by disassemble so it's trusting
  var decomposeComplex = ((datum, decomposeDoubles) => toArray((decomposeDoubles ? transformEveryChar : transformExceptCho)(Character(datum))));

  const trustMe = (char) => {
    const code = char.codePointAt(0) - syllables.start;
    const jongNum$$1 = code % 28;
    const q = (code - jongNum$$1) / 28;
    const jungNum$$1 = q % 21;
    const choNum$$1 = 0 | q / 21; // basically Math.floor(q / 21)
    return [cho$1[choNum$$1], jung$1[jungNum$$1], jong$1[jongNum$$1]].filter(v => v);
    // the .filter(v => v) removes blank space in the array
  };
  var decomposeSyllable = ((datum, hardFail) => {
    const char = Character(datum);
    if (!syllables.contains(char)) {
      if (hardFail) {
        throw Error('Decomposing a syllable requires a syllable to decompose!');
      }
      return [datum];
      // if there's no hardFail, the function must
      // still return the same type as it would have
      // if it didn't fail
    }
    return trustMe(char);
  });

  const disassembleFactory = transformer => (datum) => {
    const char = Character(datum);
    if (syllables.contains(char)) {
      return trustMe(char).map(transformer);
      // that .map(transformEverything) catches the complex
      // characters that decomposeSyllable returns
    }
    // otherwise try breaking complex characters apart
    return transformer(char);
  };
  const disassembleAll = disassembleFactory(transformEveryChar);
  const disassemble = disassembleFactory(transformExceptCho);
  // not to be confused with Hangul.disassemble
  // this disassemble takes Characters as inputs, not CharacterGroups
  const disassembleChar = (datum, grouped, decomposeDoubles) => {
    const res = (decomposeDoubles ? disassembleAll : disassemble)(datum);
    if (!grouped) {
      return flatten(res);
    }
    return res;
  };
  var disassemble$1 = ((data, grouped, decomposeDoubles) => (grouped ? deepMap : deepFlatMap)(data, decomposeDoubles ? disassembleAll : disassemble, true));
  // I know this looks really bad since it's all on
  // one line but ESlint was being really finicky

  // This file is only used in ../publicCompose
  // all is the only one of these that's actually used
  const all$1 = {
    ㄱ: {
      ㄱ: 'ㄲ',
      ㅅ: 'ㄳ',
    },
    ㄷ: {
      ㄷ: 'ㄸ',
    },
    ㅅ: {
      ㅅ: 'ㅆ',
      ㄱ: 'ㅺ',
      ㄴ: 'ㅻ',
      ㄷ: 'ㅼ',
      ㅂ: 'ㅽ',
      ㅈ: 'ㅾ',
    },
    ㅈ: {
      ㅈ: 'ㅉ',
    },
    ㅂ: {
      ㅂ: 'ㅃ',
      ㅅ: {
        $: 'ㅄ',
        ㄱ: 'ㅴ',
        ㄷ: 'ㅵ',
      },
      ㄱ: 'ㅲ',
      ㄷ: 'ㅳ',
      ㅈ: 'ㅶ',
      ㅌ: 'ㅷ',
    },
    ㅗ: {
      ㅏ: 'ㅘ',
      ㅐ: 'ㅙ',
      ㅣ: 'ㅚ',
    },
    ㅜ: {
      ㅓ: 'ㅝ',
      ㅔ: 'ㅞ',
      ㅣ: 'ㅟ',
    },
    ㅡ: {
      ㅣ: 'ㅢ',
    },
    ㄴ: {
      ㅈ: 'ㄵ',
      ㅎ: 'ㄶ',
      ㄴ: 'ㅥ',
      ㄷ: 'ㅦ',
      ㅅ: 'ㅧ',
      ㅿ: 'ㅨ',
    },
    ㄹ: {
      ㄱ: {
        $: 'ㄺ',
        ㅅ: 'ㅩ',
      },
      ㅁ: 'ㄻ',
      ㅂ: {
        $: 'ㄼ',
        ㅅ: 'ㅫ',
      },
      ㅅ: 'ㄽ',
      ㅌ: 'ㄾ',
      ㅍ: 'ㄿ',
      ㅎ: 'ㅀ',
      ㄷ: 'ㅪ',
      ㅿ: 'ㅬ',
      ㆆ: 'ㅭ',
    },
    ㅁ: {
      ㅂ: 'ㅮ',
      ㅅ: 'ㅯ',
      ㅿ: 'ㅰ',
    },
    ㅇ: {
      ㅇ: 'ㆀ',
    },
    ㆁ: {
      ㅅ: 'ㆁ',
      ㅿ: 'ㅿ',
    },
    ㅎ: {
      ㅎ: 'ㆅ',
    },
    ㅛ: {
      ㅑ: 'ㆇ',
      ㅒ: 'ㆈ',
      ㅣ: 'ㆉ',
    },
    ㅠ: {
      ㅕ: 'ㆊ',
      ㅖ: 'ㆋ',
      ㅣ: 'ㆌ',
    },
    ㆍ: {
      ㅣ: 'ㆎ',
    },
  };

  const standardizeCharacterBase = mode => (datum) => {
    const res = transformDatum(datum);
    if (Array.isArray(res)) {
      // atempt compose only if the value is an array
      // it's unfortunate, but any compFn is untrusting
      // since it's basically accessed publicly
      // we know that v will always have good types
      // but compFn will still check for Characters
      return composeComplex(datum, mode);
      // returns an Array
    }
    return res;
  };
  var standardize = ((data, grouped, mode) => (grouped ? deepMap : deepFlatMap)(data, standardizeCharacterBase(mode)));

  // since these functions are exposed, the characters must be
  // standardized so that the libaray can function properly
  const standardizeCharacter = standardizeCharacterBase(0b011);
  const complex$1 = (first, second, third = '', hardFail) => {
    if (first === undefined || second === undefined) {
      throw Error('Cannot compose a complex with less than two values!');
    }
    const d1 = all$1[standardizeCharacter(first)];
    // depth 1
    if (!d1) {
      if (hardFail) {
        throw Error(`There's no complex character that starts with ${first}`);
      }
      return `${first}${second}${third}`;
    }
    const d2 = d1[standardizeCharacter(second)];
    // depth 2
    if (!d2) {
      if (hardFail) {
        throw Error(`Cannot combine ${first} and ${second}`);
      }
      return `${first}${second}${third}`;
    }
    const d2val = d2.$ || d2;
    if (third) {
      // if there's a third character (optional)
      const d3 = d2[standardizeCharacter(third)];
      // depth 3
      if (!d3) {
        // if depth 3 doesn't exist
        if (hardFail) {
          throw Error(`Found ${d2val} but cannot combine ${first}, ${second}, and ${third}`);
          // the reason for this ^^^ is because sometimes
          // d2 is a string rather than an object
        }
        return `${d2val}${third}`;
        // at depth three, there should be a complex formed from
        // the first and second characters so return that instead
        // of the inputs concatenated
      }
      return d3; // this should always be a string
    }
    // the third character was falsey so just return the composition
    return d2val;
  };
  // this function will always return a String or it'll error (hardFail)
  // there's probably a better way to structure these if-statements
  // so if anyone comes up with one, I'll take it

  const syllable = (choChar, jungChar = '', jongChar = '', hardFail) => {
    const cho = choNum[standardizeCharacter(choChar)];
    const jung = jungNum[standardizeCharacter(jungChar)];
    let jong;
    if (jongChar) {
      jong = jongNum[standardizeCharacter(jongChar)];
    } if (!Number.isInteger(cho)) {
      if (hardFail) {
        throw Error(`"${choChar}" is not a valid cho Character`);
      }
      return `${choChar}${jungChar}${jongChar}`;
    } if (!Number.isInteger(jung)) {
      if (hardFail) {
        throw Error(`"${jungChar}" is not a valid jung Character`);
      }
      return `${choChar}${jungChar}${jongChar}`;
    } if (jongChar && !Number.isInteger(jong)) {
      // check if it exists because !Number.isInteger(undefined)
      // is true and we don't want that happening since jongChar
      // is optional
      if (hardFail) {
        throw Error(`"${jongChar}" is not a valid jong character`);
      }
      // getting here means that the cho and jung
      // characters were valid, so call composeSyllable
      return `${composeSyllable(cho, jung)}${jongChar}`;
    }
    return composeSyllable(cho, jung, jong);
  };
  // by nesting all if-statements under if (hardFail)
  // there might be a little better performance but I'm
  // sure that it's pretty trivial.

  var stronger$1 = (data => standardize(data, false, true).map(char => stronger[char] || char));
  // standardize(data, grouped, depth3)
  // allow depth3 so as not to tamper with archaic unicode

  const consonants = {
    ㄱ: 1,
    ㄴ: 1,
    ㄷ: 1,
    ㄹ: 1,
    ㅁ: 1,
    ㅂ: 1,
    ㅅ: 1,
    ㅇ: 1,
    ㅈ: 1,
    ㅊ: 1,
    ㅋ: 1,
    ㅌ: 1,
    ㅍ: 1,
    ㅎ: 1,
    ㆁ: 1, // apparently this is now "ㅇ"
    ㆄ: 1,
    ㅱ: 1,
    ㅿ: 1,
  };
  const vowels = {
    ㅏ: 1,
    ㅐ: 1,
    ㅑ: 1,
    ㅓ: 1,
    ㅔ: 1,
    ㅕ: 1,
    ㅖ: 1,
    ㅗ: 1,
    ㅛ: 1,
    ㅜ: 1,
    ㅠ: 1,
    ㅡ: 1,
    ㅣ: 1,
    ㆍ: 1,
  };
  const hangulToKey = {
    ㅂ: 'q',
    ㅃ: 'Q',
    ㅈ: 'w',
    ㅉ: 'W',
    ㄷ: 'e',
    ㄸ: 'E',
    ㄱ: 'r',
    ㄲ: 'R',
    ㅅ: 't',
    ㅆ: 'T',
    ㅛ: 'y',
    ㅕ: 'u',
    ㅑ: 'i',
    ㅐ: 'o',
    ㅒ: 'O',
    ㅔ: 'p',
    ㅖ: 'P',
    ㅁ: 'a',
    ㄴ: 's',
    ㅇ: 'd',
    ㄹ: 'f',
    ㅎ: 'g',
    ㅗ: 'h',
    ㅓ: 'j',
    ㅏ: 'k',
    ㅣ: 'l',
    ㅋ: 'z',
    ㅌ: 'x',
    ㅊ: 'c',
    ㅍ: 'v',
    ㅠ: 'b',
    ㅜ: 'n',
    ㅡ: 'm',
  };
  const keyToHangul = {
    q: 'ㅂ',
    Q: 'ㅃ',
    w: 'ㅈ',
    W: 'ㅉ',
    e: 'ㄷ',
    E: 'ㄸ',
    r: 'ㄱ',
    R: 'ㄲ',
    t: 'ㅅ',
    T: 'ㅆ',
    y: 'ㅛ',
    u: 'ㅕ',
    i: 'ㅑ',
    o: 'ㅐ',
    O: 'ㅒ',
    p: 'ㅔ',
    P: 'ㅖ',
    a: 'ㅁ',
    s: 'ㄴ',
    d: 'ㅇ',
    f: 'ㄹ',
    g: 'ㅎ',
    h: 'ㅗ',
    j: 'ㅓ',
    k: 'ㅏ',
    l: 'ㅣ',
    z: 'ㅋ',
    x: 'ㅌ',
    c: 'ㅊ',
    v: 'ㅍ',
    b: 'ㅠ',
    n: 'ㅜ',
    m: 'ㅡ',
  };
  // the reason the data is stored like this is because iterating
  // through an array is slower than just getting a key from an object
  // In this case though, it might be faster since arrays are allocated
  // on the heap instead of the stack?

  // I realize that I can programmatically reverse the key-value pairs during
  // runtime but since I can just do it now, it's just a little faster.

  const hangulToKeyFn = char => hangulToKey[char] || char;
  const keyToHangulFn = char => keyToHangul[char];
  const transformToKeys = (hangulChar) => {
    const res = transformExceptCho(hangulChar);
    return Array.isArray(res) ? res.map(hangulToKeyFn) : hangulToKeyFn(res);
  };
  const disassembleToKeys = disassembleFactory(transformToKeys);
  const toKeys = (data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleToKeys);
  const transformCharToHangul = (latinDatum) => {
    const latinChar = Character(latinDatum);
    const res = keyToHangulFn(latinChar);
    if (!res) {
      // couldn't find a key for that characters
      const lowerCaseRes = keyToHangulFn(latinChar.toLowerCase());
      if (!lowerCaseRes) {
        return latinChar;
      }
      return lowerCaseRes;
    }
    return res;
  };
  // it's okay that we're not standarizing because the data
  // in hangulToKey is already standard :)
  const transformToHangul = data => deepMap(data, transformCharToHangul);
  const assembleFromKeys = assembleFactory(transformToHangul);
  const fromKeys = data => assembleFromKeys(data, noCompDouble);

  var testMulti = (aryFnName => isFn => data => deepFlatMap(data, transformEveryDatum)[aryFnName](isFn));

  var contains = (testMulti('some'));

  var is = (isFn => (datum) => {
    const res = transformEveryDatum(datum);
    // it's okay that we don't check if data is
    // a Character since transformEveryCharacter does.
    return Array.isArray(res) ? res.every(isFn) : isFn(res);
  });

  var isAll = (testMulti('every'));

  var name = ((obj) => {
    Object.keys(obj).forEach((key) => {
      obj[key].displayName = key;
    });
  });

  const consonant = char => consonants[char];
  const isConsonant = is(consonant);
  const isConsonantAll = isAll(consonant);
  const containsConsonant = contains(consonant);
  name({
    isConsonant,
    isConsonantAll,
    containsConsonant,
  });

  const vowel = char => vowels[char];
  const isVowel = is(vowel);
  const isVowelAll = isAll(vowel);
  const containsVowel = contains(vowel);
  name({
    isVowel,
    isVowelAll,
    containsVowel,
  });

  const isAll$1 = testFn => (data) => {
    const len = data.length;
    if (Array.isArray(data)) {
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (isCharacterGroup(val) ? isAll$1(testFn)(val) : testFn(val)) {
          continue;
        }
        // the loop will get here if it doesn't satisfy the testing function
        return false;
      }
      return true;
    } if (typeof data === 'string') {
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (testFn(val)) {
          continue;
        }
        return false;
      }
      return true;
    }
    throw TypeError('The data must be an Array or a String!');
  };
  const contains$1 = testFn => (data) => {
    const len = data.length;
    if (Array.isArray(data)) {
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (isCharacterGroup(val) ? isAll$1(testFn)(val) : testFn(val)) {
          return true;
          // this allows the function to short circut
        }
      }
      return false;
    } if (typeof data === 'string') {
      for (let i = 0; i < len; i++) {
        const val = data[i];
        if (testFn(val)) {
          return true;
        }
      }
      return false;
    }
    throw TypeError('The data must be an Array or a String!');
  };

  const isJamo = data => jamo.contains(Character(data));
  const isCompatibilityJamo = data => compatibilityJamo.contains(Character(data));
  const isJamoExtendedA = data => jamoExtendedA.char(Character(data));
  const isSyllable = data => syllables.contains(Character(data));
  const isJamoExtendedB = data => jamoExtendedB.contains(Character(data));
  const isHalfwidth = data => halfwidth.contains(Character(data));
  const isReserved = data => reserved.contains(Character(data));
  const isStandardHangul = data => standardHangul.contains(Character(data));
  const isHangul = data => hangul.contains(Character(data));

  const isAllJamo = isAll$1(isJamo);
  const containsJamo = contains$1(isJamo);

  const isAllCompatibilityJamo = isAll$1(isCompatibilityJamo);
  const containsCompatibilityJamo = contains$1(isCompatibilityJamo);

  const isAllJamoExtendedA = isAll$1(isJamoExtendedA);
  const containsJamoExtendedA = contains$1(isJamoExtendedA);

  const isAllSyllable = isAll$1(isSyllable);
  const containsSyllable = contains$1(isSyllable);

  const isAllJamoExtendedB = isAll$1(isJamoExtendedB);
  const containsJamoExtendedB = contains$1(isJamoExtendedB);

  const isAllHalfwidth = isAll$1(isHalfwidth);
  const containsHalfwidth = contains$1(isHalfwidth);

  const isAllReserved = isAll$1(isReserved);
  const containsReserved = contains$1(isReserved);

  const isAllStandardHangul = isAll$1(isStandardHangul);
  const containsStandardHangul = contains$1(isStandardHangul);

  const isAllHangul = isAll$1(isHangul);
  const containsHangul = contains$1(isHangul);
  name({
    isJamo,
    isAllJamo,
    containsJamo,

    isCompatibilityJamo,
    isAllCompatibilityJamo,
    containsCompatibilityJamo,

    isJamoExtendedA,
    isAllJamoExtendedA,
    containsJamoExtendedA,

    isSyllable,
    isAllSyllable,
    containsSyllable,

    isJamoExtendedB,
    isAllJamoExtendedB,
    containsJamoExtendedB,

    isHalfwidth,
    isAllHalfwidth,
    containsHalfwidth,

    isStandardHangul,
    isAllStandardHangul,
    containsStandardHangul,

    isHangul,
    isAllHangul,
    containsHangul,
  });

  // TODO: toKeys(data, true) is outputting wrong things!
  // TODO: write jest tests
  // TODO: why is to keys still not working what the fucASKLJDlkdaSlksaJDlkasd;aKJSDHSH ♋
  // TODO: is irregular complex

  exports.assemble = assemble;
  exports.a = assemble;
  exports.disassemble = disassemble$1;
  exports.d = disassemble$1;
  exports.disassembleCharacter = disassembleChar;
  exports.composeAnything = composeAnything;
  exports.decomposeComplex = decomposeComplex;
  exports.decomposeSyllable = decomposeSyllable;
  exports.composeComplex = complex$1;
  exports.composeSyllable = syllable;
  exports.standardize = standardize;
  exports.standardizeCharacterBase = standardizeCharacterBase;
  exports.stronger = stronger$1;
  exports.flatten = flatten;
  exports.deepMap = deepMap;
  exports.toKeys = toKeys;
  exports.fromKeys = fromKeys;
  exports.transformChar = transformChar;
  exports.transformDatum = transformDatum;
  exports.transformEveryChar = transformEveryChar;
  exports.transformEveryDatum = transformEveryDatum;
  exports.isConsonant = isConsonant;
  exports.isConsonantAll = isConsonantAll;
  exports.containsConsonant = containsConsonant;
  exports.isVowel = isVowel;
  exports.isVowelAll = isVowelAll;
  exports.containsVowel = containsVowel;
  exports.isJamo = isJamo;
  exports.isCompatibilityJamo = isCompatibilityJamo;
  exports.isJamoExtendedA = isJamoExtendedA;
  exports.isSyllable = isSyllable;
  exports.isJamoExtendedB = isJamoExtendedB;
  exports.isHalfwidth = isHalfwidth;
  exports.isReserved = isReserved;
  exports.isStandardHangul = isStandardHangul;
  exports.isHangul = isHangul;
  exports.isAllJamo = isAllJamo;
  exports.containsJamo = containsJamo;
  exports.isAllCompatibilityJamo = isAllCompatibilityJamo;
  exports.containsCompatibilityJamo = containsCompatibilityJamo;
  exports.isAllJamoExtendedA = isAllJamoExtendedA;
  exports.containsJamoExtendedA = containsJamoExtendedA;
  exports.isAllSyllable = isAllSyllable;
  exports.containsSyllable = containsSyllable;
  exports.isAllJamoExtendedB = isAllJamoExtendedB;
  exports.containsJamoExtendedB = containsJamoExtendedB;
  exports.isAllHalfwidth = isAllHalfwidth;
  exports.containsHalfwidth = containsHalfwidth;
  exports.isAllReserved = isAllReserved;
  exports.containsReserved = containsReserved;
  exports.isAllStandardHangul = isAllStandardHangul;
  exports.containsStandardHangul = containsStandardHangul;
  exports.isAllHangul = isAllHangul;
  exports.containsHangul = containsHangul;

  return exports;

}({}));
