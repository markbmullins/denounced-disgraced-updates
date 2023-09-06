import React, { FunctionComponent } from "react";
import { ColumnCentered } from "../components/Layouts";
import { HeroText } from "../components/HeroText";

interface MerchProps {}

const Store: FunctionComponent<MerchProps> = () => {
  return (
    <ColumnCentered>
      <HeroText>Coming soon...</HeroText>
    </ColumnCentered>
  );
};

export default Store;
