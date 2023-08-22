import React, {FunctionComponent} from "react";
import {HeroImage} from "../components/HeroImage";
import {ColumnCentered} from "../components/Layouts";
import {HeroText} from "../components/HeroText";
import localFont from "next/font/local";
import {Footer} from "../components/Footer";
import {SocialIcons} from "../components/SocialIcons";

interface PressProps {
}

const font = localFont({src: "./BrunoAceSC-Regular.ttf"});

/**
 * Reviews and features from music blogs and publications
 * Interviews with band members
 * Awards and accolades
 * Press kit download link
 */
const Press: FunctionComponent<PressProps> = () => {
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

export default Press;


