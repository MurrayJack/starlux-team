import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components";

const UL = styled.ul`
    list-style: none;
    line-height: 1.8em;
    opacity: 0.8;
`;

const HR = styled.hr`
    opacity: 0.2;
`

const Members = () => {
    const data = useStaticQuery(graphql`
        {
            current: allSanityMembers(sort: {fields: order, order: ASC}, filter: {alumni: {eq: false}}) {
                nodes {
                    name
                }
            }

            alumni: allSanityMembers(sort: {fields: order, order: ASC}, filter: {alumni: {eq: true}}) {
                nodes {
                    name
                }
            }
        }    
    `);

    return (
        <>
            <UL>
                {data.current.nodes.map((e) => <li>{e.name}</li>)}
            </UL>
            <HR />
            <UL>
                {data.alumni.nodes.map((e) => <li>{e.name}</li>)}
            </UL>
        </>)
}

export default Members;