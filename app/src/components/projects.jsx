import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 2.5em;
  box-sizing: border-box;
  height: 100vh;
  overflow: scroll;
`

const StyledH1 = styled.h1`
    padding: 0;
    margin: 0;
    font-size: 1.5em;
    border-bottom: 1px solid currentColor;
`;

const StyledProject = styled.div`
    display: grid;
    grid-template-rows: 40px auto auto auto;
    margin-bottom: 2em;
`;

const StyledHr = styled.hr`
    color: deeppink;
    background-color: deeppink;
`

const StyledVersion = styled.li`
    display: inline-block;
    background-color: #e3e6e6;
    line-height: 1.4em;
    margin: 4px;
    border-radius: 3px;
    font-size: 14px;

    > a {
        display: inline-block;
        text-decoration: none;
        color: currentColor;
        padding: 4px 10px;
    }

    &:hover {
        background-color: rgb(71, 160, 183);;
        color: white;
    }
`

const Project = ({ Data }) =>
    <StyledProject>
        <StyledH1>{Data.title}</StyledH1>
        <p>{Data.description}</p>
        <ul>{Data.versions.map((e) => <StyledVersion><a target="_new" href={e.url}>{e.version}</a></StyledVersion>)}</ul>
        <StyledHr />
    </StyledProject>


const Projects = () => {
    const data = useStaticQuery(graphql`
        {
            allSanityProject {
                nodes {
                    title
          	        description
          	        versions {
                        version
                        url
                    }
                }
            }
        }    
    `);

    return (
        <StyledHeader>
            {data.allSanityProject.nodes.map((e) => <Project Data={e} />)}
        </StyledHeader>)

}

export default Projects;
