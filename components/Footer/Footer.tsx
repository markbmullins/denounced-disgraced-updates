import {FunctionComponent, ReactNode} from "react";
import styled from "styled-components";

interface FooterProps {
    children: ReactNode;
}

const FooterContainer = styled.div`
  //position: absolute;
  //bottom: 0;
`;

export const Footer: FunctionComponent<FooterProps> = ({children}) => {
    return <FooterContainer>{children}</FooterContainer>;
};
