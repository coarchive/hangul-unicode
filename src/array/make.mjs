export default (aryLike) => {
  if (typeof aryLike === 'string') {
    return aryLike.split``;
  } if (!Array.isArray(aryLike)) {
    throw new TypeError('aryLike must be a string or an array!');
  }
  return aryLike;
};
