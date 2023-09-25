import React, { useMemo, useState, ChangeEvent } from "react";
import styled from "styled-components";
import countryList from "react-select-country-list";
import { useShoppingCart } from "use-shopping-cart";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

const CheckoutHeader = styled.div`
  font-size: 40px;
  font-weight: bold;
  font-family: Bruno;
  width: 100%;
  padding-bottom: 30px;
`;

const Input = styled.input<{ size?: string }>`
  width: ${({ size }) => (size ? size : "100%")};
  height: 30px;
  border-radius: 10px;
  border: 2px solid black;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 15px;
  padding-bottom: 5px;
  font-weight: bold;
  font-family: Bruno;
`;

const ShippingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CountriesSelect = styled.select`
  height: 40px;
  border-radius: 10px;
  border: 2px solid black;
  margin-bottom: 15px;
  width: 100%;
  padding: 5px;
`;

const NextButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #36284c;
  border-radius: 10px;
  font-family: Bruno;
  color: white;
`;

const ShippingDetails = styled.div`
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export type ShippingType = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
};

const Shipping = () => {
  const countries = useMemo(() => countryList().getData(), []);
  const cart = useShoppingCart();
  const router = useRouter();

  const [shippingData, setShippingData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const { cartDetails , redirectToCheckout } = cart;

  const orderMutation = trpc.orders.stripeCheckout.useMutation();

  const createCheckout = async () => {
      for (let key in shippingData) {
        //@ts-ignore
      if (!shippingData[key].trim()) {
        alert(`Please provide a valid ${key}.`);
        return;
      }
    }

    if (!/\S+@\S+\.\S+/.test(shippingData.email)) {
      alert("Please provide a valid email address.");
      return;
    }

    const checkoutSessionId = await orderMutation.mutateAsync({
      data: cartDetails,
      shipping: shippingData,
    });
    if (checkoutSessionId) {
      const result = await redirectToCheckout(checkoutSessionId);
    }
  };

  const handleDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const id = e.target.id;
    const value = e.target.value;

    console.log(value);

    setShippingData({ ...shippingData, [id]: value });
  };
  if (Object.values(cartDetails ?? {}).length === 0)
    return router.push("/cart");

  return (
    <ShippingContainer>
      <ShippingDetails>
        <CheckoutHeader>Checkout</CheckoutHeader>
        <InputContainer>
          <Label>Email Address</Label>
          <Input
            id="email"
            onChange={handleDataChange}
            value={shippingData.email}
          />
        </InputContainer>
        <div style={{ display: "flex", width: "100%", gap: "20px" }}>
          <InputContainer>
            <Label>First Name</Label>
            <Input
              id="firstName"
              onChange={handleDataChange}
              value={shippingData.firstName}
            />
          </InputContainer>
          <InputContainer>
            <Label>Last Name</Label>
            <Input
              id="lastName"
              onChange={handleDataChange}
              value={shippingData.lastName}
            />
          </InputContainer>
        </div>
        <InputContainer>
          <Label>Address</Label>
          <Input
            id="address"
            onChange={handleDataChange}
            value={shippingData.address}
          />
        </InputContainer>
        <InputContainer>
          <Label>Country</Label>

          <CountriesSelect
            id="country"
            onChange={handleDataChange}
            value={shippingData.country}
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </CountriesSelect>
        </InputContainer>
        <div style={{ display: "flex", width: "100%", gap: "20px" }}>
          <InputContainer>
            <Label>City</Label>
            <Input
              id="city"
              onChange={handleDataChange}
              value={shippingData.city}
            />
          </InputContainer>
          <InputContainer>
            <Label>Postal Code</Label>
            <Input
              id="postalCode"
              onChange={handleDataChange}
              value={shippingData.postalCode}
            />
          </InputContainer>
        </div>
        <NextButton
          onClick={() => {
            createCheckout();
          }}
        >
          Next
        </NextButton>
      </ShippingDetails>
    </ShippingContainer>
  );
};

export default Shipping;
