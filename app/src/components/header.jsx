import React from "react"
import Members from "./members";
import TeamLogo from "./teamlogo";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from 'gatsby-background-image'

const StyledHeader = styled.header`
  display: grid;
  grid-template-rows: 100px auto 10px 1fr 20px;
  grid-gap: 20px;
  height: 100%;
  box-sizing: border-box;
  color: white;
  padding: 2.5em;
  background-color: rgba(0, 0, 0, 0.4);
`

const MailToLink = styled.a`
  color: white;
  font-size: 1.1em;
  text-decoration: none;
  text-transform: lowercase;

  &:hover {
    text-decoration: underline;
  }
`;

const Align = styled.div`
  text-align: center;
  display: grid;
  justify-content: center;

  @media (min-width: 920px) {
    text-align: right;
    display: grid;
    justify-content: right;
  }
`;

const Header = () => {
  const data = useStaticQuery(graphql`
  {
    sanityApp {
    	  moto
        email
    }

    desktop: file(relativePath: { eq: "background.jpg" }) {
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

        <Align><TeamLogo /></Align>

        <Align><p>{data.sanityApp.moto}</p></Align>

        <div><hr /></div>

        <Align><Members /></Align>

        <Align><MailToLink href="mailto:data.sanityApp.email">{data.sanityApp.email}</MailToLink></Align>
      </StyledHeader>
    </BackgroundImage>
  )
}

export default Header
