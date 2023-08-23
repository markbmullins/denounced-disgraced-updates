import React from "react";
import {SocialIcons} from "../components/SocialIcons";
import {HeroImage} from "../components/HeroImage";
import {ColumnCentered} from "../components/Layouts";
import {Footer} from "../components/Footer";
import SpotifyPlayer from "../components/SpotifyPlayer/SpotifyPlayer";
import {Flex1Container} from "../components/styled";


/**
 * Possible Content:
 * Band introduction
 * Latest news and updates
 * Featured music or video
 * Links to social media profiles
 */
export default function Home() {
    return (
        <main>
            <HeroImage opacity="0.4">
                <ColumnCentered>
                    <Flex1Container> <SpotifyPlayer/></Flex1Container>
                    <Footer>
                        <SocialIcons/>
                    </Footer>
                </ColumnCentered>
            </HeroImage>
        </main>
    );
};
