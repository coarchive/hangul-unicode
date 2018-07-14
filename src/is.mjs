export default ((range) => {
  const isArray = Array.isArray(range);
  return (char) => {
    if (typeof char !== 'string') {
      throw new Error('char MUST be a string!');
    }
    if (char.length - 1) {
      throw new Error(`"${char}" does not have a length of one!`);
    }
    if (isArray) {
      return range.includes(char);
    }
    return range.contains(char.charCodeAt(0));
  };
});
