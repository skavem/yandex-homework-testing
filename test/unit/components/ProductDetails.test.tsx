import React from "react";
import renderer from "react-test-renderer";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { ProductDetails } from "../../../src/client/components/ProductDetails";
import { initStore } from "../../../src/client/store";
import __Providers from "../__Providers";
import { basename, getPath } from "../helpers";

describe("ProductDetails", () => {
  it("сохраняет верстку", () => {
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <__Providers
        api={api}
        cart={cart}
        store={store}
        basename={getPath("/catalog/0", true)}
      >
        <ProductDetails
          product={{
            color: "red",
            id: 1,
            name: "test",
            price: 10,
            description: "lorem ipsum",
            material: "copium",
          }}
        />
      </__Providers>
    );

    const tree = renderer.create(app).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
