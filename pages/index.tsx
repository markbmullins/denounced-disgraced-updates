import React from "react";
import { ColumnCentered } from "../components/Layouts";
import styled from "styled-components";
import { SpotifyPlayerLarge } from "../components/SpotifyPlayer";

const MarginTop = styled.div`
  margin-top: 10%;
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
    <ColumnCentered>
      <MarginTop>
        <SpotifyPlayerLarge />
      </MarginTop>
    </ColumnCentered>
  );
}
