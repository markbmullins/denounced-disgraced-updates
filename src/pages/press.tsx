import React from "react";
import { ColumnCentered } from "../components/Layouts";
import styled from "styled-components";
import config from "../utils/config";
import { SpotifyPlayer } from "../components/SpotifyPlayer/SpotifyPlayer";
import { desktopAndLandscape } from "../utils/mediaQueries";
import { Heading, Paragraph, UnderlinedLink } from "../components/styled/Text";

interface PressProps {}

/**
 * Reviews and features from music blogs and publications
 * Interviews with band members
 * Awards and accolades
 * Press kit download link
 */

const HeaderImage = styled.img`
  width: 90%;
  height: 50%;

  ${desktopAndLandscape} {
    max-width: 50%;
  }
`;

const MarginBottom = styled.span`
  margin-bottom: 30px;
`;

const ParagraphWithMargins = styled(Paragraph)`
  width: 90%;
  text-align: justify;
  margin: 30px 0px;
  ${desktopAndLandscape} {
    font-size: 1.5rem;
  }
`;

const Press = () => {
  return (
    <ColumnCentered>
      <Heading>Denounced Disgraced</Heading>
      <HeaderImage
        src={config.epk.pictures[0]}
        alt="Denounced Disgraced Band"
      />
      <ParagraphWithMargins>
        Denounced Disgraced is an up and coming metal band from Charleston,
        South Carolina. For booking, interviews, or promotional materials,
        please contact{" "}
        <UnderlinedLink href="mailto:denounceddisgracedband@gmail.com">
          denounceddisgracedband@gmail.com
        </UnderlinedLink>
      </ParagraphWithMargins>
      <Heading>Listen on Spotify</Heading>
      <MarginBottom>
        <SpotifyPlayer />
      </MarginBottom>
    </ColumnCentered>
  );
};

export default Press;
