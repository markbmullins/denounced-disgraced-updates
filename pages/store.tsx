import React, {FunctionComponent} from "react";
import {HeroImage} from "../components/HeroImage";
import {ColumnCentered} from "../components/Layouts";
import {HeroText} from "../components/HeroText";
import {Footer} from "../components/Footer";
import {SocialIcons} from "../components/SocialIcons";
import localFont from "next/font/local";

interface MerchProps {
}

const font = localFont({src: "./BrunoAceSC-Regular.ttf"});

const Store: FunctionComponent<MerchProps> = () => {
    return <main className={font.className}>
        <HeroImage opacity="0.4">
            <ColumnCentered>
                <HeroText>
                    Coming soon...
                </HeroText>
                <Footer>
                    <SocialIcons/>
                </Footer>
            </ColumnCentered>

        </HeroImage>
    </main>
};

export default Store;

