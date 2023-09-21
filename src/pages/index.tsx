import React from "react";
import { SpotifyPlayerLarge } from "../components/SpotifyPlayer";
import { CenterElement } from "../components/styled";

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
      <SpotifyPlayerLarge />
    </CenterElement>
  );
}
