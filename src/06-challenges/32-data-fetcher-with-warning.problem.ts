import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const fetchData = async <
  // 等价于TResult extends unknown = "..."，也就是类型不确定，如果不明确告知就是"..."
  TResult = "You must pass a type argument to fetchData"
>(
  url: string
): Promise<TResult> => {
  const data = await fetch(url).then((response) => response.json());
  return data;
};

it("Should fetch data from an API", async () => {
  const data = await fetchData<{ name: string }>( // 明确告知类型
    "https://swapi.dev/api/people/1"
  );
  expect(data.name).toEqual("Luke Skywalker");

  type tests = [Expect<Equal<typeof data, { name: string }>>];
});

it("Should force you to add a type annotation with a helpful error message", async () => {
  const data = await fetchData("https://swapi.dev/api/people/1"); // 不明确告知

  type tests = [
    Expect<Equal<typeof data, "You must pass a type argument to fetchData">>
  ];
});
