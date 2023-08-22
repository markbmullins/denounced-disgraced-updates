import styled from "styled-components";
import NextLink from "next/link";

const StyledLink = styled.li`
  margin: 5px 10px;
  position: relative;
  display: inline-block;

  a:hover {
    color: #cccccc;
  }

  a:hover::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 1px;
    width: 100%;
    border-radius: 0;
    background-color: white;
  }
`;

interface LinkProps {
    title: string,
    url: string,
    newTab?: boolean
}

export const Link = ({title, url, newTab}: LinkProps) => {
    return (<StyledLink key={url}>
        {newTab ?
            <a target="_blank" href={url} rel="noopener noreferrer">{title}</a> :
            <NextLink href={url}>{title}</NextLink>}
    </StyledLink>)
}