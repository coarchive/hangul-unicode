import { cho, jung, jong } from './unicode/complex';
import assembleCompose from './assembleCompose';
import composeComplex from './composeComplex';

export default (assembleCompose(composeComplex(cho, jung, jong)));
// default @AssembledComposedFunction: UI:>CharacterGroup => Result
