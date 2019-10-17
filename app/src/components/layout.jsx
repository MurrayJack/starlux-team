import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components";
import Header from "./header"
import "./layout.css"

const Wrapper = styled.div`
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto 1fr;
    background-color: #f7f7f7;

    @media (min-width: 920px) {
      grid-template-rows: unset;
      grid-template-columns: 500px 1fr;
    }
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Wrapper>
      <Header siteTitle={data.site.siteMetadata.title} />

      <main>{children}</main>
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout