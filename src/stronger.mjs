import { stronger } from './unicode/complex';
import { useComp3, useArchaic } from './compose';
import { standardizeFactory } from './standardize';

const standardizeComp3Archaic = standardizeFactory(useComp3 | useArchaic);
// support all types of complex
export default (data => standardizeComp3Archaic(data).map(char => stronger[char] || char));
