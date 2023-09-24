
import { AppProps } from "next/app";
import React from "react";
import { Navbar } from "../components/Navbar";
import "../styles/globals.css";
import { GlobalFonts } from "../styles/globalFonts";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { SocialIcons } from "../components/SocialIcons";
import { BackgroundImage } from "../components/BackgroundImage";
import config from "../utils/config";
import { SEO } from "../components/SEO";
import { trpc } from "../utils/trpc";
import CartContext from "../components/Cart/CartContext";

const navbarHeight = 80;

//padding for all pages.
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${"100svh"};
  overflow-x: hidden;
  @media (min-width: 768px) {
    max-width: 1400px;
    width: 95%;
    margin: 0 auto;
    padding-right: 1rem;
    padding-left: 1rem;
  }
  @media (max-width: 768px) {
    margin: 0 auto;
    width: 95%;
    padding-right: 1rem;
    padding-left: 1rem;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  flex: 1 0 auto;
  margin-top: 100px;
  z-index: 1;
`;

function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <GlobalFonts />
      <SEO
        title="Denounced Disgraced"
        description="Denounced Disgraced, Charleston SC"
      />
      <CartContext>
      <AppContainer>
        {/* {!router.pathname.includes("store") && ( */}
          <BackgroundImage src={config.background} />
        {/* )} */}
        <Navbar
          height={navbarHeight}
          pages={{
            Home: "/",
            Store: "/store",
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
        </CartContext>
    </>
  );
}

export default trpc.withTRPC(App);
