export default (fn => (aryLike) => {
  if (typeof aryLike === 'string') {
    aryLike = aryLike.split``;
  } else if (!Array.isArray(aryLike)) {
    throw new Error('aryLike must be a string or an array!');
  }
  return aryLike.some(fn);
});
