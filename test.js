import isCidr, {v4, v6} from "./index.js";

const v4positive = [
  "0.0.0.0/16",
  "8.8.8.8/17",
  "127.0.0.1/18",
  "100.100.100.100/19",
  "192.168.0.1/20",
  "18.101.25.153/24",
  "123.23.34.2/25",
  "172.26.168.134/26",
  "212.58.241.131/27",
  "128.0.0.0/28",
  "23.71.254.72/29",
  "223.255.255.255/30",
  "192.0.2.235/31",
  "99.198.122.146/32",
  "46.51.197.88/8",
  "173.194.34.134/12",
  "0.0.0.0/0",
];

const v4negative = [
  ".100.100.100.100/16",
  "100..100.100.100./24",
  "100.100.100.100./32",
  "999.999.999.999/12",
  "256.256.256.256/30",
  "256.100.100.100.100/26",
  "123.123.123/31",
  "http://123.123.123/28",
  "1000.2.3.4/14",
  "999.2.3.4/8",
];

const v6positive = [
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/0",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/1",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/2",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/3",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/11",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/99",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/100",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/126",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/127",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/128",
  "2001:0DB8:0000:CD30:0000:0000:0000:0000/60",
  "2001:0DB8::CD30:0:0:0:0/60",
  "2001:0DB8:0:CD30::/60",
  "::/128",
  "::1/128",
  "FF00::/8",
  "FE80::/10",
  "FEC0::/10",
  "1111:2222:3333:4444::123.123.123.123/64",
  "a:b:c:d:e:f:0::/64",
];

