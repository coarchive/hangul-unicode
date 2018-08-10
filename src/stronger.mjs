import { stronger } from './unicode/complex';
import standardize from './standardize';

export default (group => standardize(group).map(char => stronger[char] || char));
