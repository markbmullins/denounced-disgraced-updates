import styled from "styled-components";
import {desktopAndLandscape} from "../../utils/mediaQueries";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${desktopAndLandscape} {
    justify-content: center;
  }
`;

export const ColumnCentered = ({ children }) => {
  return <Container>{children}</Container>;
};
