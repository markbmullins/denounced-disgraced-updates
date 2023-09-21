import React from "react";
import { SocialIcon } from "react-social-icons";
import styled from "styled-components";

const socials = [
  "https://open.spotify.com/artist/0bpIDjmBjNwS5u2qVz8v2m",
  "https://music.apple.com/us/artist/denounced-disgraced/1679592065",
  "https://www.instagram.com/denounceddisgraced/",
  "https://www.youtube.com/@DenouncedDisgraced",
  "https://www.facebook.com/denounceddisgracedband",
];

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;

  a {
    margin: 0 10px;
  }
`;

export const SocialIcons = () => {
  return (
    <Container>
      {socials.map((url) => (
        <React.Fragment key={url}>
          <SocialIcon url={url} bgColor="#e4e6eb" />
        </React.Fragment>
      ))}
    </Container>
  );
};
