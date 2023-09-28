import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

const CartSubtotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 2px;
  border-color: white;
  border-style: solid;
  font-size: 20px;
  font-family: Bruno;
`;

const LinkContent = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Subtotal = ({
  formattedTotalPrice,
}: {
  formattedTotalPrice: string | undefined;
}) => {
  return (
    <CartSubtotal>
      <Link href="/store">
        <LinkContent>
          <MoveLeft />
          <>Continue Shopping</>
        </LinkContent>
      </Link>
      <p> Subtotal {formattedTotalPrice || formatCurrency(0)}</p>
    </CartSubtotal>
  );
};

export default Subtotal;
