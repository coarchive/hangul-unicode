import { assembleCompose, make } from './array';
import compose from './compose';

const assembleAnything = assembleCompose(compose);
const assemble = aryLike => true;
export default (assemble);
