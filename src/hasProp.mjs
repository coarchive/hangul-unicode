const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
export default (hasProp);
export const hasPropCurried = obj => prop => hasProp(obj, prop);
