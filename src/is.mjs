import { transformEveryCharacter } from './transform';

export default (isFn => (data) => {
  const res = transformEveryCharacter(data);
  // it's okay that we don't check if data is
  // a Character since transformEveryCharacter does.
  return Array.isArray(res) ? res.every(isFn) : isFn(res);
});
