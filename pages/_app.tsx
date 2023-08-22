import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";

import "../styles/globals.css";
import localFont from "next/font/local";

const navbarHeight = 80;

const font = localFont({ src: "./BrunoAceSC-Regular.ttf" });


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Denounced Disgraced</title>
        <meta name="description" content="Denounced Disgraced, Charleston SC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar height={navbarHeight} font={font} pages={{
          Home: "/",
          Store: "/store",
          Shows: "/shows",
          Press: "/press",
          Contact: "/contact",
      }}/>
        <Component {...pageProps} />
    </>
  );
}

export default App;
