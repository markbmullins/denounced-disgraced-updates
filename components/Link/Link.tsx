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
    underlined?: boolean
}

export const Link = ({title, url, newTab, underlined}: LinkProps) => {
    return (<StyledLink key={url}>
        {newTab || url.includes("http") ?
            <a target="_blank" href={url} rel="noopener noreferrer"
               style={{textDecoration: underlined ? "underline" : "none"}}>{title}</a> :
            <NextLink href={url}>{title}</NextLink>}
    </StyledLink>)
}