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

const StyledContent = styled.div`
    padding: 1em;

    > p {
        font-size: 16px;
        margin-bottom: 3em;
    }
`;

const StyledH1 = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid #e7e7e7;
    align-items: center;
    padding: 1em;

    > h1 {
        padding: 0;
        margin: 0;
        font-size: 1.5em;
    }

    > div {
        display: grid;
        grid-template-columns: auto auto auto auto;
    }
`;

const StyledProject = styled.div`
    display: grid;
    grid-template-rows: auto auto auto auto;
    margin-bottom: 2em;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 1px #e7e7e7;
`;


const StyledVersion = styled.li`
    display: inline-block;
    background-color: #e3e6e6;
    line-height: 1.4em;
    margin: 4px 8px 4px 0;
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

const StyledPercentageGood = styled.div`
    display: inline-block;
    background-color: #50B83C;
    color: white;
    line-height: 1.4em;
    margin: 4px;
    border-radius: 3px;
    font-size: 14px;
    padding: 4px 8px;
`

const StyledPercentageOk = styled.div`
    display: inline-block;
    background-color: #e7b416;
    color: white;
    line-height: 1.4em;
    margin: 4px 0 4px 8px;
    border-radius: 3px;
    font-size: 14px;
    padding: 4px 8px;
    width: 45px;
    text-align:center;
`

const StyledPercentageBad = styled.div`
    display: inline-block;
    background-color: #cc3232;
    color: white;
    line-height: 1.4em;
    margin: 4px 0 4px 8px;
    border-radius: 3px;
    font-size: 14px;
    padding: 4px 8px;
    width: 45px;
    text-align:center;
`

const CoverageIndicator = ({ Initial, Value }) => {
    if (Value === undefined || Value === null) {
        return null;
    }

    if (Value < 80 && Value > 60) {
        return Value && <StyledPercentageOk>{Initial}: {parseInt(Value)}%</StyledPercentageOk>
    }
    else if (Value > 80) {
        return <StyledPercentageGood>{Initial}: {parseInt(Value)}%</StyledPercentageGood>
    } else {
        return <StyledPercentageBad>{Initial}: {parseInt(Value)}%</StyledPercentageBad>
    }
}

const Project = ({ Data, Coverage }) => {

    let coverage = {};

    if (Data.coverageCode) {
        [coverage] = Coverage.latestProductPercent.filter(e => e.product === Data.coverageCode);

        if (!coverage) coverage = {};
    }

    return <StyledProject>
        <StyledH1>
            <h1>{Data.title} - {coverage.patch}</h1>
            <div>
                <CoverageIndicator Initial="B" Value={coverage.branches} />
                <CoverageIndicator Initial="F" Value={coverage.functions} />
                <CoverageIndicator Initial="L" Value={coverage.lines} />
                <CoverageIndicator Initial="S" Value={coverage.statements} />
            </div>
        </StyledH1>

        <StyledContent>
            <p>{Data.description}</p>
            <ul>{Data.versions.map((e) => <StyledVersion><a target="_new" href={e.url}>{e.version}</a></StyledVersion>)}</ul>
        </StyledContent>
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
