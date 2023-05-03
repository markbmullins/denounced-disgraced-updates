import { desktopAndLandscape } from "../../utils/mediaQueries";
import Image from "next/image";
import styled from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
`;
const Mobile = styled(ImageContainer)`
  display: block;
  ${desktopAndLandscape} {
    display: none;
  }
`;

const Desktop = styled(ImageContainer)`
  display: none;

  position: relative;
  ${desktopAndLandscape} {
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

export const TransparentLogo = () => {
  return <Image src={noBgSources.desktop} alt="Denounced Disgraced" fill />;
};

const LogoLargeContainer = styled.div`
  margin-top: 30%;
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
      <TransparentLogo />
    </LogoLargeContainer>
  );
};
