import React from "react"
import Members from "./members";
import TeamLogo from "./teamlogo";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from 'gatsby-background-image'

const StyledHeader = styled.header`
  display: grid;
  grid-template-rows: 100px 20px 10px 1fr 20px;
  grid-gap: 20px;
  height: 100%;
  box-sizing: border-box;
  color: white;
  padding: 2.5em;
  text-align: right;
  background-color: rgba(0, 0, 0, 0.4);
`

const Header = () => {
  const data = useStaticQuery(graphql`
  {
    sanityApp {
    	  moto
        email
    }

    desktop: file(relativePath: { eq: "backgound.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
      }
  }
`)

  const imageData = data.desktop.childImageSharp.fluid

  return (
    <BackgroundImage
      Tag="section"
      fluid={imageData}
      backgroundColor={`#293546`}
    >
      <StyledHeader>

        <div><TeamLogo /></div>

        <div>{data.sanityApp.moto}</div>

        <div><hr /></div>

        <div><Members /></div>

        <div>{data.sanityApp.email}</div>
      </StyledHeader>
    </BackgroundImage>
  )
}

export default Header
