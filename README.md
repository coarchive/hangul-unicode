Unicode# hangul-unicode
Full disclosure: I cannot speak Korean and I can't write hangul.
If I've accidentally written something offensive, sorry.
I tried to use Google Translate for the docs to prevent that.
This library takes a lot of inspiration from hangul-js by Jaemin Jo.
If you've got any suggestions or there's a bug in the code that I wrote,
please submit an issue on the issue tracker! Better yet,
submit a pull request! :)

## Usage
You can download the minified library from the [dist](dist) directory.
Choose whatever flavor of module you like.

You can also compile it from the source if you want.
```sh
$ git clone git@github.com:Coalpha/hangul-unicode.git
$ cd hangul-unicode
$ npm install
$ npm run build
```

### Different Unicode Blocks
This library supports many Hangul Unicode blocks:
* `Hangul Jamo`
* `Hangul Compatibility Jamo`
* `Hangul Jamo Extended-A`
* `Hangul Syllables`
* `Hangul Jamo Extended-B`
* `Halfwidth and Fullwidth forms`

All functions that are exposed will convert all valid Hangul characters into
the `Hangul Compatibility Jamo` and `Hangul Syllables` blocks if possible.
See `Hangul.standardize`.

### Documentation
#### `Hangul.assemble(data: string, options?: object) : string`
Alias: `Hangul.a`
```JS
Hangul.assemble('ㄱㅗㅇㅑㅇㅇㅣ'); //> '고양이'
Hangul.assemble(['ㄱ', 'ㅗ', 'ㅇ', 'ㅑ', 'ㅇ', 'ㅇ', 'ㅣ']); //> '고양이'
Hangul.assemble(['ㅇㅣㄱㅓㅅㄷㅗ ㅈㅏㄱㄷㅗㅇㅎㅏㅂㄴㅣㄷㅏ']) //> '이것도 작동합니다'
Hangul.assemble('Hello ㅇㅏㄴㄴㅕㅇ World ㅅㅔㅅㅏㅇ') //> 'Hello 안녕 World 세상'
Hangul.a === Hangul.assemble //> true
```
#### `Hangul.composeComplex(char1: Character, char2: Character, char3?: any, options?: object) : string`
```JS
Hangul.composeComplex('ㄷ', 'ㄷ'); //> 'ㄸ'
Hangul.composeComplex('ㅅㅅ', 'ㅅ'); //> 'ㅅㅅㅅ'
Hangul.composeComplex('', 'ㅅ') //> 'ㅅ'
Hangul.composeComplex('ㄹ', 'ㄱ', ''); //> 'ㄺ'
// char3 does not have to be a Character
Hangul.composeComplex('ㄹ', 'ㄱ', true); //> 'ㄺtrue'
Hangul.composeComplex('ㄹ', 'ㄱ', 1); //> 'ㄺ1'
```
Composition with different options
```JS
Hangul.composeComplex('ㅅㅅ', 'ㅅ'); //> Error:
Hangul.composeComplex('ㄷ', 'ㄷ', 'ㅁ', { hardFail: true });
//> Error: Found 'ㄸ' but cannot combine 'ㄷ' and 'ㄷ' with 'ㅁ'
Hangul.composeComplex('ㅁ', 'ㅿ', '', { hardFail: true }); //> 'ㅰ'
Hangul.composeComplex('ㅂ', 'ㅅ', 'ㄷ', {
  complex3: true,
  complexArchaic: true,
}); //> 'ㅵ'
Hangul.composeComplex('ㅗ', 'ㅏ', '', { complexJung: false }); //> 'ㅗㅏ'
Hangul.composeComplex('ㄱ', 'ㄱ', '', { composeComplexDouble: false}); //> 'ㄱㄱ'
```
#### `Hangul.composeSyllable(char1: Character, char2: Character, char3?: any, options?: object) : string`
```JS
Hangul.composeSyllable('ㅈ', 'ㅣ', 'ㅂ'); //> '집'
Hangul.composeSyllable('ㅁ', 'ㅗ', 'ㅣ'); //> '모ㅣ'
Hangul.composeSyllable('ㅁ', 'ㅗ', 'ㅣ', { hardFail: true }); //> Error: 'ㅣ' is not a valid jong character
Hangul.composeSyllable('ㅁ', 'a'); //> 'ㅁa'
Hangul.composeSyllable('ㅁ', 'a', '', { hardFail: true }); //> Error: 'a' is not a valid jung Character
Hangul.composeSyllable('ㅁㅏ', 'ㄷ'); //> Error: 'ㅁㅏ' is not a Character!
Hangul.composeSyllable('ㅃ', 'ㅏ'); //> '빠'
```
#### `Hangul.decomposeComplex(char: Character, options?: object) : CharacterCollection`
By default, `Hangul.composeComplex` leaves doubles intact.
```JS
Hangul.decomposeComplex('ㄸ'); //> 'ㄸ'
Hangul.decomposeComplex('ㄸ', { grouped: true }); //> 'ㄸ'
Hangul.decomposeComplex('ㄸ', { decomposeDouble: true }) //> 'ㄷㄷ'
Hangul.decomposeComplex('ㄸ', { grouped: true, decomposeDouble: true}); //> ['ㄷ', 'ㄷ']
```
#### `Hangul.decomposeSyllable(char: Character, options?: object) : string`
`Hangul.decomposeSyllable` does not decompose complex characters.
```JS
Hangul.decomposeSyllable('빠'); //> 'ㅃㅏ'
Hangul.decomposeSyllable('양'); //> 'ㅇㅑㅇ'
Hangul.decomposeSyllable('ㅂ') //> 'ㅂ'
Hangul.decomposeSyllable('ㅂ', { hardFail: true }) //> Error: 'ㅂ' is not a syllable!
```
#### `Hangul.disassemble(data: CharacterCollection, options?: object) : CharacterCollection`
Alias: `Hangul.d`
```JS
Hangul.disassemble('고양이'); //> 'ㄱㅗㅇㅑㅇㅇㅣ'
Hangul.disassemble('빠른', { grouped: true }); //> [['ㅃ', 'ㅏ'], ['ㄹ', 'ㅡ', 'ㄴ']]
Hangul.disassemble('없다', { grouped: true }); //> [['ㅇ', 'ㅓ', ['ㅂ', 'ㅅ']], ['ㄷ', 'ㅏ']]
Hangul.disassemble(''); //> ''
Hangul.disassemble('', { grouped: true }); //> ['']
Hangul.d === Hangul.disassemble;
```
#### `Hangul.disassembleCharacter(char: Character, options?:object) : CharacterCollection`
```JS
Hangul.disassembleCharacter('없'); //> 'ㅇㅓㅂㅅ'
Hangul.disassembleCharacter('없', { grouped: true }); //> ['ㅇ', 'ㅓ', ['ㅂ', 'ㅅ']]
```
## Keystrokes
#### `Hangul.keysToHangul()`
#### `Hangul.stronger(char: Character) : Character`
This function is essentially the same as the one found in `hangul-js`
```JS
Hangul.stronger('ㄱ'); //> 'ㄲ'
Hangul.stronger('ㅋ'); //> 'ㄲ'
Hangul.stronger('ㅅ'); //> 'ㅆ'
```
It basically converts every character into it's stronger counterpart.
```JS
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
```
#### Types of Hangul characters
#### `Hangul.is.*(datum: Character) : boolean`
#### `Hangul.contains.*(CharacterCollection) : boolean`
#### `Hangul.isAll.*(CharacterCollection) : boolean`
In these objects are functions that can test for different types of Hangul.
- `compatibilityJamo` tests for Unicode Characters within the
[Hangul Compatibility Jamo](https://en.wikipedia.org/wiki/Hangul_Compatibility_Jamo)
Unicode block.
- `halfwidth` tests for Unicode Characters within the
[Halfwidth and fullwidth forms](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms)
Unicode block.
- `hangul` tests for any Hangul Character regardless of what Unicode block it is in.
- `jamo` tests for Hangul Characters within the older
[Hangul Jamo](https://en.wikipedia.org/wiki/Hangul_Jamo_(Unicode_block)
Unicode block.
- `jamoExtendedA` tests for Hangul Characters within the
[Hangul Jamo Extended-A](https://en.wikipedia.org/wiki/Hangul_Jamo_Extended-A)
Unicode block.
- `jamoExtendedB` tests for Hangul Characters within the
[Hangul Jamo Extended-B](https://en.wikipedia.org/wiki/Hangul_Jamo_Extended-B)
Unicode block.
- `syllable` tests for Characters within the
[Hangul Syllables](https://en.wikipedia.org/wiki/Hangul_Syllables)
Unicode block.
- `standardHangul` tests for Characters within the
[Hangul Compatibility Jamo](https://en.wikipedia.org/wiki/Hangul_Compatibility_Jamo)
Unicode block
or the
[Hangul Syllables](https://en.wikipedia.org/wiki/Hangul_Syllables)
Unicode block.
- `reserved` tests for the reserved Characters within
any Unicode block that contains Hangul.
- `consonant` tests for Hangul consonants.
A list of them is within [src/unicode/characters.mjs](src/unicode/characters.mjs).
- `vowel` tests for Hangul consonants.
A list of them is within [src/unicode/characters.mjs](src/unicode/characters.mjs).
