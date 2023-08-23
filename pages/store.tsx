import React, {FunctionComponent} from "react";
import {HeroImage} from "../components/HeroImage";
import {ColumnCentered} from "../components/Layouts";
import {HeroText} from "../components/HeroText";
import {Footer} from "../components/Footer";
import {SocialIcons} from "../components/SocialIcons";
import {Flex1Container} from "../components/styled";

interface MerchProps {
}

const Store: FunctionComponent<MerchProps> = () => {
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
    </main>;
};

export default Store;

