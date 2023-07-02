import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { ExampleApi } from "../../../src/client/api";
import { Catalog } from "../../../src/client/pages/Catalog";
import __Providers from "../__Providers";
import { getPath } from "../helpers";

describe("Каталог", () => {
  it("отображает товары, список которых приходит с сервера, когда товар 1", async () => {
    const api = new ExampleApi(getPath());
    jest.spyOn(api, "getProducts").mockImplementation(() =>
      Promise.resolve({
        data: [{ id: 1, name: "Товар 1", price: 100 }],
        error: null,
        status: 200,
        statusText: "",
        config: {},
        headers: {},
      })
    );

    const app = (
      <__Providers api={api} basename={getPath()}>
        <Catalog />
      </__Providers>
    );
    const { container, getAllByTestId } = render(app);

    await waitFor(() => expect(getAllByTestId("1")[0]).toBeInTheDocument());
  });

  it("отображает товары, список которых приходит с сервера, когда товаров много", async () => {
    const basename = getPath();
    const api = new ExampleApi(basename);
    jest.spyOn(api, "getProducts").mockImplementation(() =>
      Promise.resolve({
        data: [
          { id: 1, name: "Товар 1", price: 100 },
          { id: 2, name: "Товар 2", price: 200 },
          { id: 3, name: "Товар 3", price: 300 },
        ],
        error: null,
        status: 200,
        statusText: "",
        config: {},
        headers: {},
      })
    );

    const app = (
      <__Providers api={api} basename={basename}>
        <Catalog />
      </__Providers>
    );
    const { container, getAllByTestId } = render(app);

    await waitFor(() => expect(getAllByTestId("1")[0]).toBeInTheDocument());
    await waitFor(() => expect(getAllByTestId("2")[0]).toBeInTheDocument());
    await waitFor(() => expect(getAllByTestId("3")[0]).toBeInTheDocument());
  });
});
