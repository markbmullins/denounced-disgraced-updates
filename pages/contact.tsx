import React, { FunctionComponent } from "react";
import { ColumnCentered } from "../components/Layouts";
import { HeroText } from "../components/HeroText";

interface ContactProps {}

/**
 * Possible Content:
 * Band history and formation
 * Members' bios and photos
 * Description of music style and influences
 * Achievements and past performances
 */
const Contact: FunctionComponent<ContactProps> = () => {
  return (
    <ColumnCentered>
      <HeroText>Coming soon...</HeroText>
    </ColumnCentered>
  );
};

export default Contact;
