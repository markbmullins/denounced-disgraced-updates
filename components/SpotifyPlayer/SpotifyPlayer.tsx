import React from "react";
import styled from "styled-components";

export const SpotifyPlayer = () => {
  return (
    <>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/4WfemMhwoMW7nKEAnJ2TFN?utm_source=generator&theme=0"
        width="450px"
        height="352"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </>
  );
};

export const SpotifyPlayerLarge = () => {
  return (
    <>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/4WfemMhwoMW7nKEAnJ2TFN?utm_source=generator&theme=0"
        width="600"
        height="600"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </>
  );
};
