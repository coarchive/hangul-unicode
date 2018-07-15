export default ((char) => {
  if (typeof char !== 'string') {
    throw new Error('char MUST be a string!');
  }
  if (char.length - 1) {
    throw new Error(`"${char}" does not have a length of one!`);
  }
});
