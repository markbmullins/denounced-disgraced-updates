import {FunctionComponent, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import {TransparentLogo as TransparentLogo} from "../Logos";
import {desktopAndLandscape, tablet} from "../../utils/mediaQueries";
import {NextFont} from "next/dist/compiled/@next/font";
import {ColumnCentered} from "../../components/Layouts";
import {Link} from "../../components/Link";

interface NavbarProps {
    height: number;
    font: NextFont
    pages: Record<string, string>
}

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

const SideDrawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-100%")};
  width: 40%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
  transition: right 0.3s ease-in-out;
  padding: 1rem;

  ${Link} {
    margin: 1rem 0;
  }
`;

const SidebarDrawerHamburgerContainer = styled.div`
  width: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 6vh;
`

export const Navbar: FunctionComponent<NavbarProps> = ({height, font, pages}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const links = Object.entries(pages).map(([pageName, url]) => (
        <div key={url} onClick={() => setIsOpen(false)}><Link url={url} title={pageName}/></div>
    ))

    const drawerRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen]);
    return (
        <Nav height={height} className={font.className}>
            <NavLogoContainer>
                <TransparentLogo/>
            </NavLogoContainer>

            <Links>
                {links}
            </Links>
            <HamburgerContainer onClick={(e) => e.stopPropagation()}>
                <Hamburger
                    toggle={() => setIsOpen(!isOpen)}
                    toggled={isOpen}
                    size={20}
                />
            </HamburgerContainer>
            <SideDrawer isOpen={isOpen} ref={drawerRef}>
                <SidebarDrawerHamburgerContainer>

                </SidebarDrawerHamburgerContainer>
                <ColumnCentered>
                    {links}
                </ColumnCentered>
            </SideDrawer>
        </Nav>
    );
};
