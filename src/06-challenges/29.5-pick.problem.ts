import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

// TKey是泛型，这样ts就能根据picked的值来推断它具体是union中的哪几个了；
// 如果直接picked: keyof TObj，那么它的类型就确定是union了
const pick = <TObj, TKey extends keyof TObj>(obj: TObj, picked: TKey[]) => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Record<TKey, TObj[TKey]>);
};

it("Should pick the keys from the object", () => {
  const result = pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    ["a", "b"]
  );

  expect(result).toEqual({ a: 1, b: 2 });

  type test = Expect<Equal<typeof result, { a: number; b: number }>>;
});

it("Should not allow you to pass keys which do not exist in the object", () => {
  pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    [
      "a",
      "b",
      // @ts-expect-error
      "d",
    ]
  );
});
