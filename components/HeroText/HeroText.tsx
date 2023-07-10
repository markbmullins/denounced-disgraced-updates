import React, { ReactNode } from "react";
import styled from "styled-components";
import { desktopAndLandscape } from "../../utils/mediaQueries";
import { NextFont } from "next/dist/compiled/@next/font";

const HeroTextContainer = styled.span`
  font-size: calc(0.9rem + 5vw);
  margin-top: 5%;

  ${desktopAndLandscape} {
    margin-top: 2%;
  }
`;

type HeroTextBasic = {
  font: NextFont;
};

interface HeroTextWithChildren extends HeroTextBasic {
  children: ReactNode;
  text?: never;
}

interface HeroTextWithOutChildren extends HeroTextBasic {
  children?: never;
  text: ReactNode;
}

type HeroTextProps = HeroTextWithChildren | HeroTextWithOutChildren;

/**
 * Accepts either children or text property for text
 */
export const HeroText = ({ font, children, text }: HeroTextProps) => {
  return (
    <HeroTextContainer>
      <span className={font.className}>{children ? children : text}</span>
    </HeroTextContainer>
  );
};
