export const isString = val => {
  if (typeof val === 'string' || val instanceof String) {
    return true;
  } else {
    return false;
  }
};

export const isObject = val => {
  if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
    return true;
  } else {
    return false;
  }
};

export const isArray = val => {
  return Array.isArray(val);
};

export const isEmptyValue = value => {
  if (isObject(value) && !Object.keys(value).length) return true;
  if (isArray(value) && !value.length) return true;
  return ['', null, undefined].includes(value);
};

export const capitalize = str => {
  if (!isString(str) || isEmptyValue(str)) return str;
  return str[0].toUpperCase() + str.slice(1);
};

export default {
  isString,
  isObject,
  isArray,
  isEmptyValue,
  capitalize
};
