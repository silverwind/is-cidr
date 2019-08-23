import {expectType} from 'tsd';
import isCidr = require('.');

expectType<6 | 4 | 0>(isCidr('foo'));
expectType<boolean>(isCidr.v4('foo'));
expectType<boolean>(isCidr.v6('foo'));
