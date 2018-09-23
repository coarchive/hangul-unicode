# hangul-unicode
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
#### `Hangul.assemble(data: string) : string`
Alias: `Hangul.a`
```JS
Hangul.assemble('ㄱㅗㅇㅑㅇㅇㅣ'); //> '고양이'
Hangul.assemble(['ㄱ', 'ㅗ', 'ㅇ', 'ㅑ', 'ㅇ', 'ㅇ', 'ㅣ']); //> '고양이'
Hangul.assemble(['ㅇㅣㄱㅓㅅㄷㅗ ㅈㅏㄱㄷㅗㅇㅎㅏㅂㄴㅣㄷㅏ']) //> '이것도 작동합니다'
Hangul.assemble('Hello ㅇㅏㄴㄴㅕㅇ World ㅅㅔㅅㅏㅇ') //> 'Hello 안녕 World 세상'
Hangul.a === Hangul.assemble //> true
```
#### `Hangul.composeComplex(char1: Character, char2: Character, char3?: any, mode?: any) : string`
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
Hangul.composeComplex('ㄷ', 'ㄷ', 'ㅁ', { hardFail: true }); //> Error: Found 'ㄸ' but cannot combine 'ㄷ' and 'ㄷ' with 'ㅁ'
Hangul.composeComplex('ㅁ', 'ㅿ', '', { hardFail: true }); //> 'ㅰ'
Hangul.composeComplex('ㅂ', 'ㅅ', 'ㄷ', {
  complex3: true,
  complexArchaic: true,
}); //> 'ㅵ'
Hangul.composeComplex('ㅗ', 'ㅏ', '', { complexJung: false }); //> 'ㅗㅏ'
Hangul.composeComplex('ㄱ', 'ㄱ', '', { composeComplexDouble: false}); //> 'ㄱㄱ'
```
#### `Hangul.composeSyllable(char1: Character, char2: Character, char3?: any, hardFail?: boolean) : string`
This function does not compose complex characters. Therefore, it doesn't need a mode argument.
It still has a hardFail argument.
```JS
Hangul.composeSyllable('ㅈ', 'ㅣ', 'ㅂ'); //> '집'
Hangul.composeSyllable('ㅁ', 'ㅗ', 'ㅣ'); //> '모ㅣ'
Hangul.composeSyllable('ㅁ', 'ㅗ', 'ㅣ', { hardFail: true }); //> Error: 'ㅣ' is not a valid jong character
Hangul.composeSyllable('ㅁ', 'a'); //> 'ㅁa'
Hangul.composeSyllable('ㅁ', 'a', '', { hardFail: true }); //> Error: 'a' is not a valid jung Character
Hangul.composeSyllable('ㅁㅏ', 'ㄷ'); //> Error: 'ㅁㅏ' is not a Character!
Hangul.composeSyllable('ㅃ', 'ㅏ'); //> '빠'
```
#### `Hangul.decomposeComplex(char: Character, double?: boolean) : string`
By default, `Hangul.composeComplex` leaves doubles intact.
```JS
Hangul.decomposeComplex('ㄸ'); //> 'ㄸ'
Hangul.decomposeComplex('ㄸ', { grouped: true }) //> 'ㄷㄷ'
```
#### `Hangul.decomposeSyllable(char: Character, hardFail?: boolean) : string`
`Hangul.decomposeSyllable` does not decompose complex characters.
```JS
Hangul.decomposeSyllable('빠'); //> 'ㅃㅏ'
Hangul.decomposeSyllable('양'); //> 'ㅇㅑㅇ'
Hangul.decomposeSyllable('ㅂ') //> 'ㅂ'
Hangul.decomposeSyllable('ㅂ', true) //> Error: 'ㅂ' is not a syllable!
```
#### `Hangul.disassemble(data: string | Array, grouped?: boolean, mode?: any) : string | Array`
`Hangul.d` is the same function
```JS
Hangul.disassemble('고양이'); //> 'ㄱㅗㅇㅑㅇㅇㅣ'
Hangul.disassemble('빠른', true); //> [ [ 'ㅃ', 'ㅏ' ], [ 'ㄹ', 'ㅡ', 'ㄴ' ] ]
Hangul.disassemble('없다', true); //> [[ 'ㅇ', 'ㅓ', ['ㅂ', 'ㅅ'] ], [ 'ㄷ', 'ㅏ' ] ]
```

#### Types of Hangul characters
#### `Hangul.is`
#### `Hangul.contains`
#### `Hangul.isAll`
