import React from "react";
import styled from "styled-components";
import {SpotifyPlayerLarge} from "../components/SpotifyPlayer";

const CenterElement = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
        <CenterElement>
            <SpotifyPlayerLarge/>
        </CenterElement>
    );
}
