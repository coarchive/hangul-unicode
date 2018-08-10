import { stronger } from './unicode/complex';
import standardize from './standardize';

export default (data => standardize(data, false, true).map(char => stronger[char] || char));
// standardize(data, grouped, depth3)
// allow depth3 so as not to tamper with archaic unicode
