# is-cidr
[![](https://img.shields.io/npm/v/is-cidr.svg?style=flat)](https://www.npmjs.org/package/is-cidr) [![](https://img.shields.io/npm/dm/is-cidr.svg)](https://www.npmjs.org/package/is-cidr) [![](https://packagephobia.com/badge?p=is-cidr)](https://packagephobia.com/result?p=is-cidr)

> Check if a string is an IP address in CIDR notation

## Install

```
npm i is-cidr
```

## Usage

```js
import isCidr from "is-cidr";

isCidr("192.168.0.1/24"); //=> 4
isCidr("1:2:3:4:5:6:7:8/64"); //=> 6
isCidr("10.0.0.0"); //=> 0
isCidr.v6("10.0.0.0/24"); //=> false
```

## API
### isCidr(input)

Check if `input` is a IPv4 or IPv6 CIDR. Returns either `4`, `6` (indicating the IP version) or `0` if the string is not a CIDR.

### isCidr.v4(input)

Check if `input` is a IPv4 CIDR. Returns a boolean.

### isCidr.v6(input)

Check if `input` is a IPv6 CIDR. Returns a boolean.

## Related

- [ip-bigint](https://github.com/silverwind/ip-bigint) - Convert IPv4 and IPv6 addresses to native BigInt and vice-versa
- [ip-regex](https://github.com/sindresorhus/ip-regex) - Regular expression for matching IP addresses
- [is-ip](https://github.com/sindresorhus/is-ip) - Check if a string is an IP address
- [cidr-regex](https://github.com/silverwind/cidr-regex) - Check if a string is an IP address in CIDR notation
- [cidr-tools](https://github.com/silverwind/cidr-tools) - Tools to work with IPv4 and IPv6 CIDR network lists

## License

© [silverwind](https://github.com/silverwind), distributed under BSD licence

Based on previous work by [Felipe Apostol](https://github.com/flipjs)
