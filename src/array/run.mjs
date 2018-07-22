// I mean, how am I supposed to describe this?
import make from './make';

export default (method => arg => aryLike => make(aryLike)[method](v => arg(v)));
