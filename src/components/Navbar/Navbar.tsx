import { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import { TransparentLogo as TransparentLogo } from "../Logos";
import { tablet } from "../../utils/mediaQueries";
import { ColumnCentered } from "../../components/Layouts";
import { Link } from "../../components/Link";
import useNavbarColorOnScroll from "../../utils/hooks/useNavbarColorOnScroll";
import Cart from "../Cart/Cart";

interface NavbarProps {
  height: number;
  pages: Record<string, string>;
}

const Nav = styled.nav<{ isTransparent: boolean; height: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${(props) => props.height + "px"};
  background-color: ${(props) =>
    props.isTransparent ? "transparent" : "#1a1a1a"};

  overflow: hidden;
  font-family: Bruno;

  @media (min-width: 768px) {
    padding: 0 3rem;
  }

  @media (max-width: 768px) {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  z-index: 50;
  display: flex;
  align-items: center;
`;

const Links = styled.ul`
  display: none;

  margin-right: 3rem;
  ${tablet} {
    display: flex;

    font-size: calc(0.5rem + 0.8vw);
  }
`;

const NavLogoContainer = styled.div`
  width: 150px;
  height: 53px;
  position: relative;
  max-height: 70px;
  margin-right: auto;
`;

const HamburgerContainer = styled.div`
  display: flex;
  align-items: center;

  ${tablet} {
    display: none;
  }
`;

const DesktopCartContainer = styled.div`
  @media screen and (max-width: 768px) {
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

export const Navbar: FunctionComponent<NavbarProps> = ({ height, pages }) => {
  const { isTransparent } = useNavbarColorOnScroll();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const links = Object.entries(pages).map(([pageName, url]) => (
    <div key={url} onClick={() => setIsOpen(false)}>
      <Link url={url} title={pageName} />
    </div>
  ));

  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
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
        <TransparentLogo />
      </NavLogoContainer>

      <Links>{links}</Links>
      <DesktopCartContainer>
        <Cart />
      </DesktopCartContainer>
      <HamburgerContainer onClick={(e) => e.stopPropagation()}>
        <Hamburger
          toggle={() => setIsOpen(!isOpen)}
          toggled={isOpen}
          size={20}
        />
        <Cart />
      </HamburgerContainer>
      <SideDrawer isOpen={isOpen} ref={drawerRef}>
        <ColumnCentered>{links}</ColumnCentered>
      </SideDrawer>
    </Nav>
  );
};
