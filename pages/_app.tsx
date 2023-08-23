import {AppProps} from "next/app";
import React from "react";
import Head from "next/head";
import {Navbar} from "../components/Navbar";
import "../styles/globals.css";
import {GlobalFonts} from "../styles/globalFonts";

const navbarHeight = 80;

function App({Component, pageProps}: AppProps) {
    return (
        <>
            <GlobalFonts/>
            <Head>
                <title>Denounced Disgraced</title>
                <meta name="description" content="Denounced Disgraced, Charleston SC"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar height={navbarHeight} pages={{
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
