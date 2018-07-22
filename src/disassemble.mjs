import { makeAry } from './array';
import transform from './transformer';
import { isSyllable } from './unicode/blocks';
import decomposeSyllable from './decomposeSyllable';

export default ((aryLike, grouped = false) => {
  const ary = makeAry(aryLike).map((char) => {
    if (isSyllable(char)) {
      return transform(decomposeSyllable(char));
    }
    return transform(char)[0];
  });
  if (grouped) {
    return ary;
  }
  return ary.flat(2);
}
);
