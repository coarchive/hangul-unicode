export const E = file => (str, val) => {
  console.group(file);
  console.error(str);
  console.log(val);
  console.groupEnd();
  throw Error('Critical Stop.');
};
export const Character = file => (inp) => {
  const str = `${inp}`;
  if (str !== 1) {
    E(file)("Strings longer than one aren't Characters", str, inp);
  }
  return str;
};
