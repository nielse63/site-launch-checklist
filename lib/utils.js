
export const hasKey = function(object, key) {
  return {}.hasOwnProperty.call(object, key);
}
