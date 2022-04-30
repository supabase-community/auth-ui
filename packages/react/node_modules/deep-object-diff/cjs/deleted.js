"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils.js");

const deletedDiff = (lhs, rhs) => {
  if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return {};
  const l = lhs;
  const r = rhs;
  return Object.keys(l).reduce((acc, key) => {
    if ((0, _utils.hasOwnProperty)(r, key)) {
      const difference = deletedDiff(l[key], r[key]);
      if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference)) return acc;
      acc[key] = difference;
      return acc;
    }

    acc[key] = undefined;
    return acc;
  }, {});
};

var _default = deletedDiff;
exports.default = _default;