import { getServerPath, makeJsonRequest } from "../helpers";

describe("api/products", () => {
  it("возвращает товары корректно", async () => {
    const { data } = await makeJsonRequest(
      getServerPath("/api/products", true)
    );
    expect(data).toBeInstanceOf(Array);
    for (const product of data) {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
    }
  });
  it("возвращает 1 товар корректно", async () => {
    const testId = 1;
    const { data } = await makeJsonRequest(
      getServerPath(`/api/products/${testId}`, true)
    );
    console.log(getServerPath(`/api/products/${testId}`, true), data)
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("price");
    expect(data).toHaveProperty("description");
    expect(data).toHaveProperty("material");
    expect(data).toHaveProperty("color");
    expect(data["id"]).toBe(testId);
  });
});
