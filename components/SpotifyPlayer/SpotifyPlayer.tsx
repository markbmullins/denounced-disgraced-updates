import React from 'react';
import styled from "styled-components";

const SpotifyPlayerContainer = styled.div`
  margin-top: 5%;
`
const SpotifyPlayer = () => {
    return (
        <SpotifyPlayerContainer>
            <iframe
                src="https://open.spotify.com/embed/artist/0bpIDjmBjNwS5u2qVz8v2m?utm_source=generator&theme=0" width="100%"
                height="352"
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </SpotifyPlayerContainer>
    );
};

export default SpotifyPlayer;