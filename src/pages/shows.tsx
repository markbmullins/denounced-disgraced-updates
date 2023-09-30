import React, {FunctionComponent} from "react";
import {ColumnCentered} from "../components/Layouts";
import {Link} from "../components/Link";
import styled from "styled-components";
import {desktopAndLandscape} from "../utils/mediaQueries";

interface ShowsProps {
}

const StyledLinksContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  font-family: Bruno;

  li {
    margin: 0.5rem 0;
  }
`;

const Header = styled.h1`
  font-size: 2rem;
  white-space: nowrap;
  margin-top: 10vh;
  margin-bottom: 5vh;

  ${desktopAndLandscape} {
    font-size: 3rem;
  }
`;


const Shows: FunctionComponent<ShowsProps> = () => {
    const shows = [
        {
            date: "10/13/2023",
            location: "Trolly Pub",
            link: "",
        },
    ];

    return (
        <ColumnCentered>
            <StyledLinksContainer>
                <Header>Upcoming Shows</Header>
                {shows.map((show) => (
                    <Link
                        newTab
                        underlined
                        key={show.date}
                        title={`${show.date} : ${show.location}`}
                        url={show.link}
                    />
                ))}
            </StyledLinksContainer>
        </ColumnCentered>
    );
};

export default Shows;
