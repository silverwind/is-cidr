"use strict";
const cidrRegex = require("cidr-regex");
const ipaddr = require("ipaddr.js");
const re4 = cidrRegex.v4({exact: true});
const re6 = cidrRegex.v6({exact: true});

const isStrictCidr = str => {
  try {
    return ipaddr.IPv4.networkAddressFromCIDR(str).octets.join(".") === str.split("/")[0];
  } catch {
    return false;
  }
};

const isCidr = module.exports = (str, strict = false) => {
  if (re4.test(str) && !strict) return 4;
  if (re6.test(str)) return 6;
  if (re4.test(str) && isStrictCidr(str) && strict) return 4;
  return 0;
};

isCidr.v4 = (str, strict = false) => strict ? re4.test(str) && isStrictCidr(str) : re4.test(str);
isCidr.v6 = str => re6.test(str);
