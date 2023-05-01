import Image from "next/image";
import styled from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
`;
const Mobile = styled(ImageContainer)`
  display: block;
  @media (min-width: 500px) {
    display: none;
  }
  @media only screen and (orientation: landscape) {
    display: none;
  }
`;

const Desktop = styled(ImageContainer)`
  display: none;

  position: relative;
  @media (min-width: 500px) {
    display: block;
  }

  @media only screen and (orientation: landscape) {
    display: block;
  }
`;

export const ResponsiveLogoSwitcher = ({ sources }) => {
  return (
    <>
      <Mobile>
        <Image src={sources.mobile} alt="Denounced Disgraced" fill />
      </Mobile>
      <Desktop>
        <Image src={sources.desktop} alt="Denounced Disgraced" fill />
      </Desktop>
    </>
  );
};

const sources = {
  mobile: "/ddLogoSquare.png",
  desktop: "/ddLogo.png",
};

const noBgSources = {
  mobile: "/ddLogoSquare-transformed.png",
  desktop: "/ddLogo-removebg.png",
};

const LogoLargeContainer = styled.div`
  margin-top: 30%;
  /* object-fit: contain; */
  position: relative;
  width: 90vw;
  height: 25vh;

  @media (min-width: 500px) {
    width: 70vw;
    height: 50vh;
    margin-top: 0;
  }

  @media only screen and (orientation: landscape) {
    width: 70vw;
    height: 50vh;
    margin-top: 0;
  }
`;

export const LogoLarge = () => {
  return (
    <LogoLargeContainer>
      {/* <ResponsiveLogoSwitcher sources={noBgSources} /> */}
      <Image src={noBgSources.desktop} alt="Denounced Disgraced" fill />
    </LogoLargeContainer>
  );
};
