import {
  cho,
  jung,
  jong,
  irregular,
} from './unicode/complex';
import fuel from './fuel';
import composeComplexGenerator from './composeComplex';

export default (fuel(composeComplexGenerator, cho, jung, jong, irregular));
