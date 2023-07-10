import styled from "styled-components";

const ZIndex = styled.div`
  z-index: 2;
  position: relative;
  height: 100%;
  width: 100%;
`;

const Hero = styled.div`
  background-image: linear-gradient(
      ${({ opacity }) => `rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})`}
    ),
    url(${({ src }) => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 0;
`;

export const HeroImage = ({ children, opacity = "0.7" }) => {
  return (
    <>
      <Hero src="pyramid.png" opacity={opacity} />
      <ZIndex>{children}</ZIndex>
    </>
  );
};
