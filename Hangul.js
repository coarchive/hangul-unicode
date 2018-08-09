var Hangul = (function (exports) {
  'use strict';

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

    contains(char) {
      const num = char.codePointAt(0);
      return (
        (this.codePoints && this.codePoints[char])
        || this.ranges.some(range => range.containsCodePoint(num))
      );
    }
  }

  const compatibilityJamo = new UnicodeRange(0x3130, 0x318F);
  const syllables = new UnicodeRange(0xAC00, 0xD7AF);
  const standardHangul = new CombinedRange([compatibilityJamo, syllables]);

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
  // well, I guess the code lies since this export is not all
  // there's still the stuff below.
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
  const all$1 = Object.assign({}, jamo$1, jamoExtendedA$1, jamoExtendedB$1, halfwidth$1);

  // tries to transform everything into disassembled standard hangul

  var transformCharacter = (char => (!standardHangul.contains(char) && all$1[char]) || char);
  const transformEverything = char => (
    (standardHangul.contains(char) ? pairs : all$1)[char]
    || char
  );
  // transform everything just means that it also transforms
  // standard hangul characters instead of ignoring them

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

  var composeSyllableFn = ((cho, jung, jong = 0) => (
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
  const deepMap = (data, func) => {
    const ary = toArray(data);
    if (Array.isArray(data)) {
      return ary.map(val => (isCharacterGroup(val) ? deepMap(val, func) : func(val)));
    }
    // since the data was a string, the array created from
    // the string won't contain any character groups
    return ary.map(char => func(char));
    // I could write it "ary.map(func)" but I'm not
    // just in case func has more than one argument
  };
  const deepFlatMap = (data, func) => {
    let res = '';
    const ary = toArray(data);
    if (Array.isArray(data)) {
      ary.forEach(val => res += isCharacterGroup(val) ? deepFlatMap(val, func) : func(val));
    } else {
      ary.forEach(char => func(char));
    }
    return res;
  };
  const deepFlatResMap = (data, func) => {
    // this is different since it deals with functions that return Result objects.
    let res = '';
    let rem;
    if (Array.isArray(data)) {
      rem = data.map((val) => {
        if (isCharacterGroup(val)) {
          return deepFlatResMap(val, func);
        }
        return val;
      });
    } else {
      rem = data.split('');
    }
    while (rem.length) {
      const comp = func(rem);
      // func needs to return a Result like interface for this to work
      // otherwise we'll get a really nasty to debug error
      res += comp.result;
      rem = comp.remainder;
    }
    return res;
  };

  const composeComplex = (...objList) => {
    const obj = Object.assign({}, ...objList);
    // obj is stored in this scope to revent redundant operations
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
  const composeAnyComplexBase = composeComplex(
    cho,
    jung,
    jong,
    irregular,
  );
  const composeComplexChoBase = composeComplex(cho);
  // both of these base functions return Results so that's why
  // they need deepFlatResMaps instead of deepFlatMaps
  const composeAnyComplex = ary => deepFlatResMap(ary, composeAnyComplexBase);

  function standardizeCharacter(val) {
    const v = transformCharacter(Character(val));
    if (Array.isArray(v)) {
      return composeAnyComplex(v);
    }
    // if it's not an array, that means that transforming the
    // character was just a string so we can just return it
    return v;
  }
  var standardize = (group => deepFlatMap(group, standardizeCharacter));

  var decomposeSyllable = ((val, hardFail) => {
    const char = Character(val);
    if (!syllables.contains(char)) {
      if (hardFail) {
        throw Error('Decomposing a syllable requires a syllable to decompose!');
      }
      return [val];
      // if there's no hardFail, the function must
      // still return the same type as it would have
      // if it didn't fail
    }
    const code = char.codePointAt(0) - syllables.start;
    const jongNum$$1 = code % 28;
    const q = (code - jongNum$$1) / 28;
    const jungNum$$1 = q % 21;
    const choNum$$1 = 0 | q / 21; // basically Math.floor(q / 21)
    return [cho$1[choNum$$1], jung$1[jungNum$$1], jong$1[jongNum$$1]].filter(v => v);
    // the .filter(v => v) removes blank space in the array
  });

  function disassembleCharacter(char) {
    let res;
    if (syllables.contains(char)) {
      res = decomposeSyllable(char).map(transformEverything);
      // that .map(transformEverything) catches the complex
      // characters that decomposeSyllable returns
    } else {
      res = transformEverything(char);
    }
    if (Array.isArray(res)) {
      // res SHOULD only be an array of characters
      // so there's no need to worry about .join('')
      // leaving residue commas behind or something
      res = res.join('');
    }
    return res;
  }
  var disassemble = ((data, grouped) => (grouped ? deepMap : deepFlatMap)(data, disassembleCharacter));
  // this is a shady function, it calls either deepMap or
  // deepFlatMap with the data and disassembleCharacter

  // This file is only used in ../publicCompose
  // all is the only one of these that's actually used
  const all$2 = {
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

  // since these functions are exposed, the characters must be
  // standardized so that the libaray can function properly

  const complex = (first, second, third = '', hardFail) => {
    if (first === undefined || second === undefined) {
      throw Error('Cannot compose a complex with less than two values!');
    }
    const d1 = all$2[standardizeCharacter(first)];
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
      return `${composeSyllableFn(cho, jung)}${jongChar}`;
    }
    return composeSyllableFn(cho, jung, jong);
  };
  // by nesting all if-statements under if (hardFail)
  // there might be a little better performance but I'm
  // sure that it's pretty trivial.

  exports.standardize = standardize;
  exports.deepFlatMap = deepFlatMap;
  exports.decomposeSyllable = decomposeSyllable;
  exports.disasseble = disassemble;
  exports.composeComplex = complex;
  exports.composeSyllable = syllable;
  exports.standardizeCharacter = standardizeCharacter;

  return exports;

}({}));
//# sourceMappingURL=Hangul.js.map
