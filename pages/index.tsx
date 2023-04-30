import localFont from "next/font/local";
import React from "react";
import { isMobile } from "../utils/isMobile";
import { ComingSoon } from "../components/ComingSoon";

const font = localFont({ src: "./BrunoAceSC-Regular.ttf" });

export default function Home({ isMobile }) {
  return (
    <>
      <ComingSoon isMobile={isMobile} font={font} />
    </>
  );
}

Home.getInitialProps = ({ req }) => {
  let userAgent;

  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }

  return { isMobile: isMobile(userAgent) };
};
