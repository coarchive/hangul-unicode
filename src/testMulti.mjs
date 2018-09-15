import { flatSanitize } from './sanitize';

export default (aryFnName => isFn => data => flatSanitize(data).split('')[aryFnName](isFn));
