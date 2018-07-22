import transform from './transformer';
import composeAnyComplex from './composeAnyComplex';
/*
export default (aryLike => transform(aryLike).map((v) => {
  let count = 0;
  if (Array.isArray(v)) {
    const cat = [];
    let comp = composeAnyComplex(v[0]);
    for (let i = 1; ; i++) {
      if (count > v.length * 3) {
        throw new Error('The for-loop in toStandard has been looping for too long!');
      } if (comp.done) {
        if (comp.result.length) {
          cat.push(comp.result);
        }
        if (comp.remainder.length) {
          i -= comp.remainder.length - 1;
          cat.push(comp.remainder[0]);
        }
        if (i >= v.length) {
          comp = null;
          break;
        }
        comp = composeAnyComplex(v[i]);
      } else {
        if (i >= v.length) {
          break;
        }
        comp = comp(v[i]);
      }
      count++;
    } if (comp) {
      cat.push(comp.result, ...comp.remainder);
    }
    return `${cat.join``}`;
  }
  return v;
}).flat().join``);
*/
