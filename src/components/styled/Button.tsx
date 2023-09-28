import styled from "styled-components";

export const Button = styled.button<{ color?: string; active: boolean }>`
  min-width: 40px;
  height: 40px;
  outline: none;
  padding: 5px;
  border: 1px solid ${({ active }) => (active ? "#e12d32" : "transparent")};
  border-radius: 3px;
  background-color: ${({ color, active }) =>
    active ? "#e12d32" : color ? color : "transparent"};
  color: white;
  font-weight: 600;
  text-transform: capitalize;
`;
