/**
Test if `input` is a IPv4 CIDR.

@returns A boolean.
*/
export function v4(str: string): boolean;

/**
Test if `input` is a IPv6 CIDR.

@returns A boolean.
*/
export function v6(str: string): boolean;

declare const _default: {
  /**
  Test if `input` is a IPv4 or IPv6 CIDR.

  @returns Either `4`, `6` (indicating the IP version) or `0` if the string is not a CIDR.
  */
  (str: string): 6 | 4 | 0,
  v4: typeof v4;
  v6: typeof v6;
};
export default _default;
