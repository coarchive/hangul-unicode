var Hangul=function(n){"use strict";class t{constructor(n,t){if("number"!=typeof(n+t))throw new TypeError("Both arguments to the Range constructor must be numbers!");this.start=n,this.end=t,this.length=this.end-this.start+1}contains(n){return n>=this.start&&n<=this.end}forEach(n){for(let t=this.start;t<=this.end;t++)n(t)}map(n){return Array(this.length).fill``.map((t,r)=>n(r+this.start))}}var r=n=>{if("string"!=typeof n)throw new TypeError("char must be a string!");if(n.length-1)throw new Error(`"${n}" must have a length of one!`)},e=n=>e=>(r(e),n instanceof t?n.contains(e.codePointAt(0)):Array.isArray(n)?n.includes(e):"object"==typeof n&&!!n[e]);const l=new t(4352,4607),s=new t(12592,12687),o=new t(43360,43391),i=new t(44032,55215),u=new t(55216,55295),a=new t(65440,65503),c=(new t(43389,43391),new t(55204,55215),new t(55239,55242),new t(55292,55295),e(l)),f=e(s),h=e(o),g=e(i),m=e(u),p=e(a),y=e({"ㄱ":1,"ㄴ":1,"ㄷ":1,"ㄹ":1,"ㅁ":1,"ㅂ":1,"ㅅ":1,"ㅇ":1,"ㅈ":1,"ㅊ":1,"ㅋ":1,"ㅌ":1,"ㅍ":1,"ㅎ":1}),d=e({"ㅏ":1,"ㅐ":1,"ㅑ":1,"ㅓ":1,"ㅔ":1,"ㅕ":1,"ㅖ":1,"ㅗ":1,"ㅛ":1,"ㅜ":1,"ㅠ":1,"ㅡ":1,"ㅣ":1});var w=n=>{if("string"==typeof n)return n.split``;if(!Array.isArray(n))throw new TypeError("aryLike must be a string or an array!");return n},b=n=>t=>r=>w(r)[n](n=>t(n)),v=b("some"),A=b("every");const $=n=>f(n)||g(n),H=n=>$(n)||c(n)||h(n)||m(n)||p(n),S=A(H),E=A($),x=v($),C=v(H),I={"ㄱ":{"ㄱ":"ㄲ","ㅅ":"ㄳ"},"ㄴ":{"ㅈ":"ㄵ","ㅎ":"ㄶ"},"ㄷ":{"ㄷ":"ㄸ"},"ㄹ":{"ㄱ":"ㄺ","ㅁ":"ㄻ","ㅂ":"ㄼ","ㅅ":"ㄽ","ㅌ":"ㄾ","ㅍ":"ㄿ","ㅎ":"ㅀ"},"ㅂ":{"ㅂ":"ㅃ","ㅅ":"ㅄ"},"ㅅ":{"ㅅ":"ㅆ"},"ㅈ":{"ㅈ":"ㅉ"},"ㅗ":{"ㅏ":"ㅘ","ㅐ":"ㅙ","ㅣ":"ㅚ"},"ㅜ":{"ㅓ":"ㅝ","ㅔ":"ㅞ","ㅣ":"ㅟ"},"ㅡ":{"ㅣ":"ㅢ"}},N={"ㄴ":{"ㄴ":"ㅥ","ㄷ":"ㅦ","ㅅ":"ㅧ","ㅿ":"ㅨ"},"ㄹ":{"ㄱ":{"ㅅ":"ㅩ"},"ㄷ":"ㅪ","ㅂ":{"ㅅ":"ㅫ"},"ㅿ":"ㅬ","ㆆ":"ㅭ"},"ㅁ":{"ㅂ":"ㅮ","ㅅ":"ㅯ","ㅿ":"ㅰ"},"ㅂ":{"ㄱ":"ㅲ","ㄷ":"ㅳ","ㅅ":{"ㄱ":"ㅴ","ㄷ":"ㅵ"},"ㅈ":"ㅶ","ㅌ":"ㅷ"},"ㅅ":{"ㄱ":"ㅺ","ㄴ":"ㅻ","ㄷ":"ㅼ","ㅂ":"ㅽ","ㅈ":"ㅾ"},"ㅇ":{"ㅇ":"ㆀ"},"ㆁ":{"ㅅ":"ㆁ","ㅿ":"ㅿ"},"ㅎ":{"ㅎ":"ㆅ"},"ㅛ":{"ㅑ":"ㆇ","ㅒ":"ㆈ","ㅣ":"ㆉ"},"ㅠ":{"ㅕ":"ㆊ","ㅖ":"ㆋ","ㅣ":"ㆌ"},"ㆍ":{"ㅣ":"ㆎ"}};var P=(n,t)=>(...r)=>{r=r.slice();const e=n(t);let l=e.next();for(;r.length&&!l.done;)l=e.next(r.shift());return{value:l.value,remaining:r}};var T=P(function*(n=!1){let t=[I];for(n&&t.push(N);;){const n=yield t;if(null===n)return t[0];r(n);const e=t.map(t=>t[n]).filter(n=>n);if(1===e.length&&"string"==typeof e[0])return e[0];if(!e.length)return`${t[0].$||""}${n}`;t=e}},!0);const j=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],k={"ㄱ":0,"ㄲ":1,"ㄴ":2,"ㄷ":3,"ㄸ":4,"ㄹ":5,"ㅁ":6,"ㅂ":7,"ㅃ":8,"ㅅ":9,"ㅆ":10,"ㅇ":11,"ㅈ":12,"ㅉ":13,"ㅊ":14,"ㅋ":15,"ㅌ":16,"ㅍ":17,"ㅎ":18},q=["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"],B={"ㅏ":0,"ㅐ":1,"ㅑ":2,"ㅒ":3,"ㅓ":4,"ㅔ":5,"ㅕ":6,"ㅖ":7,"ㅗ":8,"ㅘ":9,"ㅙ":10,"ㅚ":11,"ㅛ":12,"ㅜ":13,"ㅝ":14,"ㅞ":15,"ㅟ":16,"ㅠ":17,"ㅡ":18,"ㅢ":19,"ㅣ":20},D=[null,"ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],L={null:null,undefined:null,"ㄱ":1,"ㄲ":2,"ㄳ":3,"ㄴ":4,"ㄵ":5,"ㄶ":6,"ㄷ":7,"ㄹ":8,"ㄺ":9,"ㄻ":10,"ㄼ":11,"ㄽ":12,"ㄾ":13,"ㄿ":14,"ㅀ":15,"ㅁ":16,"ㅂ":17,"ㅄ":18,"ㅅ":19,"ㅆ":20,"ㅇ":21,"ㅈ":22,"ㅊ":23,"ㅋ":24,"ㅌ":25,"ㅍ":26,"ㅎ":27},O=(n,t,r=0)=>String.fromCodePoint(588*n+28*t+r+i.start);var R=P(function*(){const n=yield,t=k[n];if(!Number.isInteger(t))return n;const r=yield n,e=B[r];if(!Number.isInteger(e))return`${n}${r}`;const l=O(t,e),s=yield l,o=L[s];return null===o?l:Number.isInteger(o)?O(t,e,o):`${l}${s}`});const V=Object.assign({},{"ᄀ":"ㄱ","ᄁ":["ㄱ","ㄱ"],"ᄂ":"ㄴ","ᄃ":"ㄷ","ᄄ":["ㄷ","ㄷ"],"ᄅ":"ㄹ","ᄆ":"ㅁ","ᄇ":"ㅂ","ᄈ":["ㅂ","ㅂ"],"ᄉ":"ㅅ","ᄊ":["ㅅ","ㅅ"],"ᄋ":"ㅇ","ᄌ":"ㅈ","ᄍ":["ㅈ","ㅈ"],"ᄎ":"ㅊ","ᄏ":"ㅋ","ᄐ":"ㅌ","ᄑ":"ㅍ","ᄒ":"ㅎ","ᄓ":["ㄴ","ㄱ"],"ᄔ":["ㄴ","ㄴ"],"ᄕ":["ㄴ","ㄷ"],"ᄖ":["ㄴ","ㅂ"],"ᄗ":["ㄷ","ㄱ"],"ᄘ":["ㄹ","ㄴ"],"ᄙ":["ㄹ","ㄹ"],"ᄚ":["ㄹ","ㅎ"],"ᄛ":["ㄹ","ㅇ"],"ᄜ":["ㅁ","ㅂ"],"ᄝ":"ㅱ","ᄞ":["ㅂ","ㄱ"],"ᄟ":["ㅂ","ㄴ"],"ᄠ":["ㅂ","ㄷ"],"ᄡ":["ㅂ","ㅅ"],"ᄢ":["ㅂ","ㅅ","ㄱ"],"ᄣ":["ㅂ","ㅅ","ㄷ"],"ᄤ":["ㅂ","ㅅ","ㅂ"],"ᄥ":["ㅂ","ㅅ","ㅅ"],"ᄦ":["ㅂ","ㅅ","ㅈ"],"ᄧ":["ㅂ","ㅈ"],"ᄨ":["ㅂ","ㅊ"],"ᄩ":["ㅂ","ㅌ"],"ᄪ":["ㅂ","ㅍ"],"ᄫ":"ㅸ","ᄬ":"ㅹ","ᄭ":["ㅅ","ㄱ"],"ᄮ":["ㅅ","ㄴ"],"ᄯ":["ㅅ","ㄷ"],"ᄰ":["ㅅ","ㄹ"],"ᄱ":["ㅅ","ㅁ"],"ᄲ":["ㅅ","ㅂ"],"ᄳ":["ㅅ","ㅂ","ㄱ"],"ᄴ":["ㅅ","ㅅ","ㅅ"],"ᄵ":["ㅅ","ㅇ"],"ᄶ":["ㅅ","ㅈ"],"ᄷ":["ㅅ","ㅊ"],"ᄸ":["ㅅ","ㅋ"],"ᄹ":["ㅅ","ㅌ"],"ᄺ":["ㅅ","ㅍ"],"ᄻ":["ㅅ","ㅎ"],"ᄼ":null,"ᄽ":null,"ᄾ":null,"ᄿ":null,"ᅀ":"ㅿ","ᅁ":["ㅇ","ㄱ"],"ᅂ":["ㅇ","ㄷ"],"ᅃ":["ㅇ","ㅁ"],"ᅄ":["ㅇ","ㅂ"],"ᅅ":["ㅇ","ㅅ"],"ᅆ":["ㅇ","ㅿ"],"ᅇ":["ㅇ","ㅇ"],"ᅈ":["ㅇ","ㅈ"],"ᅉ":["ㅇ","ㅊ"],"ᅊ":["ㅇ","ㅌ"],"ᅋ":["ㅇ","ㅍ"],"ᅌ":"ㆁ","ᅍ":["ㅈ","ㅇ"],"ᅎ":null,"ᅏ":null,"ᅐ":null,"ᅑ":null,"ᅒ":["ㅊ","ㅋ"],"ᅓ":["ㅊ","ㅎ"],"ᅔ":null,"ᅕ":null,"ᅖ":["ㅂ","ㅂ"],"ᅗ":"ㆄ","ᅘ":["ㅎ","ㅎ"],"ᅙ":"ㆆ","ᅚ":["ㄱ","ㄷ"],"ᅛ":["ㄱ","ㅅ"],"ᅜ":["ㄱ","ㅈ"],"ᅝ":["ㄱ","ㅎ"],"ᅞ":["ㄷ","ㄹ"],"ᅡ":"ㅏ","ᅢ":"ㅐ","ᅣ":"ㅑ","ᅤ":"ㅒ","ᅥ":"ㅓ","ᅦ":"ㅔ","ᅧ":"ㅕ","ᅨ":"ㅖ","ᅩ":"ㅗ","ᅪ":["ㅗ","ㅏ"],"ᅫ":["ㅗ","ㅐ"],"ᅬ":["ㅗ","ㅣ"],"ᅭ":"ㅛ","ᅮ":"ㅜ","ᅯ":["ㅜ","ㅓ"],"ᅰ":["ㅜ","ㅔ"],"ᅱ":["ㅜ","ㅣ"],"ᅲ":"ㅠ","ᅳ":"ㅡ","ᅴ":["ㅡ","ㅣ"],"ᅵ":"ㅣ","ᅶ":["ㅏ","ㅗ"],"ᅷ":["ㅏ","ㅜ"],"ᅸ":["ㅑ","ㅗ"],"ᅹ":["ㅑ","ㅛ"],"ᅺ":["ㅓ","ㅗ"],"ᅻ":["ㅓ","ㅜ"],"ᅼ":["ㅓ","ㅡ"],"ᅽ":["ㅕ","ㅗ"],"ᅾ":["ㅕ","ㅜ"],"ᅿ":["ㅗ","ㅓ"],"ᆀ":["ㅔ","ㅗ"],"ᆁ":["ㅖ","ㅗ"],"ᆂ":["ㅗ","ㅗ"],"ᆃ":["ㅗ","ㅜ"],"ᆄ":["ㅛ","ㅑ"],"ᆅ":["ㅛ","ㅒ"],"ᆆ":["ㅛ","ㅕ"],"ᆇ":["ㅛ","ㅗ"],"ᆈ":["ㅛ","ㅣ"],"ᆉ":["ㅜ","ㅏ"],"ᆊ":["ㅜ","ㅐ"],"ᆋ":["ㅜ","ㅓ","ㅡ"],"ᆌ":["ㅜ","ㅖ"],"ᆍ":["ㅜ","ㅜ"],"ᆎ":["ㅠ","ㅏ"],"ᆏ":["ㅠ","ㅓ"],"ᆐ":["ㅠ","ㅔ"],"ᆑ":["ㅠ","ㅕ"],"ᆒ":["ㅠ","ㅔ"],"ᆓ":["ㅠ","ㅜ"],"ᆔ":["ㅠ","ㅣ"],"ᆕ":["ㅡ","ㅜ"],"ᆖ":["ㅡ","ㅡ"],"ᆗ":["ㅡ","ㅣ","ㅜ"],"ᆘ":["ㅣ","ㅏ"],"ᆙ":["ㅣ","ㅑ"],"ᆚ":["ㅣ","ㅗ"],"ᆛ":["ㅣ","ㅜ"],"ᆜ":["ㅣ","ㅡ"],"ᆝ":null,"ᆞ":"ㆍ","ᆟ":["ㆍ","ㅓ"],"ᆠ":["ㆍ","ㅜ"],"ᆡ":["ㆍ","ㅣ"],"ᆢ":["ㆍ","ㆍ"],"ᆣ":["ㅏ","ㅡ"],"ᆤ":["ㅑ","ㅜ"],"ᆥ":["ㅕ","ㅑ"],"ᆦ":["ㅗ","ㅑ"],"ᆧ":["ㅗ","ㅒ"],"ᆨ":"ㄱ","ᆩ":["ㄱ","ㄱ"],"ᆪ":["ㄱ","ㅅ"],"ᆫ":"ㄴ","ᆬ":["ㄴ","ㅈ"],"ᆭ":["ㄴ","ㅎ"],"ᆮ":"ㄷ","ᆯ":"ㄹ","ᆰ":["ㄹ","ㄱ"],"ᆱ":["ㄹ","ㅁ"],"ᆲ":["ㄹ","ㅂ"],"ᆳ":["ㄹ","ㅅ"],"ᆴ":["ㄹ","ㅌ"],"ᆵ":["ㄹ","ㅍ"],"ᆶ":["ㄹ","ㅎ"],"ᆷ":"ㅁ","ᆸ":"ㅂ","ᆹ":["ㅂ","ㅅ"],"ᆺ":"ㅅ","ᆻ":["ㅅ","ㅅ"],"ᆼ":"ㅇ","ᆽ":"ㅈ","ᆾ":"ㅊ","ᆿ":"ㅋ","ᇀ":"ㅌ","ᇁ":"ㅍ","ᇂ":"ㅎ","ᇃ":["ㄱ","ㄹ"],"ᇄ":["ㄱ","ㅅ","ㄱ"],"ᇅ":["ㄴ","ㄱ"],"ᇆ":["ㄴ","ㄷ"],"ᇇ":["ㄴ","ㅅ"],"ᇈ":["ㄴ","ㅿ"],"ᇉ":["ㄴ","ㅌ"],"ᇊ":["ㄷ","ㄱ"],"ᇋ":["ㄷ","ㄹ"],"ᇌ":["ㄹ","ㄱ","ㅅ"],"ᇍ":["ㄹ","ㄴ"],"ᇎ":["ㄹ","ㄷ"],"ᇏ":["ㄹ","ㄷ","ㅎ"],"ᇐ":["ㄹ","ㄹ"],"ᇑ":["ㄹ","ㅁ","ㄱ"],"ᇒ":["ㄹ","ㅁ","ㅅ"],"ᇓ":["ㄹ","ㅂ","ㅅ"],"ᇔ":["ㄹ","ㅂ","ㅎ"],"ᇕ":["ㄹ","ㅸ"],"ᇖ":["ㄹ","ㅅ","ㅅ"],"ᇗ":["ㄹ",""],"ᇘ":["ㄹ","ㅋ"],"ᇙ":["ㄹ","ㆆ"],"ᇚ":["ㅁ","ㄱ"],"ᇛ":["ㅁ","ㄹ"],"ᇜ":["ㅁ","ㅂ"],"ᇝ":["ㅁ","ㅅ"],"ᇞ":["ㅁ","ㅅ","ㅅ"],"ᇟ":["ㅁ","ㅿ"],"ᇠ":["ㅁ","ㅊ"],"ᇡ":["ㅁ","ㅎ"],"ᇢ":"ㅱ","ᇣ":["ㅂ","ㄹ"],"ᇤ":["ㅂ","ㅍ"],"ᇥ":["ㅂ","ㅎ"],"ᇦ":"ㅸ","ᇧ":["ㅅ","ㄱ"],"ᇨ":["ㅅ","ㄷ"],"ᇩ":["ㅅ","ㄹ"],"ᇪ":["ㅅ","ㅂ"],"ᇫ":"ㅿ","ᇬ":["ㆁ","ㄱ"],"ᇭ":["ㆁ","ㄱ","ㄱ"],"ᇮ":["ㆁ","ㆁ"],"ᇯ":["ㆁ","ㅋ"],"ᇰ":"ㆁ","ᇱ":["ㆁ","ㅅ"],"ᇲ":["ㆁ","ㅿ"],"ᇳ":["ㅍ","ㅂ"],"ᇴ":"ㆄ","ᇵ":["ㅎ","ㄴ"],"ᇶ":["ㅎ","ㄹ"],"ᇷ":["ㅎ","ㅁ"],"ᇸ":["ㅎ","ㅂ"],"ᇹ":"ㆆ","ᇺ":["ㄱ","ㄴ"],"ᇻ":["ㄱ","ㅂ"],"ᇼ":["ㄱ","ㅊ"],"ᇽ":["ㄱ","ㅋ"],"ᇾ":["ㄱ","ㅎ"],"ᇿ":["ㄴ","ㄴ"]},{"ㄲ":["ㄱ","ㄱ"],"ㄳ":["ㄱ","ㅅ"],"ㄵ":["ㄴ","ㅈ"],"ㄶ":["ㄴ","ㅎ"],"ㄸ":["ㄷ","ㄷ"],"ㄻ":["ㄹ","ㅁ"],"ㄺ":["ㄹ","ㄱ"],"ㄼ":["ㄹ","ㅂ"],"ㄽ":["ㄹ","ㅅ"],"ㄾ":["ㄹ","ㅌ"],"ㄿ":["ㄹ","ㅍ"],"ㅀ":["ㄹ","ㅎ"],"ㅃ":["ㅂ","ㅂ"],"ㅄ":["ㅂ","ㅅ"],"ㅆ":["ㅅ","ㅅ"],"ㅉ":["ㅈ","ㅈ"],"ㅘ":["ㅗ","ㅏ"],"ㅙ":["ㅗ","ㅐ"],"ㅚ":["ㅗ","ㅣ"],"ㅝ":["ㅜ","ㅓ"],"ㅞ":["ㅜ","ㅔ"],"ㅟ":["ㅜ","ㅣ"],"ㅢ":["ㅡ","ㅣ"],"ㅥ":["ㄴ","ㄴ"],"ㅦ":["ㄴ","ㄷ"],"ㅧ":["ㄴ","ㅅ"],"ㅨ":["ㄴ","ㅿ"],"ㅩ":["ㄹ","ㄱ","ㅅ"],"ㅪ":["ㄹ","ㄷ"],"ㅫ":["ㄹ","ㅂ","ㅅ"],"ㅬ":["ㄹ","ㅿ"],"ㅭ":["ㄹ","ㆆ"],"ㅮ":["ㅁ","ㅂ"],"ㅯ":["ㅁ","ㅅ"],"ㅰ":["ㅁ","ㅿ"],"ㅲ":["ㅂ","ㄱ"],"ㅳ":["ㅂ","ㄷ"],"ㅴ":["ㅂ","ㅅ","ㄱ"],"ㅵ":["ㅂ","ㅅ","ㄷ"],"ㅶ":["ㅂ","ㅈ"],"ㅷ":["ㅂ","ㅌ"],"ㅺ":["ㅅ","ㄱ"],"ㅻ":["ㅅ","ㄴ"],"ㅼ":["ㅅ","ㄷ"],"ㅽ":["ㅅ","ㅂ"],"ㅾ":["ㅅ","ㅈ"],"ㆀ":["ㅇ","ㅇ"],"ㆂ":["ㆁ","ㅅ"],"ㆃ":["ㆁ","ㅿ"],"ㆅ":["ㅎ","ㅎ"],"ㆇ":["ㅛ","ㅑ"],"ㆈ":["ㅛ","ㅒ"],"ㆉ":["ㅛ","ㅣ"],"ㆊ":["ㅠ","ㅕ"],"ㆋ":["ㅠ","ㅖ"],"ㆌ":["ㅠ","ㅣ"],"ㆎ":["ㆍ","ㅣ"]},{"ꥠ":["ㄷ","ㅁ"],"ꥡ":["ㄷ","ㅂ"],"ꥢ":["ㄷ","ㅅ"],"ꥣ":["ㄷ","ㅈ"],"ꥤ":["ㄹ","ㄱ"],"ꥥ":["ㄹ","ㄱ","ㄱ"],"ꥦ":["ㄹ","ㄷ"],"ꥧ":["ㄹ","ㄷ","ㄷ"],"ꥨ":["ㄹ","ㅁ"],"ꥩ":["ㄹ","ㅂ"],"ꥪ":["ㄹ","ㅂ","ㅂ"],"ꥫ":["ㄹ","ㅸ"],"ꥬ":["ㄹ","ㅅ"],"ꥭ":["ㄹ","ㅈ"],"ꥮ":["ㄹ","ㅋ"],"ꥯ":["ㅁ","ㄱ"],"ꥰ":["ㅁ","ㄷ"],"ꥱ":["ㅁ","ㅅ"],"ꥲ":["ㅂ","ㅅ","ㅌ"],"ꥳ":["ㅂ","ㅋ"],"ꥴ":["ㅂ","ㅎ"],"ꥵ":["ㅅ","ㅅ","ㅂ"],"ꥶ":["ㅇ","ㄹ"],"ꥷ":["ㅇ","ㅎ"],"ꥸ":["ㅈ","ㅈ","ㅎ"],"ꥹ":["ㅌ","ㅌ"],"ꥺ":["ㅍ","ㅎ"],"ꥻ":["ㅎ","ㅅ"],"ꥼ":["ㆆ","ㆆ"]},{"ힰ":["ㅗ","ㅕ"],"ힱ":["ㅗ","ㅗ","ㅣ"],"ힲ":["ㅛ","ㅏ"],"ힳ":["ㅛ","ㅐ"],"ힴ":["ㅛ","ㅓ"],"ힵ":["ㅜ","ㅕ"],"ힶ":["ㅜ","ㅣ","ㅣ"],"ힷ":["ㅠ","ㅐ"],"ힸ":["ㅠ","ㅗ"],"ힹ":["ㅡ","ㅏ"],"ힺ":["ㅡ","ㅓ"],"ힻ":["ㅡ","ㅔ"],"ힼ":["ㅡ","ㅗ"],"ힽ":["ㅣ","ㅏ","ㅗ"],"ힾ":["ㅣ","ㅒ"],"ힿ":["ㅣ","ㅕ"],"ퟀ":["ㅣ","ㅖ"],"ퟁ":["ㅣ","ㅗ","ㅣ"],"ퟂ":["ㅣ","ㅛ"],"ퟃ":["ㅣ","ㅠ"],"ퟄ":["ㅣ","ㅣ"],"ퟅ":["ㆍ","ㅏ"],"ퟆ":["ㆍ","ㅔ"],"ퟋ":["ㄴ",""],"ퟌ":["ㄴ",""],"ퟍ":["ㄷ","ㄷ"],"ퟎ":["ㄷ","ㄷ","ㅂ"],"ퟏ":["ㄷ","ㅂ"],"ퟐ":["ㄷ","ㅅ"],"ퟑ":["ㄷ","ㅅ","ㄱ"],"ퟒ":["ㄷ","ㅈ"],"ퟓ":["ㄷ","ㅊ"],"ퟔ":["ㄷ","ㅌ"],"ퟕ":["ㄹ","ㄱ","ㄱ"],"ퟖ":["ㄹ","ㄱ","ㅎ"],"ퟗ":["ㄹ","ㄹ","ㅋ"],"ퟘ":["ㄹ","ㅁ","ㅎ"],"ퟙ":["ㄹ","ㅂ","ㄷ"],"ퟚ":["ㄹ","ㅂ","ㅍ"],"ퟛ":["ㄹ","ㆁ"],"ퟜ":["ㄹ","ㆆ","ㅎ"],"ퟝ":null,"ퟞ":["ㅁ","ㄴ"],"ퟟ":["ㅁ","ㄴ","ㄴ"],"ퟠ":["ㅁ","ㅁ"],"ퟡ":["ㅁ","ㅂ","ㅅ"],"ퟢ":["ㅁ","ㅈ"],"ퟣ":["ㅂ","ㄷ"],"ퟤ":["ㅂ","ㄹ","ㅍ"],"ퟥ":["ㅂ","ㅁ"],"ퟦ":["ㅂ","ㅂ"],"ퟧ":["ㅂ","ㅅ","ㄷ"],"ퟨ":["ㅂ","ㅈ"],"ퟩ":["ㅂ","ㅊ"],"ퟪ":["ㅅ","ㅁ"],"ퟫ":["ㅅ","ㅸ"],"ퟬ":["ㅅ","ㅅ","ㄱ"],"ퟭ":["ㅅ","ㅅ","ㄷ"],"ퟮ":["ㅅ","ㅿ"],"ퟯ":["ㅅ","ㅈ"],"ퟰ":["ㅅ","ㅊ"],"ퟱ":["ㅅ","ㅌ"],"ퟲ":["ㅅ","ㅎ"],"ퟳ":["ㅿ","ㅂ"],"ퟴ":["ㅿ","ㅸ"],"ퟵ":["ㆁ","ㅁ"],"ퟶ":["ㆁ","ㅎ"],"ퟷ":["ㅈ","ㅂ"],"ퟸ":["ㅈ","ㅂ","ㅂ"],"ퟹ":["ㅈ","ㅈ"],"ퟺ":["ㅍ","ㅅ"],"ퟻ":["ㅍ","ㅌ"]},{"ﾡ":"ㄱ","ﾢ":["ㄱ","ㄱ"],"ﾣ":["ㄱ","ㅅ"],"ﾤ":"ㄴ","ﾥ":["ㄴ","ㅈ"],"ﾦ":["ㄴ","ㅎ"],"ﾧ":"ㄷ","ﾨ":["ㄷ","ㄷ"],"ﾩ":"ㄹ","ﾪ":["ㄹ","ㄱ"],"ﾫ":["ㄹ","ㅁ"],"ﾬ":["ㄹ","ㅂ"],"ﾭ":["ㄹ","ㅅ"],"ﾮ":["ㄹ","ㅌ"],"ﾯ":["ㄹ","ㅍ"],"ﾰ":["ㄹ","ㅎ"],"ﾱ":"ㅁ","ﾲ":"ㅂ","ﾳ":["ㅂ","ㅂ"],"ﾴ":["ㅂ","ㅅ"],"ﾵ":"ㅅ","ﾶ":["ㅅ","ㅅ"],"ﾷ":"ㅇ","ﾸ":"ㅈ","ﾹ":["ㅈ","ㅈ"],"ﾺ":"ㅊ","ﾻ":"ㅋ","ﾼ":"ㅌ","ﾽ":"ㅍ","ﾾ":"ㅎ","ￂ":"ㅏ","ￃ":"ㅐ","ￄ":"ㅑ","ￅ":"ㅒ","ￆ":"ㅓ","ￇ":"ㅔ","ￊ":"ㅕ","ￋ":"ㅖ","ￌ":"ㅗ","ￍ":["ㅗ","ㅏ"],"ￎ":["ㅗ","ㅐ"],"ￏ":["ㅗ","ㅣ"],"ￒ":"ㅛ","ￓ":"ㅜ","ￔ":["ㅜ","ㅓ"],"ￕ":["ㅜ","ㅔ"],"ￖ":["ㅜ","ㅣ"],"ￗ":"ㅠ","ￚ":"ㅡ","ￛ":["ㅡ","ㅣ"],"ￜ":"ㅣ"});function z(n){if(H(n)){const t=V[n];return t||n}return n}function F(n){return $(n)?z(n):n}return n.isSyllable=g,n.isHangul=H,n.isStandardHangul=$,n.isAllHangul=S,n.isAllStandardHangul=E,n.containsHangul=C,n.containsStandardHangul=x,n.isConsonant=y,n.isVowel=d,n.isComplex=function(n){return r(n),!!(z(n).length-1)},n.composeComplex=T,n.composeSyllable=R,n.decomposeSyllable=(n=>{if(r(n),!g(n))throw new Error("Decomposing a syllable requires a syllable to decompose!");const t=n.codePointAt(0)-i.start,e=t%28,l=(t-e)/28,s=l%21;return[j[0|l/21],q[s],D[e]].filter(n=>n)}),n.transform=function(n,t=!1){const r=w(n);return t?r.split``.mapp(F):r.split``.map(z)},n}({});
//# sourceMappingURL=Hangul.js.map
