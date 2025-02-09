"use client";

const { store } = require("@/redux/store");
const { Provider } = require("react-redux");

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
