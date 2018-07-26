var Hangul = (function (exports) {
  'use strict';

  const E = (group, str, val) => {
    console.group(group);
    console.error(str);
    console.log(val);
    console.groupEnd();
    throw Error(`Critical Stop @ ${group}`);
  };
  // E: String => String => * => Undefined
  const Character = (inp) => {
    const str = `${inp}`;
    if (str.length !== 1) {
      E('Character', "Strings longer than one aren't Characters", str, inp);
    } if (str !== inp) {
      console.group('Not Paranoia');
      console.trace();
      console.warn("It's not paranoia, calls to internalTypes are changing thigns!");
      console.table({ original: { value: inp }, modified: { value: str } });
    }
    return str;
  };
  // Character: { Character } from './types'
  const CharacterGroup = (ary) => {
    if (typeof ary === 'string') {
      let mod;
      if (ary.length > 1) {
        mod = [Character(ary)];
      }
      mod = Array.from(ary);
      console.group('Not Paranoia');
      console.trace();
      console.warn("It's not paranoia, calls to internalTypes are changing thigns!");
      console.table({ original: { value: ary }, modified: { value: mod } });
      return mod;
    } if (Array.isArray(ary)) {
      return ary;
    }
    E('CharacterGroup', 'A character group must be a String or Array', ary);
  };
  // CharacterGroup: { CharacterGroup } from './types'

  class UnicodeRange {
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
  // UnicodeRange { start: Integer, end: integer }
  class CombinedRange {
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
  // CombinedRange { ranges: Array[Range], codePoints: Object }

  const jamo = new UnicodeRange(0x1100, 0x11FF);
  const compatibilityJamo = new UnicodeRange(0x3130, 0x318F);
  const jamoExtendedA = new UnicodeRange(0xA960, 0xA97F);
  const syllables = new UnicodeRange(0xAC00, 0xD7AF);
  const jamoExtendedB = new UnicodeRange(0xD7B0, 0xD7FF);
  const halfwidth = new UnicodeRange(0xFFA0, 0xFFDF);
  /*
  {
    jamo,
    compatibilityJamo,
    jamoExtendedA,
    syllables,
    jamoExtendedB,
    halfwidth,
    reserved
  } instanceof Range
  */
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
  // { reserved, standardHangul, hangul } instanceof CombinedRange

  // if you're gonna copy this part, at least give me credit.
  // I had to do all of this manually.
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
    ᄫ: 'ㅸ',
    ᄬ: 'ㅹ',
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
    ᇗ: ['ㄹ', ''],
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
    ᇦ: 'ㅸ',
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
    ퟋ: ['ㄴ', ''],
    ퟌ: ['ㄴ', ''],
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
  // * instanceof StandardMapping

  // tries to transform everything into disassembled standard hangul

  function transformCharacter(val) {
    const char = Character(val);
    if (!standardHangul.contains(char)) {
      // this if-statement isn't REALLY needed
      return all[char] || char;
    }
    return char;
  }
  // transformCharacter: Character => CharacterGroup
  function transform(group) {
    return CharacterGroup(group).map(transformCharacter);
  }
  // transform: CharacterGroup => CharacterGroup

  // I know I can export everything at once,

  exports.transform = transform;

  return exports;

}({}));
//# sourceMappingURL=Hangul.js.map
