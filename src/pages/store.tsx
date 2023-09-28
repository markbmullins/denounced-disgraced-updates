import React, { useState, useEffect, useMemo } from "react";
import { trpc } from "../utils/trpc";
import styled from "styled-components";
import { ProductCard } from "../components/Store/ProductCard";
import CollectionHeader from "../components/Store/CollectionHeader";
import Filter from "../components/Store/Filters/Filter";
import MobileFilter from "../components/Store/Filters/MobileFilter";
import { useWindowSize } from "../utils/hooks/useWindowSize";
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
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
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

export const SpinnerDiv = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
`;

export default function StorePage() {
  const productsQuery = trpc.products.getAll.useQuery();

  const [filterParams, setFilterParams] = useState<any>({
    productLine: [],
    productType: [],
    artStyle: [],
    productColor: [],
    price: [],
  });

  const [pageStartValue] = useState(0);
  const [pageEndValue, setPageEndValue] = useState(5);
  const { width, height } = useWindowSize();

  const filteredProducts = useMemo(() => {
    return productsQuery?.data?.length
      ? productsQuery?.data?.filter((product) => {
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
                  product.price >= min && product.price <= max,
              ))
          );
        })
      : null;
  }, [productsQuery.data, filterParams]);

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
    if (!filteredProducts?.length || filteredProducts?.length < pageEndValue) {
      return;
    }

    // Increase the pageStartValue and pageEndValue to fetch more products
    setPageEndValue(pageEndValue + 5);
  };

  useEffect(() => {
    // Add the event listener only if filteredProducts is loaded
    if (filteredProducts) {
      window.addEventListener("scroll", handleScroll);

      // Cleanup: Remove the event listener on unmount or when filteredProducts becomes falsy
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [filteredProducts, handleScroll]);

  if (productsQuery.isLoading || filteredProducts === undefined) {
    return (
      <SpinnerDiv>
        <Loader style={{ animation: "spin 5000ms infinite linear" }} />
      </SpinnerDiv>
    );
  }

  if (productsQuery.error) {
    return <div>Error loading products</div>;
  }

  return (
    <Container>
      {width! > 950 && (
        <Filter filterParams={filterParams} setFilterParams={setFilterParams} />
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
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />

        <ProductList>
          {filteredProducts
            ?.slice(pageStartValue, pageEndValue)
            ?.map((product) => {
              return (
                <ProductCard
                  line={product.productLine}
                  title={product.productType}
                  price={product.price}
                  id={product.id}
                  image={product.imageUrls as string[]}
                  key={product.id}
                />
              );
            })}
        </ProductList>
      </CollectionContainer>
    </Container>
  );
}
