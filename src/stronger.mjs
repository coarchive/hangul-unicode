import { stronger } from './unicode/complex';
import standardizeComp3Archaic from './standardizeComp3Archaic';

export default (data => standardizeComp3Archaic(data).map(char => stronger[char] || char));
