import React, {ReactNode} from "react";
import styled from "styled-components";
import {desktopAndLandscape} from "../../utils/mediaQueries";

const HeroTextContainer = styled.span`
  font-size: calc(0.9rem + 5vw);
  margin-top: 5%;
  font-family: Bruno;

  ${desktopAndLandscape} {
    margin-top: 2%;
  }
`;

interface HeroTextWithChildren {
    children: ReactNode;
    text?: never;
}

interface HeroTextWithOutChildren {
    children?: never;
    text: ReactNode;
}

type HeroTextProps = HeroTextWithChildren | HeroTextWithOutChildren;

/**
 * Accepts either children or text property for text
 */
export const HeroText = ({children, text}: HeroTextProps) => {
    return (
        <HeroTextContainer>
            <span>{children ? children : text}</span>
        </HeroTextContainer>
    );
};
