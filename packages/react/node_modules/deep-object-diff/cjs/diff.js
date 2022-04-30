"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils.js");

const diff = (lhs, rhs) => {
  if (lhs === rhs) return {}; // equal return no diff

  if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return rhs; // return updated rhs

  const l = lhs;
  const r = rhs;
  const deletedValues = Object.keys(l).reduce((acc, key) => {
    if (!(0, _utils.hasOwnProperty)(r, key)) {
      acc[key] = undefined;
    }

    return acc;
  }, {});

  if ((0, _utils.isDate)(l) || (0, _utils.isDate)(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    return r;
  }

  return Object.keys(r).reduce((acc, key) => {
    if (!(0, _utils.hasOwnProperty)(l, key)) {
      acc[key] = r[key]; // return added r key

      return acc;
    }

    const difference = diff(l[key], r[key]); // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object

    if ((0, _utils.isEmptyObject)(difference) && !(0, _utils.isDate)(difference) && ((0, _utils.isEmptyObject)(l[key]) || !(0, _utils.isEmptyObject)(r[key]))) return acc; // return no diff

    acc[key] = difference; // return updated key

    return acc; // return updated key
  }, deletedValues);
};

var _default = diff;
exports.default = _default;