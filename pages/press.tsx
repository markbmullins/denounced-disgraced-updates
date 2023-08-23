import React from "react";
import {HeroImage} from "../components/HeroImage";
import {ColumnCentered} from "../components/Layouts";
import {Footer} from "../components/Footer";
import {SocialIcons} from "../components/SocialIcons";
import styled from "styled-components"
import config from "../utils/config";
import SpotifyPlayer from "../components/SpotifyPlayer/SpotifyPlayer";
import {desktopAndLandscape} from "..//utils/mediaQueries";

interface PressProps {
}

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
    width: 40%;
    height: auto;
  }
`;

const Heading = styled.h1`
  font-size: 1.6rem;
  white-space: nowrap;
  text-align: center;
  margin-bottom: 10px;
  font-family: Bruno;

  ${desktopAndLandscape} {
    font-size: 2.5rem;
  }
}
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 20px 0;
  font-family: Roboto;

`;

const Press = () => {
    return (
        <main>
            <HeroImage opacity="0.4">
                <ColumnCentered>
                    <Heading>Denounced Disgraced</Heading>
                    <HeaderImage src={config.epk.pictures[0]} alt="Denounced Disgraced Band"/>
                    <Paragraph>
                        Hailing from Charleston, South Carolina, Denounced Disgraced is revolutionizing the technical
                        death
                        metal genre. With intricate rhythms, groundbreaking riffs, and visceral vocals, the band is
                        setting a
                        new standard for metal enthusiasts everywhere. Having played alongside legendary acts and graced
                        stages
                        of all sizes, Denounced Disgraced is a force to be reckoned with in the metal community.
                    </Paragraph>
                    <Paragraph>
                        For booking, interviews, or promotional materials, please contact [your contact email or number
                        here].
                    </Paragraph>
                    <Heading>Listen on Spotify</Heading>
                    <SpotifyPlayer/>
                    <Footer>
                        <SocialIcons/>
                    </Footer>
                </ColumnCentered>
            </HeroImage>
        </main>
    );
};

export default Press;
