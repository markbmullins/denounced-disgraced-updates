import {AppProps} from "next/app";
import React from "react";
import {Navbar} from "../components/Navbar";
import "../styles/globals.css";
import {GlobalFonts} from "../styles/globalFonts";
import styled from "styled-components";
import {Footer} from "../components/Footer";
import {SocialIcons} from "../components/SocialIcons";
import {BackgroundImage} from "../components/BackgroundImage";
import config from "../utils/config";
import {SEO} from "../components/SEO";

const navbarHeight = 80;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${"100svh"};
`;

const ContentContainer = styled.div`
  position: relative;
  flex: 1 0 auto;
  margin-top: 100px;
  z-index: 1;
`;

function App({Component, pageProps}: AppProps) {
    return (
        <>
            <GlobalFonts/>
            <SEO title="Denounced Disgraced"
                 description="Denounced Disgraced, Charleston SC"/>
            <AppContainer>
                <BackgroundImage src={config.background}/>
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
                    <SocialIcons/>
                </Footer>
            </AppContainer>
        </>
    );
}

export default App;
