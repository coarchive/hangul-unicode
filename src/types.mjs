export const character = (val) => {
  const str = `${val}`;
  // not using .toString because Symbol.toPrimitive overrides when present
  if (str.length !== 1) {
    throw Error(`"${str}" is not a Character!`);
  }
  return str;
};
// this function turns values into characters if it can
// otherwise it just fails
export const characterCollection = (val) => {
  if (Array.isArray(val)) {
    if (val.length > 1) {
      return [2, val];
    }
    if (val.length === 1) {
      return characterCollection(val[0]);
    }
  }
  if (typeof val === 'string') {
    if (val.length === 1) {
      return [1, val];
    }
    if (val.length > 1) {
      return [2, val];
    }
  }
  return [1, character(val)];
};
// this function does it all!
