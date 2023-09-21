import {FunctionComponent, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import {TransparentLogo as TransparentLogo} from "../Logos";
import {desktopAndLandscape, tablet} from "../../utils/mediaQueries";
import {ColumnCentered} from "../../components/Layouts";
import {Link} from "../../components/Link";
import useNavbarColorOnScroll from "../../utils/hooks/useNavbarColorOnScroll";

interface NavbarProps {
    height: number;
    pages: Record<string, string>;
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  height: ${(props) => props.height + "px"};
  background-color: ${(props) =>
          props.isTransparent ? "transparent" : "#1a1a1a"};

  padding: 1vh;
  font-family: Bruno;

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
    font-size: calc(0.5rem + 0.8vw);
  }
`;

const NavLogoContainer = styled.div`
  width: 150px;
  height: 53px;
  position: relative;
  margin-right: auto;
  margin-left: 5%;
  max-height: 70px;

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
  background-color: #1a1a1a;
  z-index: 99;
  transition: right 0.3s ease-in-out;
  padding: 1rem;
  padding-top: 10vh;

  li {
    margin-top: 2rem;
  }
`;

export const Navbar: FunctionComponent<NavbarProps> = ({height, pages}) => {
    const {isTransparent} = useNavbarColorOnScroll();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const links = Object.entries(pages).map(([pageName, url]) => (
        <div key={url} onClick={() => setIsOpen(false)}>
            <Link url={url} title={pageName}/>
        </div>
    ));

    const drawerRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                isOpen &&
                drawerRef.current &&
                !drawerRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen]);
    return (
        <Nav height={height} isTransparent={isTransparent}>
            <NavLogoContainer>
                <TransparentLogo/>
            </NavLogoContainer>

            <Links>{links}</Links>
            <HamburgerContainer onClick={(e) => e.stopPropagation()}>
                <Hamburger
                    toggle={() => setIsOpen(!isOpen)}
                    toggled={isOpen}
                    size={20}
                />
            </HamburgerContainer>
            <SideDrawer isOpen={isOpen} ref={drawerRef}>
                <ColumnCentered>{links}</ColumnCentered>
            </SideDrawer>
        </Nav>
    );
};
