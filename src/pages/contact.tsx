import React, { FunctionComponent } from "react";
import { Paragraph, UnderlinedLink, CenterElement } from "../components/styled";
import styled from "styled-components";
import { desktopAndLandscape } from "../utils/mediaQueries";
import { ColumnCentered } from "../components/Layouts";

interface ContactProps {}

const ParagraphWithMargins = styled(Paragraph)`
  margin: 5% 0px;

  ${desktopAndLandscape} {
    font-size: 1.5rem;
  }
`;

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
      <ParagraphWithMargins>
        For booking, interviews, or promotional materials, please contact{" "}
        <UnderlinedLink href="mailto:denounceddisgracedband@gmail.com">
          denounceddisgracedband@gmail.com
        </UnderlinedLink>
      </ParagraphWithMargins>
    </ColumnCentered>
  );
};

export default Contact;
