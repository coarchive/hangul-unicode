export default ((aryLike) => {
  if (Array.isArray(aryLike)) {
    return true;
  } if (typeof aryLike === 'string') {
    return aryLike.length !== 1;
  }
  return false;
});
