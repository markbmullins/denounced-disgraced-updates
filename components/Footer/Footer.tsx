import { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

interface FooterProps {
  children: ReactNode;
}

const FooterContainer = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer: FunctionComponent<FooterProps> = ({ children }) => {
  return <FooterContainer>{children}</FooterContainer>;
};
