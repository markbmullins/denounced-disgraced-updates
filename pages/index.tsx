import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import React, { useState, useEffect } from "react";

const font = localFont({ src: "./BrunoAceSC-Regular.ttf" });

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export default function Home({ isMobile }) {
  return (
    <>
      <Head>
        <title>Denounced Disgraced</title>
        <meta name="description" content="Denounced Disgraced, Charleston SC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex-container">
          <div className="img-container">
            {isMobile ? (
              <Image src="/ddLogoSquare.png" alt="Denounced Disgraced" fill />
            ) : (
              <Image src="/ddLogo.png" alt="Denounced Disgraced" fill />
            )}
            {/* <Image src="/ddLogoSquare.png" alt="Denounced Disgraced" fill /> */}
          </div>
          <div className={`${font.className} hero-text`}>Coming Soon...</div>
        </div>
      </main>
    </>
  );
}

Home.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = req.headers["user-agent"]; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }

  let isMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return { isMobile };
};
