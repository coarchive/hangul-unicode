import contains from './contains';

export default (fn => aryLike => !contains(v => !fn(v))(aryLike));
