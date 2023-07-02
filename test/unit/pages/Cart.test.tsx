import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { Cart } from "../../../src/client/pages/Cart";
import { initStore } from "../../../src/client/store";
import { CartState } from "../../../src/common/types";
import __Providers from "../__Providers";
import { basename, getPath } from "../helpers";

describe("Cart", () => {
  it("должно очищать корзину в localstorage по клику", () => {
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const getItem = jest.spyOn(cart, "getState").mockImplementationOnce(
      () =>
        ({
          1: { count: 1, price: 10, name: "test" },
        } as CartState)
    );
    const setItem = jest.spyOn(cart, "setState");
    const store = initStore(api, cart);

    const app = (
      <__Providers
        api={api}
        cart={cart}
        store={store}
        basename={getPath("/store/cart")}
      >
        <Cart />
      </__Providers>
    );

    const { container } = render(app);

    const button = container.querySelector(".Cart-Clear") as HTMLButtonElement;

    button.click();

    expect(setItem).toBeCalledTimes(1);

    expect(Object.keys(cart.getState()).length).toEqual(0);
  });

  it("должно отправлять данные по клику на заказ", async () => {
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const getItem = jest.spyOn(cart, "getState").mockImplementationOnce(
      () =>
        ({
          1: { count: 1, price: 10, name: "test" },
        } as CartState)
    );
    const checkout = jest
      .spyOn(api, "checkout")
      .mockImplementationOnce((form, cart) =>
        Promise.resolve({
          config: {},
          data: { id: 1 },
          headers: {},
          status: 200,
          statusText: "ok",
        })
      );
    const store = initStore(api, cart);

    const app = (
      <__Providers
        api={api}
        cart={cart}
        store={store}
        basename={getPath("/store/cart")}
      >
        <Cart />
      </__Providers>
    );

    const { container } = render(app);

    act(() => {
      fireEvent.change(container.querySelector(".Form-Field_type_name")!, {
        target: { value: "Tim" },
      });
    });
    await waitFor(() =>
      expect(
        (container.querySelector(".Form-Field_type_name") as HTMLInputElement)
          .value
      ).toBe("Tim")
    );

    fireEvent.change(container.querySelector(".Form-Field_type_phone")!, {
      target: { value: "89168506554" },
    });
    await waitFor(() =>
      expect(
        (container.querySelector(".Form-Field_type_phone") as HTMLInputElement)
          .value
      ).toBe("89168506554")
    );

    fireEvent.change(container.querySelector(".Form-Field_type_address")!, {
      target: { value: "Toshkent" },
    });
    await waitFor(() =>
      expect(
        (
          container.querySelector(
            ".Form-Field_type_address"
          ) as HTMLInputElement
        ).value
      ).toBe("Toshkent")
    );

    const button = container.querySelector(".Form-Submit") as HTMLButtonElement;
    button.click();

    expect(checkout).toBeCalledTimes(1);
  });

  it("принимает валидные телефоны", async () => {
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const getItem = jest.spyOn(cart, "getState").mockImplementationOnce(
      () =>
        ({
          1: { count: 1, price: 10, name: "test" },
        } as CartState)
    );
    const checkout = jest
      .spyOn(api, "checkout")
      .mockImplementationOnce((form, cart) =>
        Promise.resolve({
          config: {},
          data: { id: 1 },
          headers: {},
          status: 200,
          statusText: "ok",
        })
      );
    const store = initStore(api, cart);

    const app = (
      <__Providers
        api={api}
        cart={cart}
        store={store}
        basename={getPath("/store/cart")}
      >
        <Cart />
      </__Providers>
    );

    const { container } = render(app);

    act(() => {
      fireEvent.change(container.querySelector(".Form-Field_type_name")!, {
        target: { value: "Tim" },
      });
    });
    await waitFor(() =>
      expect(
        (container.querySelector(".Form-Field_type_name") as HTMLInputElement)
          .value
      ).toBe("Tim")
    );

    fireEvent.change(container.querySelector(".Form-Field_type_phone")!, {
      target: { value: "89168506554" },
    });
    await waitFor(() =>
      expect(
        (container.querySelector(".Form-Field_type_phone") as HTMLInputElement)
          .value
      ).toBe("89168506554")
    );

    fireEvent.change(container.querySelector(".Form-Field_type_address")!, {
      target: { value: "Toshkent" },
    });
    await waitFor(() =>
      expect(
        (
          container.querySelector(
            ".Form-Field_type_address"
          ) as HTMLInputElement
        ).value
      ).toBe("Toshkent")
    );

    const button = container.querySelector(".Form-Submit") as HTMLButtonElement;
    button.click();

    expect(checkout).toBeCalledTimes(1);
  });

  it("сохраняет верстку", async () => {
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const getItem = jest
      .spyOn(cart, "getState")
      .mockImplementationOnce(() => ({} as CartState));
    const store = initStore(api, cart);
    const state = store.getState();
    store.dispatch({ type: "CHECKOUT_COMPLETE", orderId: 1 });

    const app = (
      <__Providers
        api={api}
        cart={cart}
        store={store}
        basename={getPath("/store/cart")}
      >
        <Cart />
      </__Providers>
    );

    const tree = renderer.create(app).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
