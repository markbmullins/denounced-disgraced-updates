import { FunctionComponent, useState } from "react";
import NextLink from "next/link";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import { TransparentLogo as TransparentLogo } from "../Logos";
import {desktopAndLandscape, tablet} from "../../utils/mediaQueries";
import {NextFont} from "next/dist/compiled/@next/font";

interface NavbarProps {
  height: number;
  font: NextFont
}

const Pages = {
  Home: "/",
  Store: "/store",
  Music: "/music",
  Shows: "/shows",
  Press: "/press",
  Contact: "/contact",
};

const Nav = styled.nav`
  position: fixed;
  top: 0%;
  width: 100%;
  height: ${(props) => props.height + "px"};
  background-color: transparent;
  z-index: 100;
  padding: 1vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Links = styled.ul`
  display: none;
  margin-left: auto;
  margin-right: 10%;

  ${tablet} {
    display: flex;
    font-size: calc(0.5rem + .8vw);
  }
`;

const Link = styled.li`
  margin: 5px 10px;
  position: relative;
  display: inline-block;
  a:hover {
    color: #cccccc;
  }

  a:hover::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 1px;
    width: 100%;
    border-radius: 0;
    background-color: white;
  }
`;

const NavLogoContainer = styled.div`
  width: 150px;
  height: 52px;

  position: relative;
  margin-right: auto;
  margin-left: 5%;
  margin-top: 10px;
  
  ${tablet} {
    width: 200px;
    height: 70px;
  }

  ${desktopAndLandscape} {
    margin-left: 10%;
  }
`;

const HamburgerContainer = styled.div`
  display: block;
  margin-right: 5vw;

  ${tablet} {
    display: none;
  }
`;

export const Navbar: FunctionComponent<NavbarProps> = ({ height, font }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Nav height={height}>
      <NavLogoContainer>
        <TransparentLogo />
      </NavLogoContainer>

      <Links className={font.className}>
        {Object.entries(Pages).map(([pageName, url]) => (
          <Link key="url">
            <NextLink href={url}>{pageName}</NextLink>
          </Link>
        ))}
      </Links>
      <HamburgerContainer>
        <Hamburger
          toggle={() => setIsOpen(!isOpen)}
          toggled={isOpen}
          size={20}
        />
      </HamburgerContainer>
    </Nav>
  );
};
