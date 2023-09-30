import React from "react";
import styled from "styled-components";
import { desktopAndLandscape } from "../../utils/mediaQueries";

const _ColumnCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;

  ${desktopAndLandscape} {
    justify-content: center;
  }
`;



export const ColumnCentered = ({ children }: { children: React.ReactNode }) => {
  return <_ColumnCentered>{children}</_ColumnCentered>;
};