const v6negative = [
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/129",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/a",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/√",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/00",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/03",
  "fe80:0000:0000:0000:0204:61ff:fe9d:f156/sdfsdfs",
  "sssssss::sssssss/64",
  "2001:DB8:0:0:8:800:200C:417A:221/64",
  "FF01::101::2/64",
  "02001:0000:1234:0000:0000:C1C0:ABCD:0876/64",
  "2001:0000:1234:0000:00001:C1C0:ABCD:0876/64",
  "2001:0000:1234:0000:0000:C1C0:ABCD:0876  0/64",
  "2001:0000:1234: 0000:0000:C1C0:ABCD:0876/64",
  "3ffe:0b00:0000:0001:0000:0000:000a/64",
  "FF02:0000:0000:0000:0000:0000:0000:0000:0001/64",
  "3ffe:b00::1::a/64",
  "::1111:2222:3333:4444:5555:6666::/64",
  "1:2:3::4:5::7:8/64",
  "12345::6:7:8/64",
  "1::5:400.2.3.4/64",
  "1::5:260.2.3.4/64",
  "1::5:256.2.3.4/64",
  "1::5:1.256.3.4/64",
  "1::5:1.2.256.4/64",
  "1::5:1.2.3.256/64",
  "1::5:300.2.3.4/64",
  "1::5:1.300.3.4/64",
  "1::5:1.2.300.4/64",
  "1::5:1.2.3.300/64",
  "1::5:900.2.3.4/64",
  "1::5:1.900.3.4/64",
  "1::5:1.2.900.4/64",
  "1::5:1.2.3.900/64",
  "1::5:300.300.300.300/64",
  "1::5:3000.30.30.30/64",
  "1::400.2.3.4/64",
  "1::260.2.3.4/64",
  "1::256.2.3.4/64",
  "1::1.256.3.4/64",
  "1::1.2.256.4/64",
  "1::1.2.3.256/64",
  "1::300.2.3.4/64",
  "1::1.300.3.4/64",
  "1::1.2.300.4/64",
  "1::1.2.3.300/64",
  "1::900.2.3.4/64",
  "1::1.900.3.4/64",
  "1::1.2.900.4/64",
  "1::1.2.3.900/64",
  "1::300.300.300.300/64",
  "1::3000.30.30.30/64",
  "::400.2.3.4/64",
  "::260.2.3.4/64",
  "::256.2.3.4/64",
  "::1.256.3.4/64",
  "::1.2.256.4/64",
  "::1.2.3.256/64",
  "::300.2.3.4/64",
  "::1.300.3.4/64",
  "::1.2.300.4/64",
  "::1.2.3.300/64",
  "::900.2.3.4/64",
  "::1.900.3.4/64",
  "::1.2.900.4/64",
  "::1.2.3.900/64",
  "::300.300.300.300/64",
  "::3000.30.30.30/64",
  "2001:1:1:1:1:1:255Z255X255Y255/64",
  "::ffff:192x168.1.26/64",
  "::ffff:2.3.4/64",
  "::ffff:257.1.2.3/64",
  "1.2.3.4/64",
  "1.2.3.4:1111:2222:3333:4444::5555/64",
  "1.2.3.4:1111:2222:3333::5555/64",
  "1.2.3.4:1111:2222::5555/64",
  "1.2.3.4:1111::5555/64",
  "1.2.3.4::5555/64",
  "1.2.3.4::/64",
  "fe80:0000:0000:0000:0204:61ff:254.157.241.086/64",
  "XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:1.2.3.4/64",
  "1111:2222:3333:4444:5555:6666:00.00.00.00/64",
  "1111:2222:3333:4444:5555:6666:000.000.000.000/64",
  "1111:2222:3333:4444:5555:6666:256.256.256.256/64",
  "124.15.6.89/60/64",
  ":/64",
  "1111:2222:3333:4444::5555:/64",
  "1111:2222:3333::5555:/64",
  "1111:2222::5555:/64",
  "1111::5555:/64",
  "::5555:/64",
  ":::/64",
  "1111:/64",
  ":/64",
  ":1111:2222:3333:4444::5555/64",
  ":1111:2222:3333::5555/64",
  ":1111:2222::5555/64",
  ":1111::5555/64",
  ":::5555/64",
  ":::/64",
  "123/64",
  "ldkfj/64",
  "2001::FFD3::57ab/64",
  "2001:db8:85a3::8a2e:37023:7334/64",
  "2001:db8:85a3::8a2e:370k:7334/64",
  "1:2:3:4:5:6:7:8:9/64",
  "1::2::3/64",
  "1:::3:4:5/64",
  "1:2:3::4:5:6:7:8:9/64",
  "XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX/64",
  "1111:2222:3333:4444:5555:6666:7777:8888:9999/64",
  "1111:2222:3333:4444:5555:6666:7777:8888::/64",
  "::2222:3333:4444:5555:6666:7777:8888:9999/64",
  "1111:2222:3333:4444:5555:6666:7777/64",
  "1111:2222:3333:4444:5555:6666/64",
  "1111:2222:3333:4444:5555/64",
  "1111:2222:3333:4444/64",
  "1111:2222:3333/64",
  "1111:2222/64",
  "1111/64",
  "11112222:3333:4444:5555:6666:7777:8888/64",
  "1111:22223333:4444:5555:6666:7777:8888/64",
  "1111:2222:33334444:5555:6666:7777:8888/64",
  "1111:2222:3333:44445555:6666:7777:8888/64",
  "1111:2222:3333:4444:55556666:7777:8888/64",
  "1111:2222:3333:4444:5555:66667777:8888/64",
  "1111:2222:3333:4444:5555:6666:77778888/64",
  "1111:2222:3333:4444:5555:6666:7777:8888:/64",
  "1111:2222:3333:4444:5555:6666:7777:/64",
  "1111:2222:3333:4444:5555:6666:/64",
  "1111:2222:3333:4444:5555:/64",
  "1111:2222:3333:4444:/64",
  "1111:2222:3333:/64",
  "1111:2222:/64",
  "1111:/64",
  ":/64",
  ":8888/64",
  ":7777:8888/64",
  ":6666:7777:8888/64",
  ":5555:6666:7777:8888/64",
  ":4444:5555:6666:7777:8888/64",
  ":3333:4444:5555:6666:7777:8888/64",
  ":2222:3333:4444:5555:6666:7777:8888/64",
  ":1111:2222:3333:4444:5555:6666:7777:8888/64",
  ":::2222:3333:4444:5555:6666:7777:8888/64",
  "1111:::3333:4444:5555:6666:7777:8888/64",
  "1111:2222:::4444:5555:6666:7777:8888/64",
  "1111:2222:3333:::5555:6666:7777:8888/64",
  "1111:2222:3333:4444:::6666:7777:8888/64",
  "1111:2222:3333:4444:5555:::7777:8888/64",
  "1111:2222:3333:4444:5555:6666:::8888/64",
  "1111:2222:3333:4444:5555:6666:7777:::/64",
  "::2222::4444:5555:6666:7777:8888/64",
  "::2222:3333::5555:6666:7777:8888/64",
  "::2222:3333:4444::6666:7777:8888/64",
  "::2222:3333:4444:5555::7777:8888/64",
  "::2222:3333:4444:5555:7777::8888/64",
  "::2222:3333:4444:5555:7777:8888::/64",
  "1111::3333::5555:6666:7777:8888/64",
  "1111::3333:4444::6666:7777:8888/64",
  "1111::3333:4444:5555::7777:8888/64",
  "1111::3333:4444:5555:6666::8888/64",
  "1111::3333:4444:5555:6666:7777::/64",
  "1111:2222::4444::6666:7777:8888/64",
  "1111:2222::4444:5555::7777:8888/64",
  "1111:2222::4444:5555:6666::8888/64",
  "1111:2222::4444:5555:6666:7777::/64",
  "1111:2222:3333::5555::7777:8888/64",
  "1111:2222:3333::5555:6666::8888/64",
  "1111:2222:3333::5555:6666:7777::/64",
  "1111:2222:3333:4444::6666::8888/64",
  "1111:2222:3333:4444::6666:7777::/64",
  "1111:2222:3333:4444:5555::7777::/64",
  "1111:2222:3333:4444:5555:6666:7777:8888:1.2.3.4/64",
  "1111:2222:3333:4444:5555:6666:7777:1.2.3.4/64",
  "1111:2222:3333:4444:5555:6666::1.2.3.4/64",
  "::2222:3333:4444:5555:6666:7777:1.2.3.4/64",
  "1111:2222:3333:4444:5555:6666:1.2.3.4.5/64",
  "1111:2222:3333:4444:5555:1.2.3.4/64",
  "1111:2222:3333:4444:1.2.3.4/64",
  "1111:2222:3333:1.2.3.4/64",
  "1111:2222:1.2.3.4/64",
  "1111:1.2.3.4/64",
  "1.2.3.4/64",
  "11112222:3333:4444:5555:6666:1.2.3.4/64",
  "1111:22223333:4444:5555:6666:1.2.3.4/64",
  "1111:2222:33334444:5555:6666:1.2.3.4/64",
  "1111:2222:3333:44445555:6666:1.2.3.4/64",
  "1111:2222:3333:4444:55556666:1.2.3.4/64",
  "1111:2222:3333:4444:5555:66661.2.3.4/64",
  "1111:2222:3333:4444:5555:6666:255255.255.255/64",
  "1111:2222:3333:4444:5555:6666:255.255255.255/64",
  "1111:2222:3333:4444:5555:6666:255.255.255255/64",
  ":1.2.3.4/64",
  ":6666:1.2.3.4/64",
  ":5555:6666:1.2.3.4/64",
  ":4444:5555:6666:1.2.3.4/64",
  ":3333:4444:5555:6666:1.2.3.4/64",
  ":2222:3333:4444:5555:6666:1.2.3.4/64",
  ":1111:2222:3333:4444:5555:6666:1.2.3.4/64",
  ":::2222:3333:4444:5555:6666:1.2.3.4/64",
  "1111:::3333:4444:5555:6666:1.2.3.4/64",
  "1111:2222:::4444:5555:6666:1.2.3.4/64",
  "1111:2222:3333:::5555:6666:1.2.3.4/64",
  "1111:2222:3333:4444:::6666:1.2.3.4/64",
  "1111:2222:3333:4444:5555:::1.2.3.4/64",
  "::2222::4444:5555:6666:1.2.3.4/64",
  "::2222:3333::5555:6666:1.2.3.4/64",
  "::2222:3333:4444::6666:1.2.3.4/64",
  "::2222:3333:4444:5555::1.2.3.4/64",
  "1111::3333::5555:6666:1.2.3.4/64",
  "1111::3333:4444::6666:1.2.3.4/64",
  "1111::3333:4444:5555::1.2.3.4/64",
  "1111:2222::4444::6666:1.2.3.4/64",
  "1111:2222::4444:5555::1.2.3.4/64",
  "1111:2222:3333::5555::1.2.3.4/64",
  "::./64",
  "::../64",
  "::.../64",
  "::1.../64",
  "::1.2../64",
  "::1.2.3./64",
  "::.2../64",
  "::.2.3./64",
  "::.2.3.4/64",
  "::..3./64",
  "::..3.4/64",
  "::...4/64",
  ":1111:2222:3333:4444:5555:6666:7777::/64",
  ":1111:2222:3333:4444:5555:6666::/64",
  ":1111:2222:3333:4444:5555::/64",
  ":1111:2222:3333:4444::/64",
  ":1111:2222:3333::/64",
  ":1111:2222::/64",
  ":1111::/64",
  ":::/64",
  ":1111:2222:3333:4444:5555:6666::8888/64",
  ":1111:2222:3333:4444:5555::8888/64",
  ":1111:2222:3333:4444::8888/64",
  ":1111:2222:3333::8888/64",
  ":1111:2222::8888/64",
  ":1111::8888/64",
  ":::8888/64",
  ":1111:2222:3333:4444:5555::7777:8888/64",
  ":1111:2222:3333:4444::7777:8888/64",
  ":1111:2222:3333::7777:8888/64",
  ":1111:2222::7777:8888/64",
  ":1111::7777:8888/64",
  ":::7777:8888/64",
  ":1111:2222:3333:4444::6666:7777:8888/64",
  ":1111:2222:3333::6666:7777:8888/64",
  ":1111:2222::6666:7777:8888/64",
  ":1111::6666:7777:8888/64",
  ":::6666:7777:8888/64",
  ":1111:2222:3333::5555:6666:7777:8888/64",
  ":1111:2222::5555:6666:7777:8888/64",
  ":1111::5555:6666:7777:8888/64",
  ":::5555:6666:7777:8888/64",
  ":1111:2222::4444:5555:6666:7777:8888/64",
  ":1111::4444:5555:6666:7777:8888/64",
  ":::4444:5555:6666:7777:8888/64",
  ":1111::3333:4444:5555:6666:7777:8888/64",
  ":::3333:4444:5555:6666:7777:8888/64",
  ":::2222:3333:4444:5555:6666:7777:8888/64",
  ":1111:2222:3333:4444:5555:6666:1.2.3.4/64",
  ":1111:2222:3333:4444:5555::1.2.3.4/64",
  ":1111:2222:3333:4444::1.2.3.4/64",
  ":1111:2222:3333::1.2.3.4/64",
  ":1111:2222::1.2.3.4/64",
  ":1111::1.2.3.4/64",
  ":::1.2.3.4/64",
  ":1111:2222:3333:4444::6666:1.2.3.4/64",
  ":1111:2222:3333::6666:1.2.3.4/64",
  ":1111:2222::6666:1.2.3.4/64",
  ":1111::6666:1.2.3.4/64",
  ":::6666:1.2.3.4/64",
  ":1111:2222:3333::5555:6666:1.2.3.4/64",
  ":1111:2222::5555:6666:1.2.3.4/64",
  ":1111::5555:6666:1.2.3.4/64",
  ":::5555:6666:1.2.3.4/64",
  ":1111:2222::4444:5555:6666:1.2.3.4/64",
  ":1111::4444:5555:6666:1.2.3.4/64",
  ":::4444:5555:6666:1.2.3.4/64",
  ":1111::3333:4444:5555:6666:1.2.3.4/64",
  ":::2222:3333:4444:5555:6666:1.2.3.4/64",
  "1111:2222:3333:4444:5555:6666:7777:::/64",
  "1111:2222:3333:4444:5555:6666:::/64",
  "1111:2222:3333:4444:5555:::/64",
  "1111:2222:3333:4444:::/64",
  "1111:2222:3333:::/64",
  "1111:2222:::/64",
  "1111:::/64",
  ":::/64",
  "1111:2222:3333:4444:5555:6666::8888:/64",
  "1111:2222:3333:4444:5555::8888:/64",
  "1111:2222:3333:4444::8888:/64",
  "1111:2222:3333::8888:/64",
  "1111:2222::8888:/64",
  "1111::8888:/64",
  "::8888:/64",
  "1111:2222:3333:4444:5555::7777:8888:/64",
  "1111:2222:3333:4444::7777:8888:/64",
  "1111:2222:3333::7777:8888:/64",
  "1111:2222::7777:8888:/64",
  "1111::7777:8888:/64",
  "::7777:8888:/64",
  "1111:2222:3333:4444::6666:7777:8888:/64",
  "1111:2222:3333::6666:7777:8888:/64",
  "1111:2222::6666:7777:8888:/64",
  "1111::6666:7777:8888:/64",
  "::6666:7777:8888:/64",
  "1111:2222:3333::5555:6666:7777:8888:/64",
  "1111:2222::5555:6666:7777:8888:/64",
  "1111::5555:6666:7777:8888:/64",
  "::5555:6666:7777:8888:/64",
  "1111:2222::4444:5555:6666:7777:8888:/64",
  "1111::4444:5555:6666:7777:8888:/64",
  "::4444:5555:6666:7777:8888:/64",
  "1111::3333:4444:5555:6666:7777:8888:/64",
  "::3333:4444:5555:6666:7777:8888:/64",
  "::2222:3333:4444:5555:6666:7777:8888:/64",
  "':10.0.0./641",
];

test("test", () => {
  for (const string of v4positive) expect(isCidr(string)).toEqual(4);
  for (const string of v4negative) expect(isCidr(string)).toEqual(0);
  for (const string of v6positive) expect(isCidr(string)).toEqual(6);
  for (const string of v6negative) expect(isCidr(string)).toEqual(0);
  for (const string of v4positive) expect(isCidr.v4(string)).toEqual(true);
  for (const string of v4negative) expect(isCidr.v4(string)).toEqual(false);
  for (const string of v6positive) expect(isCidr.v6(string)).toEqual(true);
  for (const string of v6negative) expect(isCidr.v6(string)).toEqual(false);

  expect(v4).toEqual(isCidr.v4);
  expect(v6).toEqual(isCidr.v6);
});
