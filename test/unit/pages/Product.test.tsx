import React from "react";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { Product } from "../../../src/client/pages/Product";
import { initStore } from "../../../src/client/store";
import __Providers from "../__Providers";
import {  render, waitFor } from "@testing-library/react";
import { basename, getPath } from "../helpers";

describe("Product", () => {
  it("должен добавляться в корзину по клику", async () => {
    const api = new ExampleApi(basename);
    const spy = jest.spyOn(api, "getProductById").mockImplementation((id) => {
      return Promise.resolve({
        data: {
          color: "red",
          price: 100,
          description: "lorem ipsum",
          id,
          material: "wood",
          name: "product 0",
        },
        error: null,
        status: 200,
        statusText: "",
        config: {},
        headers: {},
      });
    });
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <__Providers
        api={api}
        cart={cart}
        store={store}
        basename={getPath("/catalog/1", true)}
      >
        <Product />
      </__Providers>
    );

    const { container } = render(app);

    await waitFor(() => expect(spy).toBeCalledTimes(1));

    await waitFor(() =>
      expect(
        container.getElementsByClassName("ProductDetails-AddToCart")[0]
      ).toBeDefined()
    );
    const button = container.getElementsByClassName(
      "ProductDetails-AddToCart"
    )[0] as HTMLButtonElement;

    button.click();

    await waitFor(() =>
      expect(Object.keys(store.getState().cart)).toHaveLength(1)
    );
  });
});
