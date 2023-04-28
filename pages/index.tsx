import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import React from "react";

const font = localFont({ src: "./BrunoAceSC-Regular.ttf" });

export default function Home() {
  return (
    <>
      <Head>
        <title>Denounced Disgraced</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex-container">
          <div className="img-container">
            <Image src="/ddLogo.png" alt="Denounced Disgraced" fill />
          </div>
          <div className={`${font.className} hero-text`}>Coming Soon...</div>
        </div>
      </main>
    </>
  );
}
