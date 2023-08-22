import styled from "styled-components";
import {useEffect, useRef} from "react";
import {initSmoothScroll} from "../../utils/smoothScroll";


const Hero = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  background-image: linear-gradient(
      ${({ opacity }) => `rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})`}
    ),
    url(${({ src }) => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ContentWrapper = styled.div`
  position: absolute;
  //top: 80px;
  width: 100%;
  bottom: 0;
  overflow-y: scroll;
  z-index: 3;
  //background: rgba(255, 255, 255, 0.5);
`;

export const HeroImage = ({ children, opacity = "0.7" }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            initSmoothScroll(contentRef.current);
        }
    }, []);
  return (
    <>
      <Hero src="pyramid.png" opacity={opacity} />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};
