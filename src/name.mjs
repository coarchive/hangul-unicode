export default ((obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key].displayName = key
  });
});
export const nameObject = ((wrapper) => {
  const objName = Object.keys(wrapper)[0];
  const obj = wrapper[objName];
  Object.keys(obj).forEach((key) => {
    obj[key].displayName = `[${objName}.${key}]`;
  });
});
