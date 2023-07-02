import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const __StoreProvider = ({
  children,
  api,
  cart,
}: PropsWithChildren<{ api?: ExampleApi; cart?: CartApi }>) => {
  api ||= new ExampleApi(basename);
  cart ||= new CartApi();
  const store = initStore(api, cart);

  return <Provider store={store}>{children}</Provider>;
};

export default __StoreProvider;
