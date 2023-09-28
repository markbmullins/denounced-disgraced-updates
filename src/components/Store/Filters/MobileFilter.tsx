import React, { useState, useEffect, useRef } from "react";
import { Filter as FilterIcon, X } from "lucide-react";
import Filter from "./Filter";
import styled from "styled-components";
import { FilterValueTypes } from "../../../pages/store";

const StyledMobileFilter = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  gap: 5px;
  align-items: center;
  @media screen and (min-width: 950px) {
    display: none;
  }
`;

const MobileFilterContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  padding: 10px;
  top: 0;
  margin-top: 70px;

  width: 100%;
  height: 100vh !important;
  background-color: #1a1a1a;
  z-index: 150;
  right: ${({ isOpen }) => (isOpen ? "0" : "-120%")};
  @media screen and (min-width: 950px) {
    display: none;
  }
  transition: all 0.3s ease; /* Add a transition for width change */
`;

const MobileFilter = ({
  filterParams,
  setFilterParams,
}: {
  filterParams: any;
  setFilterParams: (val: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledMobileFilter>
      <FilterIcon onClick={toggleFilter} />
      <p onClick={toggleFilter}>Filter</p>
      <MobileFilterContainer isOpen={isOpen}>
        <X
          style={{ position: "absolute", right: "40px", top: "10px" }}
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <Filter filterParams={filterParams} setFilterParams={setFilterParams} />
      </MobileFilterContainer>
    </StyledMobileFilter>
  );
};

export default MobileFilter;
