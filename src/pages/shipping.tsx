import React, { useMemo, useState, ChangeEvent } from "react";
import styled from "styled-components";
import countryList from "react-select-country-list";
import { useShoppingCart } from "use-shopping-cart";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import CartSummary from "../components/Shipping/CartSummary";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { Button } from "../components/styled/Button";
import Newsletter from "../components/Newsletter/Newsletter";
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';

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
  border-radius: 3px;
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
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
  }
  gap: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CountriesSelect = styled.select`
  height: 40px;
  border-radius: 3px;
  border: 2px solid black;
  margin-bottom: 15px;
  width: 100%;
  padding: 5px;
`;

const NextButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-family: Bruno;
`;

const ShippingDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export type ShippingType = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
  phone: string;
};

const Shipping = () => {
  const countries = useMemo(() => countryList().getData(), []);
  const cart = useShoppingCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [shippingData, setShippingData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    phone: "",
    stateCode: "",
  });

  const { cartDetails, redirectToCheckout } = cart;

  const CartForShipping = Object.values(cartDetails ?? {}).map(
    (entry: any, index) => {
      return {
        variant_id: entry.product_data.metadata.variant_id,
        quantity: entry.quantity,
      };
    }
  );
  const CartForOrder = Object.values(cartDetails ?? {}).map(
    (entry: any, index) => {
      return {
        sync_variant_id: entry.product_data.metadata.sync_variant_id,
        quantity: entry.quantity,
      };
    }
  );

  const orderMutation = trpc.orders.stripeCheckout.useMutation();
  const shippingMutation = trpc.orders.calculateShipping.useMutation();

  const createCheckout = async () => {
    for (let key in shippingData) {
      // Check if the country is US, CA, or AU before validating the stateCode
      if (
        ["US", "CA", "AU"].includes(shippingData.country) &&
        key === "stateCode" &&
        !shippingData[key].trim()
      ) {
        toast(`Please provide a valid ${key}.`);
        return;
      } else if (key !== "stateCode" && !shippingData[key].trim()) {
        // For all other fields excluding stateCode
        toast(`Please provide a valid ${key}.`);
        return;
      }
    }

    if (!postcodeValidator(shippingData.postalCode, shippingData.country)) {
      toast("Please provide valid zip code");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(shippingData.email)) {
      toast("Please provide a valid email address.");
      return;
    }
    setIsLoading(true);

    const calculateShipping = await shippingMutation.mutateAsync({
      data: {
        recipient: {
          address1: shippingData.address,
          city: shippingData.city,
          country_code: "GE",
          state_code: "",
          zip: shippingData.postalCode,
          phone: shippingData.phone,
        },
        items: CartForShipping,
      },
    });

    console.log(calculateShipping);

    const checkoutSessionId = await orderMutation.mutateAsync({
      cartData: cartDetails,
      shipping: shippingData,
      deliveryDetails: calculateShipping[0],
      orderInfo: CartForOrder,
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

    setShippingData({ ...shippingData, [id]: value });
  };
  if (Object.values(cartDetails ?? {}).length === 0) {
    return router.push("/cart");
  }

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
        <InputContainer>
          <Label>Address</Label>
          <Input
            id="address"
            onChange={handleDataChange}
            value={shippingData.address}
          />
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
          {shippingData.country === "US" ||
          shippingData.country === "CA" ||
          shippingData.country === "AU" ? (
            <InputContainer>
              <Label>State Code</Label>
              <Input
                id="stateCode"
                onChange={handleDataChange}
                value={shippingData.stateCode}
              />
            </InputContainer>
          ) : null}
        </div>
        <InputContainer>
          <Label>phone</Label>
          <Input
            id="phone"
            onChange={handleDataChange}
            value={shippingData.phone}
          />
        </InputContainer>
        <NextButton
          active
          onClick={() => {
            createCheckout();
          }}
        >
          {isLoading ? (
            <Loader style={{ animation: "spin 5000ms infinite linear" }} />
          ) : (
            <>Next</>
          )}
        </NextButton>
      </ShippingDetails>
      <SummaryContainer>
        <CartSummary />

        <Newsletter />
      </SummaryContainer>
    </ShippingContainer>
  );
};

export default Shipping;
