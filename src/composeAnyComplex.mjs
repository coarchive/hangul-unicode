import {
  cho,
  jung,
  jong,
  irregular,
} from './unicode/complex';
import assembleCompose from './assembleCompose';
import composeComplex from './composeComplex';

export default (assembleCompose(composeComplex(cho, jung, jong, irregular)));
// default @AssembledComposedFunction: CharacterGroup => Result
