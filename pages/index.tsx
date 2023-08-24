import React from "react";
import { ColumnCentered } from "../components/Layouts";
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
    <ColumnCentered>
      <SpotifyPlayer />
    </ColumnCentered>
  );
}
