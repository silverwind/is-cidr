import {expectType} from "tsd";
import isCidr, {v4, v6} from "./index.js";

expectType<6 | 4 | 0>(isCidr("foo"));
expectType<boolean>(v4("foo"));
expectType<boolean>(v6("foo"));
expectType<boolean>(isCidr.v4("foo"));
expectType<boolean>(isCidr.v6("foo"));
