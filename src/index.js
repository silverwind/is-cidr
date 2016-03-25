import { cidrv4, cidrv6 } from 'cidr-regex'

export const isCidrV4 = (str) => {
  return cidrv4.test(str)
}

export const isCidrV6 = (str) => {
  return cidrv6.test(str)
}

export default isCidrV4

