import React, { useState, useEffect, useRef } from "react";
import { trpc } from "../utils/trpc";
import styled from "styled-components";
import Link from "next/link";
import { Product } from "../server/routers/products/schema";
import { ProductCard } from "../components/Store/ProductCard";
import CollectionHeader from "../components/Store/CollectionHeader";
import Filter from "../components/Store/Filters/Filter";
import MobileFilter from "../components/Store/Filters/MobileFilter";
import { useWindowSize } from "../utils/hooks/useWindowSize";
import { filterParamsAtom } from "../utils/jotai";
import { Loader } from "lucide-react";

export type FilterValueTypes = {
  productLine: string[];
  productType: string[];
  artStyle: string[];
  productColor: string[];
  price: { min: number; max: number }[];
};

const ProductList = styled.div`
  display: grid;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr); /* Two items per row */
    

/* Two items per row */
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr); /* Two items per row */
   
  }
  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr); /* Two items per row */
  }
  padding-bottom: 50px;
  gap: 15px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  padding: 20px 0;
  max-width: 100vw;
`;

const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ShowMoreButton = styled.button`
  width: 100%;
  text-align: center;
  font-family: Bruno;
  background-color: #36284c;
  padding: 5px;
  color: white;
  border-radius: 10px;
  :hover {
    opacity: 0.8;
  }
  :disabled {
    opacity: 0.8;
  }
`;

export const SpinnerDiv = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
`;

const getFilterProperties = (products: any) => {
  const uniqueValues = products.reduce(
    (accumulator: any, product: Product) => {
      // Collect unique values for productLine
      if (!accumulator.productLine.includes(product.productLine)) {
        accumulator.productLine.push(product.productLine);
      }

      // Collect unique values for productType
      if (!accumulator.productType.includes(product.productType)) {
        accumulator.productType.push(product.productType);
      }

      // Collect unique values for artStyle
      if (!accumulator.artStyle.includes(product.artStyle)) {
        accumulator.artStyle.push(product.artStyle);
      }

      // Collect unique values for productColor
      if (!accumulator.productColor.includes(product.productColor)) {
        accumulator.productColor.push(product.productColor);
      }

      return accumulator;
    },
    {
      productLine: [],
      productType: [],
      artStyle: [],
      productColor: [],
      price: [
        {
          min: 0,
          max: 30,
        },
        {
          min: 30,
          max: 50,
        },
        { min: 50, max: 100 },
        { min: 100, max: 1000 },
      ],
    }
  );

  return uniqueValues;
};

// const groupProducts = (products: Product[]): Product[][] => {
//   const map = products.reduce(
//     (acc: Map<string, Product[]>, product: Product) => {
//       const key = `${product.productLine}_${product.productType}_${product.artStyle}`;
//       const group = acc.get(key) || [];
//       acc.set(key, [...group, product]);
//       return acc;
//     },
//     new Map<string, Product[]>()
//   );

//   return Array.from(map.values());
// };

// TODO: Implement
const ImageCarousel = styled.div``;

export default function StorePage() {
  const productsQuery = trpc.products.getAll.useQuery();

  const [filterParams, setFilterParams] = useState<any>({
    productLine: [],
    productType: [],
    artStyle: [],
    productColor: [],
    price: [],
  });

  const [pageStartValue, setPageStartValue] = useState(0);
  const [pageEndValue, setPageEndValue] = useState(5);
  const [showDesktopFilter, setShowDesktopFilter] = useState(false);
  const { width, height } = useWindowSize();

  const filteredProducts = productsQuery?.data?.length ?  productsQuery?.data?.filter((product) => {
    return (
      (!filterParams.productLine.length ||
        filterParams.productLine.includes(product.productLine)) &&
      (!filterParams.productType.length ||
        filterParams.productType.includes(product.productType)) &&
      (!filterParams.artStyle.length ||
        filterParams.artStyle.includes(product.artStyle)) &&
      (!filterParams.productColor.length ||
        filterParams.productColor.includes(product.productColor)) &&
      (!filterParams.price.length ||
        filterParams.price.some(
          ({ min, max }: { min: number; max: number }) =>
            product.price >= min && product.price <= max
        ))
    );
  }) : null ;



  const handleScroll = () => {
    const threshold = 20; 

    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - threshold
    ) {
      return;
    }
    loadMoreProducts();
  };

  const loadMoreProducts = () => {
    console.log(filteredProducts?.length);
    if (!filteredProducts?.length || filteredProducts?.length < pageEndValue) {
      return;
    }

    // Increase the pageStartValue and pageEndValue to fetch more products
    setPageEndValue(pageEndValue + 5);
  };

  useEffect(() => {
    // Add the event listener only if filteredProducts is loaded
    if (filteredProducts) {
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup: Remove the event listener on unmount or when filteredProducts becomes falsy
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [filteredProducts]);

  if (productsQuery.isLoading || !filteredProducts?.length ) {
    return (
      <SpinnerDiv
       
      >
        <Loader style={{animation:'spin 5000ms infinite linear'}} />
      </SpinnerDiv>
    );
  }

  if (productsQuery.error) {
    return <div>Error loading products</div>;
  }

  const filterValues: FilterValueTypes = getFilterProperties(
    productsQuery.data
  );

  return (
    <Container>
      {width! > 950 && (
        <Filter
          filterValues={filterValues}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      )}

      <CollectionContainer>
        <CollectionHeader
          showingResult={
            !filteredProducts
              ? 0
              : filteredProducts?.length < pageEndValue
              ? filteredProducts?.length
              : pageEndValue
          }
          totalResults={filteredProducts?.length || 0}
        />
        <MobileFilter
          filterValues={filterValues}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />

        <ProductList>
          { filteredProducts
            ?.slice(pageStartValue, pageEndValue)
            ?.map((product) => {
              
              return (
                <ProductCard
                  line={product.productLine}
                  title={product.productType}
                  price={product.price}
                  id={product.id}
                  //@ts-ignore
                  image={product.imageUrls}
                  key={product.id}
                />
              );
            })}
        </ProductList>
        {/* <ShowMoreButton onClick={() => { setPageStartValue(pageStartValue + 20); setPageEndValue(pageEndValue + 20)}} disabled={!filteredProducts?.length ? true : filteredProducts?.length  > pageEndValue ? false : true}>Show More</ShowMoreButton> */}
      </CollectionContainer>
    </Container>
  );
}
