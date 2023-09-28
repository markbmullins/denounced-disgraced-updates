import React from "react";
import styled from "styled-components";

const CollectionHeaderStyle = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
  gap: 10px;
  font-family: Bruno;
  margin-bottom: 10px;
`;

const CollectionHeaderTitle = styled.h1`
  font-size: 2rem;
`;

const CollectionHeader = ({
  showingResult,
  totalResults,
}: {
  showingResult: number;
  totalResults: number;
}) => {
  return (
    <CollectionHeaderStyle>
      <CollectionHeaderTitle>Products</CollectionHeaderTitle>

      <p>
        Showing {showingResult} results of {totalResults}
      </p>
      
    </CollectionHeaderStyle>
  );
};

export default CollectionHeader;
