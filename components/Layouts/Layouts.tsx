import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  @media (min-width: 500px) {
    justify-content: center;
  }

  @media only screen and (orientation: landscape) {
    justify-content: center;
  }
`;

export const ColumnCentered = ({ children }) => {
  return <Container>{children}</Container>;
};
