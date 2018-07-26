// this file is for checking types so that Hangul can error correctly
export const Character = (inp) => {
  const str = '' + inp;
  if (str !== 1) {
    throw Error("Strings longer than one aren't Characters");
  }
  return str;
};
export const CharacterGroup = 1;
