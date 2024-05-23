import {v4 as v4Re, v6 as v6Re} from "cidr-regex";

const re4 = v4Re({exact: true});
const re6 = v6Re({exact: true});

const isCidr = (str: string) => re4.test(str) ? 4 : (re6.test(str) ? 6 : 0);
export const v4 = isCidr.v4 = (str: string) => re4.test(str);
export const v6 = isCidr.v6 = (str: string) => re6.test(str);
export default isCidr;
