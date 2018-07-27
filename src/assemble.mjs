import compose from './compose';

const assembleAnything = assembleCompose(compose);
export default (aryLike => assembleAnything(make(aryLike)).join``);
// default: UP:>CharacterGroup => String
