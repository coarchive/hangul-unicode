import { flatSanitize_g_U } from './sanitize';

export default (aryFnName => isFn => data => flatSanitize_g_U(data).split('')[aryFnName](isFn));
