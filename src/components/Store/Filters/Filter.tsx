import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import { FilterValueTypes } from "../../../pages/store";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 25%;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
  font-family: Bruno;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const OptionsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemContainer = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;



const DynamicContent = styled.div`
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

const ListItem = styled.li`
  display: flex;
  gap: 2px;
`;

const filterValues = {
  // productLine: ["jac"],
  productType: ["t-shirt", "hoodie", "tank-top", "long-sleeve"],
  productColor: ["white", "black"],
  price: [
    {
      min: 0,
      max: 30,
    },
    {
      min: 30,
      max: 50,
    },
    {
      min: 50,
      max: 100,
    },
    {
      min: 100,
      max: 1000,
    },
  ],
};

const propertyNameToDisplayName = (value: string) => {
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
  const [isRotated, setIsRotated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const chevronRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current!.style.height = "auto";
      chevronRef.current!.style.transform = "rotate(180deg)"; // Rotate the chevron
    } else {
      contentRef.current!.style.height = "0";
      chevronRef.current!.style.transform = "none"; // Reset the rotation
    }
  }, [isOpen]);

  const handleChevronClick = () => {
    setIsRotated(!isRotated);
    setIsOpen(!isOpen);
  };

  const displayFilterValues = value.map((item: any, index: number) => {
    let isChecked: boolean;
    if (property === "price") {
      isChecked = filterParams[property].some(
        (range: any) => item.min === range.min && item.max === range.max,
      );
    } else {
      isChecked = filterParams[property].includes(item);
    }

    const handleCheckboxChange = (filterValue: any) => {
      const updatedFilterParams = { ...filterParams };
      if (!isChecked) {
        updatedFilterParams[property].push(filterValue);
      } else {
        updatedFilterParams[property] = updatedFilterParams[property].filter(
          (value: any) =>
            property === "price"
              ? value.min !== filterValue.min && value.max !== filterValue.max
              : value !== filterValue,
        );
      }
      setFilterParams(updatedFilterParams);
    };

    return (
      <ListItem key={index}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleCheckboxChange(item)}
        />
        {item.max ? (
          <p onClick={() => handleCheckboxChange(item)}>
            {item.min} - {item.max}
          </p>
        ) : (
          <p onClick={() => handleCheckboxChange(item)}>{item}</p>
        )}
      </ListItem>
    );
  });

  return (
    <ItemContainer>
      <ContentWrapper>
        <Header onClick={handleChevronClick}>
          {propertyNameToDisplayName(property)}
          <ChevronDown style={{transition:'all 0.2s ease-in-out'}} ref={chevronRef} />
        </Header>
        <DynamicContent ref={contentRef}>{displayFilterValues}</DynamicContent>
      </ContentWrapper>
    </ItemContainer>
  );
};

const Filter = ({
  filterParams,
  setFilterParams,
}: {
  filterParams: any;
  setFilterParams: (val: any) => void;
}) => {
  if (!filterValues) return null;

  return (
    <FilterContainer>
      <Title>Filter</Title>
      <OptionsList>
        {Object.entries(filterValues).map(([property, value], index) => (
          <FilterItem
            key={index}
            property={property}
            value={value}
            filterParams={filterParams}
            setFilterParams={setFilterParams}
          />
        ))}
      </OptionsList>
    </FilterContainer>
  );
};

export default React.memo(Filter);
