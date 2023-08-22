import localFont from "next/font/local";
import React from "react";
import { HeroText } from "../components/HeroText";
import { SocialIcons } from "../components/SocialIcons";
import { HeroImage } from "../components/HeroImage";
import { ColumnCentered } from "../components/Layouts";
import { LogoLarge } from "../components/Logos";
import { Footer } from "../components/Footer";
import SpotifyPlayer from "react-spotify-player";
import styled from "styled-components";

const font = localFont({ src: "./BrunoAceSC-Regular.ttf" });

const SpotifyContainer = styled.div`
  display: flex;
`;

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
           {/*<LogoLarge />*/}
           {/*<HeroText font={font}>Coming Soon...</HeroText>*/}

          {/*<SpotifyContainer>*/}
          {/*  <SpotifyPlayer uri="https://open.spotify.com/embed/track/6hiDKK4kOXb6Z9ows6Cw7K" />*/}
          {/*</SpotifyContainer>*/}

          <Footer>
            <SocialIcons />
          </Footer>
        </ColumnCentered>
      </HeroImage>
    </main>
  );
}
