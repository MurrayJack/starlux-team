import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 2.5em;
  box-sizing: border-box;
  text-align: center;

  @media (min-width: 920px) {
    height: 100vh;
    overflow: scroll;
    text-align: left;
  }
`

const StyledH1 = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid currentColor;
    align-items: center;

    > h1 {
        padding: 0;
        margin: 0;
        font-size: 1.5em;
    }

    > div {
        display: grid;
        grid-template-columns: auto auto auto auto;
        grid-gap: 4px;
    }
`;

const StyledProject = styled.div`
    display: grid;
    grid-template-rows: auto auto auto auto;
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

const StyledPercentage = styled.div`
    display: inline-block;
    background-color: green;
    color: white;
    line-height: 1.4em;
    margin: 4px;
    border-radius: 3px;
    font-size: 14px;
    padding: 4px 8px;
`

const StyledPercentageBad = styled.div`
    display: inline-block;
    background-color: darkred;
    color: white;
    line-height: 1.4em;
    margin: 4px;
    border-radius: 3px;
    font-size: 14px;
    padding: 4px 8px;
`

const CoverageIndicator = ({ Initial, Value }) => {
    if (Value === undefined || Value === null || Value === 0) {
        return null;
    }

    if (Value > 80) {
        return Value && <StyledPercentage>{Initial}: {Value}%</StyledPercentage>
    } else {
        return Value && <StyledPercentageBad>{Initial}: {Value}%</StyledPercentageBad>
    }
}

const Project = ({ Data, Coverage }) => {

    let coverage = [];

    if (Data.coverageCode) {
        [coverage] = Coverage.latestProductPercent.filter(e => e.product === Data.coverageCode);
    }

    return <StyledProject>
        <StyledH1>
            <h1>{Data.title}</h1>
            <div>
                <CoverageIndicator Initial="B" Value={coverage.branches} />
                <CoverageIndicator Initial="F" Value={coverage.functions} />
                <CoverageIndicator Initial="L" Value={coverage.lines} />
                <CoverageIndicator Initial="S" Value={coverage.statements} />
            </div>
        </StyledH1>
        <p>{Data.description}</p>
        <ul>{Data.versions.map((e) => <StyledVersion><a target="_new" href={e.url}>{e.version}</a></StyledVersion>)}</ul>
        <StyledHr />
    </StyledProject>
}


const Projects = () => {
    const data = useStaticQuery(graphql`
        {
            allSanityProject {
                nodes {
                    title
                    description
                    coverageCode
          	        versions {
                        version
                        url
                    }
                }
            }

            coverage {
                latestProductPercent {
                    product
                    patch
                    branches
                    functions
                    lines
                    statements
                }
            }
        }    
    `);

    return (
        <StyledHeader>
            {data.allSanityProject.nodes.map((e) => <Project Data={e} Coverage={data.coverage} />)}
        </StyledHeader>)

}

export default Projects;
