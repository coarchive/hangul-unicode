import makeAry from './array';

const assemble = aryLike => makeAry(aryLike).map((v) => {
  if (Array.isArray(v)) {
    return assemble(v);
  }
  
});
export default (assemble);
