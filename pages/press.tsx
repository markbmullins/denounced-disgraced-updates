import React from "react";
import { ColumnCentered } from "../components/Layouts";
import styled from "styled-components";
import config from "../utils/config";
import SpotifyPlayer from "../components/SpotifyPlayer/SpotifyPlayer";
import { desktopAndLandscape } from "../utils/mediaQueries";

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

const Heading = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 10px;
  font-family: Bruno;

  ${desktopAndLandscape} {
    font-size: 4rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 20px 0;
  font-family: Roboto;
  padding: 0 25px;

  ${desktopAndLandscape} {
    font-size: 1.5rem;
    padding: 0 10%;
  }
`;

const Press = () => {
  return (
    <ColumnCentered>
      <Heading>Denounced Disgraced</Heading>
      <HeaderImage src={config.epk.pictures[0]} />

      <div>
        <Paragraph>
          Technical death metal from Charleston, South Carolina. For booking,
          interviews, or promotional materials, please contact &nbsp;
          <a href="mailto:denounceddisgracedband@gmail.com">
            denounceddisgracedband@gmail.com
          </a>
        </Paragraph>
        <Paragraph></Paragraph>
      </div>
      <Heading>Listen on Spotify</Heading>
      <SpotifyPlayer />
    </ColumnCentered>
  );
};

export default Press;
