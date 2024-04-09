import { Equal, Expect } from "../helpers/type-utils";

const obj = {
  a: 1,
  b: 2,
  c: 3,
} as const;

type ObjKey = keyof typeof obj;

// 泛型TKey继承自union类型ObjKey，但不确定它到底是union类型里的哪一个，
// 如果它是"b"，那key默认值给"a"肯定跟它对不上，所以这边会出现类型不匹配的错误
const getObjValue = <TKey extends ObjKey>(key: TKey = "a") => {
  return obj[key];
};

const one = getObjValue("a");
const oneByDefault = getObjValue();
const two = getObjValue("b");
const three = getObjValue("c");

type tests = [
  Expect<Equal<typeof one, 1>>,
  Expect<Equal<typeof oneByDefault, 1>>,
  Expect<Equal<typeof two, 2>>,
  Expect<Equal<typeof three, 3>>
];
