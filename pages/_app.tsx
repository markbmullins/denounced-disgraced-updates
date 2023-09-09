import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import "../styles/globals.css";
import { GlobalFonts } from "../styles/globalFonts";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { SocialIcons } from "../components/SocialIcons";

const navbarHeight = 80;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
      url("/background.png");
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
`;

const ContentContainer = styled.div`
  flex: 1 0 auto;
  margin-top: 100px;
  z-index: 1;
  position: relative;
`;

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalFonts />
      <Head>
        <title>Denounced Disgraced</title>
        <meta name="description" content="Denounced Disgraced, Charleston SC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContainer>
        <Navbar
          height={navbarHeight}
          pages={{
            Home: "/",
            Store: "https://denounceddisgraced.bigcartel.com/",
            Shows: "/shows",
            Press: "/press",
            Contact: "/contact",
          }}
        />
        <ContentContainer>
          <Component {...pageProps} />
        </ContentContainer>
        <Footer>
          <SocialIcons />
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;
