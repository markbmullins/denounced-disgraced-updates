import React, { useState,useEffect,useRef } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronDown } from "lucide-react";
import { FilterValueTypes } from "../../../pages/store";
import { Product } from "../../../server/routers/products/schema";


type FilterContentProps = {
  isOpen: boolean;
};

const FilterStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 25%;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
  font-family: Bruno;
`;

const FilterTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const FilterOptions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const FilterItemContainer = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FilterContentWrapper = styled.li`
  display: flex;
  flex-direction: column;
`;

const FilterHeader = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Chevorn = styled(ChevronDown)`
  transition: all 0.2s ease-in-out;
`;


const Content = styled.div`
  overflow: hidden;
  height: auto;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 10px;
`;

const _FilterItem = styled.li`
  display: flex;
  gap: 2px;
`;



const filterValues = {
  "productLine": [
      "jac"
  ],
  "productType": [
      "t-shirt",
      "hoodie",
      "tank-top",
      "long-sleeve"
  ],
  "artStyle": [
      "black-and-white-red-outline",
      "mixed"
  ],
  "productColor": [
      "white",
      "black"
  ],
  "price": [
      {
          "min": 0,
          "max": 30
      },
      {
          "min": 30,
          "max": 50
      },
      {
          "min": 50,
          "max": 100
      },
      {
          "min": 100,
          "max": 1000
      }
  ]
}

const valueToName = (value: string) => {
  switch (value) {
    case "price":
      return "Price";
    case "productColor":
      return "Product Color";
    case "productLine":
      return "Product Line";
    case "productType":
      return "Product Type";
    case "artStyle":
      return "Art Style";
    default:
      return "";
  }
};

const FilterItem = ({
  property,
  value,
  filterParams,
  setFilterParams,
}: {
  property: string;
  value: any;
  filterParams: any;
  setFilterParams: (val: any) => void;
  }) => {
  
  
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);  // Declare the ref
  const chevronRef = useRef<SVGSVGElement | null>(null);  // Declare a ref for the chevron
  
  useEffect(() => {
    if (isOpen) {
      contentRef.current!.style.height = 'auto';
      chevronRef.current!.style.transform = 'rotate(180deg)';  // Rotate the chevron
    } else {
      contentRef.current!.style.height = '0';
      chevronRef.current!.style.transform = 'none';  // Reset the rotation
    }
  }, [isOpen]);

  const handleChevronClick = () => {
    setIsOpen(!isOpen);
  };

  const displayFilterValues = value.map((item: any, index: number) => {
    //check if items is checked or not
    let isChecked: any;
    if (property === "price") {
      isChecked = filterParams[property].some((range: any) => {
        return item.min === range.min && item.max === range.max;
      });
    } else {
      isChecked = filterParams[property].includes(item);
    }

    const handleCheckboxChange = (filterValue: any) => {
      // Clone the current productData object
      const updatedFilterParams = { ...filterParams };

      // Check if the filterValue is already in the array
      if (!isChecked) {
        // If it's not included, add it to the array
        updatedFilterParams[property].push(filterValue);
      } else {
        // If it's included, remove it from the array
        updatedFilterParams[property] = updatedFilterParams[property].filter(
          (value: any) =>
            property === "price"
              ? value.min !== filterValue.min && value.max !== filterValue.max
              : value !== filterValue
        );
      }

      // Update the state with the new productData
      setFilterParams(updatedFilterParams);
    };

    //for prices
    if (item.max) {
      return (
        <_FilterItem key={index}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange(item)}
          />
          <p onClick={() => handleCheckboxChange(item)}>
            {item.min} - {item.max}
          </p>
        </_FilterItem>
      );
    } else {
      return (
        <_FilterItem key={index}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange(item)}
          />{" "}
          <p onClick={() => handleCheckboxChange(item)}> {item}</p>
        </_FilterItem>
      );
    }
  });

  return (
    <FilterItemContainer>
      <FilterContentWrapper>
        <FilterHeader onClick={handleChevronClick}>
          {/*@ts-ignore */}
          {valueToName(property)} <Chevorn  ref={chevronRef} />
        </FilterHeader>
        <Content ref={contentRef}>{displayFilterValues}</Content>
      </FilterContentWrapper>
    </FilterItemContainer>
  );
};

const Filter = ({
  filterParams,
  setFilterParams,
}: {
  filterParams: any;
  setFilterParams: (val: any) => void;
}) => {
 

  return (
    <FilterStyle>
      <FilterTitle>Filter</FilterTitle>
      <FilterOptions>
        {Object.entries(filterValues).map(([name, value], index) => (
          <FilterItem
            key={index}
            property={name}
            value={value}
            filterParams={filterParams}
            setFilterParams={setFilterParams}
          />
        ))}
      </FilterOptions>
    </FilterStyle>
  );
};

export default React.memo( Filter);