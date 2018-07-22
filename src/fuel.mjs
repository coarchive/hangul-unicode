import R from './Result';

const construct = (gen, yieldObj) => {
  const fn = (...ary) => {
    if (yieldObj.done) {
      const val = yieldObj.value;
      return construct(gen, {
        done: true,
        value: new R(val.result, ...val.remainder.concat(ary)),
      });
    }
    let currentYieldObj = yieldObj;
    while (ary.length && !currentYieldObj.done) {
      currentYieldObj = gen.next(ary.shift());
    }
    return construct(gen, currentYieldObj);
  };
  const val = yieldObj.value;
  if (val instanceof R) {
    fn.result = val.result;
    fn.remainder = val.remainder;
  }
  fn.done = yieldObj.done;
  return fn;
};
export default (generator => (...args) => (...ary) => {
  const gen = generator(...args);
  const yieldObj = gen.next();
  yieldObj.value = {};
  yieldObj.value.remainder = [];
  return construct(gen, yieldObj)(...ary);
});
