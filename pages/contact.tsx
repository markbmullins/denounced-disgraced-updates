import React, {FunctionComponent} from "react";
import {HeroImage} from "../components/HeroImage";
import {ColumnCentered} from "../components/Layouts";
import {HeroText} from "../components/HeroText";
import {Footer} from "../components/Footer";
import {SocialIcons} from "../components/SocialIcons";
import {Flex1Container} from "../components/styled";

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
    return <main>
        <HeroImage opacity="0.4">
            <ColumnCentered>
                <Flex1Container>
                    <HeroText>
                        Coming soon...
                    </HeroText>
                </Flex1Container>
                <Footer>
                    <SocialIcons/>
                </Footer>
            </ColumnCentered>
        </HeroImage>
    </main>
};

export default Contact;
