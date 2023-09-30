import { desktopAndLandscape } from "../../utils/mediaQueries";
import styled from "styled-components";

export const Heading = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 10px;
  font-family: Bruno;

  ${desktopAndLandscape} {
    font-size: 4rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  font-family: Roboto;

  ${desktopAndLandscape} {
    font-size: 1.5rem;
  }
`;

export const UnderlinedLink = styled.a`
  text-decoration: underline;
`;
