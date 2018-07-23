import { assembleCompose, make } from './array';
import compose from './compose';

const assembleAnything = assembleCompose(compose);
export default (aryLike => assembleAnything(make(aryLike)).join``);
