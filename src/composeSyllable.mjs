import { syllables } from './unicode/blocks';

export default ((cho, jung, jong = 0) => (
  String.fromCodePoint(cho * 588 + jung * 28 + jong + syllables.start)
));
