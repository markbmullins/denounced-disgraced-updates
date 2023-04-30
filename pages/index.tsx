import localFont from "next/font/local";
import React from "react";
import { ComingSoon } from "../components/ComingSoon";
import { SocialIcons } from "../components/SocialIcons";

const font = localFont({ src: "./BrunoAceSC-Regular.ttf" });

export default function Home() {
  return (
    <main>
      <ComingSoon font={font} />
      <SocialIcons />
    </main>
  );
}
