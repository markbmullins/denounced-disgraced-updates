import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styled/Button";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  border: 1px solid white;
  width: 100%;
  height: 200px;
  border-radius: 5px;

  @media screen and (max-width:768px) {
    height: 300px;
    
  }
`;
const Title = styled.h3`
  font-family: Bruno;
  font-size: 30px;
  font-weight: 700;
`;
const Input = styled.input<{ size?: string }>`
  width: 100%;
  height: 50px;
  border-radius: 3px;
  border: 2px solid black;
  padding: 10px;
  margin-bottom: 15px;
`;

const Newsletter = () => {
    const [email, setMail] = useState("");
    
    const subscribeMutation = trpc.orders.joinsNewsLetter.useMutation();


    const subscribe = async () => {
        if (!email) {
            toast("Email is required");
            return;
        }

        // Email validation pattern
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailPattern.test(email)) {
            toast("Invalid email format");
            return;
        }
      
        const sub = await subscribeMutation.mutateAsync({ email: email });
        
        if (sub) {
                        toast("Thank you for joining our newsletter!");

        }

    // Continue with your subscription logic here
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <p>
        Sign up to receive new product updates, exclusive discounts & more to
        your inbox{" "}
      </p>

      <Input placeholder="Email" value={email} onChange={(e) => {setMail(e.target.value)}} />
      <Button color="green" active={false} onClick={subscribe}>
        Subscribe
      </Button>
    </Container>
  );
};

export default Newsletter;
