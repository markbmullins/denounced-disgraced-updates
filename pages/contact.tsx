import React, {FunctionComponent} from "react";
import {ColumnCentered} from "../components/Layouts";
import {Heading, Paragraph, UnderlinedLink} from "../components/styled/Text";

interface ContactProps {
}

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
            <Heading>Denounced Disgraced</Heading>
            <Paragraph>
                Denounced Disgraced is an up and coming metal band from Charleston, South Carolina.
                For booking, interviews, or promotional materials, please contact <UnderlinedLink
                href="mailto:denounceddisgracedband@gmail.com">denounceddisgracedband@gmail.com</UnderlinedLink>
            </Paragraph>
        </ColumnCentered>
    );
};

export default Contact;
