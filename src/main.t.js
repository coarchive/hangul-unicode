import * as Hangul from './main';

const a = Symbol('oneArgument');
const typeDecorator = datum => ((typeof datum === 'object' || typeof datum === 'string')
  ? JSON.stringify(datum)
  : datum);
const tests = {
  assemble: [
    ['ㄱㅗㅇㅑㅇㅇㅣ', '고양이'],
    [a, ['ㄱ', 'ㅗ', 'ㅇ', 'ㅑ', 'ㅇ', 'ㅇ', 'ㅣ'], '고양이'],
    [a, ['ㅇㅣㄱㅓㅅㄷㅗ ㅈㅏㄱㄷㅗㅇㅎㅏㅂㄴㅣㄷㅏ'], '이것도 작동합니다'],
    ['Hello ㅇㅏㄴㄴㅕㅇ World ㅅㅔㅅㅏㅇ', 'Hello 안녕 World 세상'],
  ],
  composeComplex: [
    [['ㄷ', 'ㄷ'], 'ㄸ'],
    [['ㅅㅅ', 'ㅅ'], 'ㅅㅅㅅ'],
    [['', 'ㅅ'], 'ㅅ'],
    [['ㄹ', 'ㄱ', ''], 'ㄺ'],
    [['ㄹ', 'ㄱ', true], 'ㄺtrue'],
    [['ㄹ', 'ㄱ', 1], 'ㄺ1'],
    // composition with different options
    [
      ['ㅅㅅ', 'ㅅ', '', { hardFail: true }],
      Error('is not a Character!'),
    ],
    [
      ['', 'ㅅ', '', { hardFail: true }],
      Error('is not a Character!'),
    ],
    [
      ['ㄷ', 'ㄷ', 'ㅁ', { hardFail: true }],
      Error('but cannot combine'),
    ],
  ],
};

Object.keys(tests).forEach((functionName) => {
  const pairs = tests[functionName];
  describe(`Hangul.${functionName}`, () => {
    const fn = Hangul[functionName];
    if (!fn) {
      throw Hangul;
    }
    pairs.forEach((en) => {
      let args;
      let res;
      if (en[0] === a) {
        args = [en[1]];
        [, , res] = en;
      } else if (Array.isArray(en[0])) {
        [args, res] = en;
      } else {
        args = [en[0]];
        [, res] = en;
      }
      const stargs = args.map(typeDecorator).join(', ');
      if (res instanceof Error) {
        const { message } = res;
        test(`${stargs} throws "${message}"`, () => {
          expect(() => fn(...args)).toThrow(message);
        });
      } else if (Array.isArray(en)) {
        test(`${(stargs)} => ${typeDecorator(res)}`, () => {
          expect(fn(...args)).toBe(res);
        });
      }
    });
  });
});
