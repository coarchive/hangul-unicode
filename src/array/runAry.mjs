// I mean, how am I supposed to describe this?
import makeAry from './makeAry';

export default (method => arg => aryLike => makeAry(aryLike)[method](v => arg(v)));
