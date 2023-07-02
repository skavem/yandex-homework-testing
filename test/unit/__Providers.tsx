import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const __Providers = ({
  children,
  api,
  cart,
  store,
  basename
}: PropsWithChildren<{ api?: ExampleApi; cart?: CartApi, store?: ReturnType<typeof initStore>, basename: string }>) => {
  api ||= new ExampleApi(basename);
  cart ||= new CartApi();
  store ||= initStore(api, cart);

  return (
    <BrowserRouter basename={basename}>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export default __Providers;
