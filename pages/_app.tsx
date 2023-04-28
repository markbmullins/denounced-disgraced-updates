import { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "../styles/index.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
