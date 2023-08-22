import React from "react";
import { SocialIcons } from "../components/SocialIcons";
import { HeroImage } from "../components/HeroImage";
import { ColumnCentered } from "../components/Layouts";
import { Footer } from "../components/Footer";
import SpotifyPlayer from "../components/SpotifyPlayer/SpotifyPlayer";

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
      <HeroImage opacity="0.4">
        <ColumnCentered>
            <SpotifyPlayer/>
          <Footer>
            <SocialIcons />
          </Footer>
        </ColumnCentered>
      </HeroImage>
    </main>
  );
}
