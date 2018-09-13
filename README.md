# WAIT! DON'T DOWNLOAD IT! IT'S BUGGY AND NOT DONE!
Can you wait for like, two weeks?

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

### A word on modes
This library uses bitfields for modes since they're a compact way of telling a
function what settings you'd like.
```JS
// mode.mjs
export const hardFail = 0b1; // true can also be used
// throws an error when there's something unexpected
export const useArchaic = 0b10;
// allows operation on archaic complex characters such as "ㅨ"
export const useComp3 = 0b100;
// allows operation on complex characters composed of three base characters.
// this means you can make things like "ㅩ", "ㅫ", "ㅴ", and "ㅵ".
// since these characters are all archaic, there's no point in setting this bit without also setting useArchaic.
export const noJungJong = 0b1000;
// disallows operation on complex jung and complex jong
// useful for only composing complex cho
export const noDouble = 0b10000;
// disallows operation on two of the same character
// this means that things like "ㄲ" will not be made
export const useAll = useArchaic | useComp3;
// both useArchaic and useComp3
```
Here's a quick reminder of how to use binary numbers with JS
```JS
console.log(0b1 | 0b10) //> 3
// 3 === 0b11
console.log(true | 0b10) //> 3
// bitwise operators treat true as 0b1
const hardFailAndUseArchaic = Hangul.hardFail | Hangul.useArchaic; //> 3
// Remember! For BITWISE or, you use "|". "||" is for logical or
```
### Characters
In these docs, you may see a type called `Character`.
A Character is any value that when coerced to a string, has length of one.
For instance, `1` can be a Character but `true` cannot.
The code views `1` and `"1"` as basically the same when it expects a Character.
This also means that you can create Objects that are also Characters.
`{toString() { return 1 }}` is a valid Character too.
Even without the hardFail flag enabled,
functions that expect Characters will error if the argument is not a Character.

### Different Unicode Blocks
This library supports many Hangul Unicode blocks:
* `Hangul Jamo`
* `Hangul Compatibility Jamo`
* `Hangul Jamo Extended-A`
* `Hangul Syllables`
* `Hangul Jamo Extended-B`
* `Halfwidth and Fullwidth forms`

All functions that are exposed will convert all valid Hangul characters into the `Hangul Compatibility Jamo` and `Hangul Syllables` blocks if possible. See `Hangul.standardize`.

### Documentation
#### `Hangul.assemble(data: string | Array, mode?: any) : string`
`Hangul.a` can also be used too.
```JS
Hangul.assemble('ㄱㅗㅇㅑㅇㅇㅣ'); //> "고양이"
Hangul.assemble(['ㄱ', 'ㅗ', 'ㅇ', 'ㅑ', 'ㅇ', 'ㅇ', 'ㅣ']); //> "고양이"
Hangul.a('ㄱㅗㅇㅑㅇㅇㅣ') //> "고양이"
Hangul.a === Hangul.assemble //> true
```
#### `Hangul.composeComplex(char1: Character, char2: Character, char3?: any, mode?: any) : string`
```JS
Hangul.composeComplex('ㄷ', 'ㄷ'); //> "ㄸ"
Hangul.composeComplex('ㅅㅅ', 'ㅅ'); //> Error: "ㅅㅅ" is not a Character!
Hangul.composeComplex('', 'ㅅ') //> Error: "" is not a Character!
Hangul.composeComplex('ㄹ', 'ㄱ', ''); //> "ㄺ"
// char3 does not have to be a Character
Hangul.composeComplex('ㄹ', 'ㄱ', true); //> Error: "true" is not a Character!
// if char3 is truthy, composeComplex will try to include it.
Hangul.composeComplex('ㄹ', 'ㄱ', 1); //> "ㄺ1"
```
Composition with different modes
```JS
Hangul.composeComplex('ㄷ', 'ㄷ', 'ㅁ', Hangul.hardFail); //> Error: Found "ㄸ" but cannot combine "ㄷ" and "ㄷ" with "ㅁ"
Hangul.composeComplex('ㄷ', 'ㄷ', 'ㅁ', true); // Same output as above since true is treated as 0b1
Hangul.composeComplex('ㅁ', 'ㅿ', '', Hangul.useArchaic); //> "ㅰ"
Hangul.composeComplex('ㅂ', 'ㅅ', 'ㄷ', Hangul.useArchaic | Hangul.useComp3); //> "ㅵ"
Hangul.composeComplex('ㅗ', 'ㅏ', '', Hangul.noJungJong); //> "ㅗㅏ"
Hangul.composeComplex('ㄱ', 'ㄱ', '', Hangul.noDouble); //> "ㄱㄱ"
```
#### `Hangul.composeSyllable(char1: Character, char2: Character, char3?: any, hardFail?: boolean) : string`
This function does not compose complex characters. Therefore, it doesn't need a mode argument.
It still has a hardFail argument.
```JS
Hangul.composeSyllable('ㅈ', 'ㅣ', 'ㅂ'); //> "집"
Hangul.composeSyllable('ㅁ', 'ㅗ', 'ㅣ'); //> "모ㅣ"
Hangul.composeSyllable('ㅁ', 'ㅗ', 'ㅣ', true); //> Error: "ㅣ" is not a valid jong character
Hangul.composeSyllable('ㅁ', 'a'); //> "ㅁa"
Hangul.composeSyllable('ㅁ', 'a', '', true); //> Error: "a" is not a valid jung Character
Hangul.composeSyllable('ㅁㅏ', 'ㄷ'); //> Error: "ㅁㅏ" is not a Character!
Hangul.composeSyllable('ㅃ', 'ㅏ'); //> "빠"
```
#### `Hangul.decomposeComplex(char: Character, double?: boolean) : string`
By default, `Hangul.composeComplex` leaves doubles intact.
```JS
Hangul.decomposeComplex('ㄸ'); //> "ㄸ"
Hangul.decomposeComplex('ㄸ', true) //> "ㄷㄷ"
```
#### `Hangul.decomposeSyllable(char: Character, hardFail?: boolean) : string`
`Hangul.decomposeSyllable` does not decompose complex characters.
```JS
Hangul.decomposeSyllable('빠'); //> "ㅃㅏ"
Hangul.decomposeSyllable('양'); //> "ㅇㅑㅇ"
Hangul.decomposeSyllable('ㅂ') //> "ㅂ"
Hangul.decomposeSyllable('ㅂ', true) //> Error: "ㅂ" is not a syllable!
```
#### `Hangul.disassemble(data: string | Array, grouped?: boolean, mode?: any) : string | Array`
`Hangul.d` is the same function
```JS
Hangul.disassemble('고양이'); //> "ㄱㅗㅇㅑㅇㅇㅣ"
Hangul.disassemble('빠른', true); //> [ [ "ㅃ", "ㅏ" ], [ "ㄹ", "ㅡ", "ㄴ" ] ]
Hangul.disassemble('없다', true); //> [[ "ㅇ", "ㅓ", ["ㅂ", "ㅅ"] ], [ "ㄷ", "ㅏ" ] ]
```

#### Types of Hangul characters
#### `Hangul.is`
#### `Hangul.contains`
#### `Hangul.isAll`
