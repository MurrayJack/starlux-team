import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Project = ({ Data }) => <div>{Data.title}</div>

const Projects = () => {
    const data = useStaticQuery(graphql`
        {
            allSanityProject {
                nodes {
                    title
                }
            }
        }    
    `);

    return (
        <>
            {data.allSanityProject.nodes.map((e) => <Project Data={e} />)}
        </>)

}

export default Projects;
