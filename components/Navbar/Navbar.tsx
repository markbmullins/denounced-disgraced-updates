import { FunctionComponent, useState } from "react";
import NextLink from "next/link";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import { TransparentLogo as TransparentLogo } from "../Logos";
import { desktopAndLandscape } from "../../utils/mediaQueries";

interface NavbarProps {}

const Pages = {
  Home: "/",
  About: "/about",
  Music: "/music",
  Shows: "/shows",
  Press: "/press",
  Contact: "/contact",
};

const Nav = styled.nav`
  position: fixed;
  top: 0%;
  width: 100%;
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

  ${desktopAndLandscape} {
    display: flex;
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
  height: 30px;
  position: relative;
  margin-right: auto;
  margin-left: 5%;

  ${desktopAndLandscape} {
    margin-left: 10%;
  }
`;

const HamburgerContainer = styled.div`
  display: block;
  margin-right: 5vw;

  ${desktopAndLandscape} {
    display: none;
  }
`;

export const Navbar: FunctionComponent<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Nav>
      <NavLogoContainer>
        <TransparentLogo />
      </NavLogoContainer>

      <Links>
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
