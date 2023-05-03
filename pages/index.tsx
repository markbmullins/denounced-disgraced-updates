import localFont from "next/font/local";
import React from "react";
import { ComingSoon } from "../components/ComingSoon";
import { SocialIcons } from "../components/SocialIcons";
import { HeroImage } from "@/components/HeroImage";
import { ColumnCentered } from "@/components/Layouts";
import { LogoLarge } from "@/components/Logos";

const font = localFont({ src: "./BrunoAceSC-Regular.ttf" });

/**
 * Possible Content:
 * Band introduction
 * Latest news and updates
 * Featured music or video
 * Links to social media profiles
 */
export default function Home() {
  return (
    <main>
      <HeroImage>
        <ColumnCentered>
          <LogoLarge />
          <ComingSoon font={font} />
          <SocialIcons />
        </ColumnCentered>
      </HeroImage>
    </main>
  );
}
