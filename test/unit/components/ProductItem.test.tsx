import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { ProductItem } from "../../../src/client/components/ProductItem";
import __Providers from "../__Providers";
import { basename, getPath } from "../helpers";

describe("ProductItem", () => {
  it("отображает товары, список которых приходит с сервера, когда товар 1", async () => {
    const app = (
      <__Providers basename={basename}>
        <ProductItem product={{ id: 1, name: "Товар 1", price: 100 }} />
      </__Providers>
    );
    const { container, getAllByTestId } = render(app);

    const item = getAllByTestId("1")[0];

    await waitFor(() => expect(item).toBeInTheDocument());
    expect(
      item.getElementsByClassName("card-title")[0].innerHTML.includes("Товар 1")
    ).toBe(true);
    expect(
      item.getElementsByClassName("card-text")[0].innerHTML.includes("100")
    ).toBe(true);
    expect(item.getElementsByTagName("a")[0].getAttribute("href")).toBe(
      getPath("/catalog/1", false)
    );
  });
});
