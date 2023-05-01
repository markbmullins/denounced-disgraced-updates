import React from "react";
import styled from "styled-components";

const HeroText = styled.span`
  font-size: calc(0.9rem + 5vw);
  margin-top: 5%;

  @media (min-width: 500px) {
    margin-top: 2%;
  }

  @media only screen and (orientation: landscape) {
    margin-top: 2%;
  }
`;

export const ComingSoon = ({ font }) => {
  return (
    <HeroText>
      <span className={font.className}>Coming Soon...</span>
    </HeroText>
  );
};
