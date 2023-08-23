import React, {FunctionComponent} from "react";
import {HeroImage} from "../components/HeroImage";
import {ColumnCentered} from "../components/Layouts";
import {Link} from "../components/Link";
import styled from "styled-components";
import {Footer} from "../components/Footer";
import {SocialIcons} from "../components/SocialIcons";
import {desktopAndLandscape} from "../utils/mediaQueries";

interface ShowsProps {
}


const StyledLinksContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Bruno;


  li {
    margin: .5rem 0
  }
`

const Header = styled.h1`
  font-size: 2rem;
  margin-top: 10vh;
  margin-bottom: 5vh;
  white-space: nowrap;

  ${desktopAndLandscape} {
    font-size: 3rem;
  }
`
const Shows: FunctionComponent<ShowsProps> = () => {

    const shows = [
        {
            date: "08/27/2023",
            location: "The Ridgeville Roadhouse",
            link: "https://www.facebook.com/events/806999267554244/"
        },
        {
            date: "09/08/2023",
            location: "Music Farm",
            link: "https://www.musicfarm.com/event/metal-night/"
        },
        {
            date: "10/06/2023",
            location: "The Ridgeville Roadhouse",
            link: "https://www.facebook.com/events/2968067286662067/"
        },
        {
            date: "10/13/2023",
            location: "Trolly Pub",
            link: ""
        }]

    return <main>
        <HeroImage opacity="0.4">
            <ColumnCentered>
                <StyledLinksContainer>
                    <Header>Upcoming Shows</Header>
                    {shows.map(show =>
                        <Link newTab underlined key={show.date} title={`${show.date} : ${show.location}`}
                              url={show.link}/>
                    )}
                </StyledLinksContainer>
                <Footer>
                    <SocialIcons/>
                </Footer>
            </ColumnCentered>

        </HeroImage>
    </main>;
};

export default Shows;
