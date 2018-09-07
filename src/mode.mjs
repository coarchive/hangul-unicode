export const hardFail = 0b1;
// throws an error when there's something unexpected
export const useArchaic = 0b10;
// allows operation on archaic complex characters such as "ㅨ"
export const useComp3 = 0b100;
// allows operation on complex characters composed of three base characters.
// this means you can make things like "ㅩ", "ㅫ", "ㅴ", and "ㅵ".
export const noJungJong = 0b1000;
// disallows operation on complex jung and complex jong
// useful for only composing complex cho
export const noDouble = 0b10000;
// disallows operation on two of the same character
// this means that things like "ㄲ" will not be made
export const useAll = useArchaic | useComp3;
// both useArchaic and useComp3
