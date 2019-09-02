import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 2.5em;
  box-sizing: border-box;
  height: calc(100vh - 5em);
  overflow: scroll;
`



const Project = ({ Data }) =>
    <>
        <div>
            <h1>{Data.title}</h1>
            <p>{Data.description}</p>
        </div>
        <hr />
    </>

const Projects = () => {
    const data = useStaticQuery(graphql`
        {
            allSanityProject {
                nodes {
                    title
          	        description
          	        url
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
