import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Members = () => {
    const data = useStaticQuery(graphql`
        {
            allSanityMembers {
                nodes {
                    name
                }
            }
        }    
    `);

    return (
        <ul>
            {data.allSanityMembers.nodes.map((e) => <li>{e.name}</li>)}
        </ul>)

}

export default Members;