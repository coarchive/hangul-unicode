### Character Collections
In these docs, you may see a type called `Character`.
A Character is any value that when coerced to a string, has length of one.

Example Valid Characters:
- `1`
- `"1"`
- `"a"`
- `{ toString() { return "a" } }`
- `"ㅂ"`

Example Invalid Characters:
- `true`
- `27`
- `ㅂㅈㄷㄱ`
- `{}`
- `"foobar"`
- `"[object Object]"`

Even without the hardFail flag enabled,
functions that expect Characters will error if the argument is not a Character.

Valid Character Groups are Arrays, Strings, or Numbers that are longer than 1.

Example Valid Character Groups:
- `12`
- `"12"`
- `ㅂㅈㄷㄱ`
- `"foobar"`
- `"[object Object]"`

Example Invalid Character Groups:
- `1`
- `"1"`
- `"a"`
- `{ toString() { return "a" } }`
- `"ㅂ"`

Another type that functions from this library take is what's called a `CharacterCollection`. Character Collections are Character Groups or Characters. All Strings are valid Character Collections.

Example Valid Character Collections
- `""`
- `1`
- `"1"`
- `"a"`
- `{ toString() { return "a" } }`
- `"ㅂ"`
- `12`
- `"12"`
- `ㅂㅈㄷㄱ`
- `"foobar"`
- `"[object Object]"`
