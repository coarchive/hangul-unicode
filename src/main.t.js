import * as Hangul from './main';

const typeDecorator = datum => ((typeof datum === 'object' || typeof datum === 'string')
  ? JSON.stringify(datum)
  : datum);
const tests = {
  assemble: [
    ['ㄱㅗㅇㅑㅇㅇㅣ', '고양이'],
    [['ㄱ', 'ㅗ', 'ㅇ', 'ㅑ', 'ㅇ', 'ㅇ', 'ㅣ'], '고양이'],
  ],
  a: [
    
  ],
};
Object.keys(tests).forEach((functionName) => {
  const pairs = tests[functionName];
  describe(`Hangul.${functionName}`, () => {
    pairs.forEach((pair) => {
      test(`${typeDecorator(pair[0])} => ${typeDecorator(pair[1])}`, () => {
        expect(Hangul[functionName](pair[0])).toBe(pair[1]);
      });
    });
  });
});
