import React from "react";
import styled from "styled-components";

const SpotifyPlayerContainer = styled.div`
  margin-top: 5%;
  max-width: 450px;
`;

const SpotifyPlayer = () => {
    return (
        <SpotifyPlayerContainer>
            <iframe style={{"borderRadius": "12px"}}
                    src="https://open.spotify.com/embed/playlist/4WfemMhwoMW7nKEAnJ2TFN?utm_source=generator&theme=0"
                    width="100%" height="352" frameBorder="0" allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
        </SpotifyPlayerContainer>
    );
};

export default SpotifyPlayer;
