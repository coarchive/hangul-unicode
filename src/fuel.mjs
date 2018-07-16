export default ((generator, arg) => (...ary) => {
  ary = ary.slice();
  const gen = generator(arg);
  let res = gen.next();
  while (ary.length && !res.done) {
    res = gen.next(ary.shift());
  }
  return { value: res.value, remaining: ary };
});
