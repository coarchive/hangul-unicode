export default ((char) => {
  if (typeof char !== 'string') {
    console.error(`Error: the type of char is ${typeof char}`);
    console.error('char is:');
    console.log(char);
    throw new TypeError('char must be a string!');
  } if (char.length - 1) {
    throw new Error(`"${char}" must have a length of one!`);
  }
});
