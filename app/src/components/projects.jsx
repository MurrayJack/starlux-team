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

        span {
            font-size: 0.8em;
        }
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

const StyledPercentage = styled.div`
    display: inline-block;
    color: white;
    background-color: ${(props) => props.BackgroundColor};
    line-height: 1.4em;
    margin: 0;
    border-radius: 3px;
    font-size: 14px;
    padding: 4px 8px;
    width: 45px;
    text-align:center;
`;

const CoverageIndicatorContainer = styled.div`
    display: grid;
    column-gap: 8px;
`;

const CoverageIndicator = ({ Initial, Value }) => {
    // 0%: #e74c3c
    // 50%: #f1c40f
    // 100%: #27ae60
    var percentColors = [
        { pct: 0.0, color: { r: 0xE7, g: 0x4C, b: 0x3C } },
        { pct: 0.5, color: { r: 0xF1, g: 0xC4, b: 0xF } },
        { pct: 1.0, color: { r: 0x27, g: 0xAE, b: 0x60 } }];

    var getColorForPercentage = function (pct) {
        for (var i = 1; i < percentColors.length - 1; i++) {
            if (pct < percentColors[i].pct) {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    }

    if (Value === undefined || Value === null) {
        return null;
    }

    return <StyledPercentage BackgroundColor={getColorForPercentage(Value / 100)}>{Initial}: {parseInt(Value)}%</StyledPercentage>
}

const Project = ({ Data, Coverage }) => {

    let coverage = {};

    if (Data.coverageCode) {
        [coverage] = Coverage.latestProductPercent.filter(e => e.product === Data.coverageCode);

        if (!coverage) coverage = {};
    }

    return <StyledProject>
        <StyledH1>
            <h1>{Data.title}<span>{coverage.patch && ` - (${coverage.patch})`}</span></h1>
            <CoverageIndicatorContainer>
                <CoverageIndicator Initial="B" Value={coverage.branches} />
                <CoverageIndicator Initial="F" Value={coverage.functions} />
                <CoverageIndicator Initial="L" Value={coverage.lines} />
                <CoverageIndicator Initial="S" Value={coverage.statements} />
            </CoverageIndicatorContainer>
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
