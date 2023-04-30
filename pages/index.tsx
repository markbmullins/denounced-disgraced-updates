import localFont from "next/font/local";
import React from "react";
import { ComingSoon } from "../components/ComingSoon";

const font = localFont({ src: "./BrunoAceSC-Regular.ttf" });

export default function Home() {
  return (
    <>
      <ComingSoon font={font} />
    </>
  );
}
