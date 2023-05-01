import styled from "styled-components";

const ZIndex = styled.div`
  z-index: 2;
  position: relative;
  height: 100%;
  width: 100%;
`;

const Hero = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.src});
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

export const HeroImage = ({ children }) => {
  return (
    <>
      <Hero src="pyramid.png" />
      <ZIndex>{children}</ZIndex>
    </>
  );
};
