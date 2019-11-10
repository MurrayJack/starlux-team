import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components";
import { IsDecember } from "../code/xmas";

const Wrapper = styled.div`
  border-radius: 50%;
  width: 100px;
  overflow: hidden;
`;

const XmasHat = styled.div`
  position: absolute;
  top:-50px;
  left: 10px;
`

const TeamLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      xmasHat: file(relativePath: { eq: "santa-hat.png" }) {
        childImageSharp {
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      logoImage: file(relativePath: { eq: "image.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <>
    <div style={{position: "relative"}}>
      <Wrapper>
        <Img fluid={data.logoImage.childImageSharp.fluid} />
      </Wrapper>
      {IsDecember() && <XmasHat><Img fixed={data.xmasHat.childImageSharp.fixed} /></XmasHat>}
    </div>
  </>
}

export default TeamLogo
