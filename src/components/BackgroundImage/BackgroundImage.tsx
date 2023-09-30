import styled from "styled-components";

export const BackgroundImage = styled.div<{ src: string }>`
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${props => props.src});
  background-position: center;
  background-size: cover;
`;

