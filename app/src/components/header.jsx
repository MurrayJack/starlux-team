import React from "react"
import Members from "./members";
import TeamLogo from "./teamlogo";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby"

const StyledHeader = styled.header`
  display: grid;
  grid-template-rows: 100px 20px 10px 1fr 20px;
  grid-gap: 20px;
  height: 100%;
  box-sizing: border-box;
  background-color: #293546;
  color: white;
  padding: 2.5em;
  text-align: right;
`

const Header = () => {
  const data = useStaticQuery(graphql`
  {
    sanityApp {
    	  moto
        email
    }
  }
`)


  return <StyledHeader>
    <div><TeamLogo /></div>

    <div>{data.sanityApp.moto}</div>

    <div><hr /></div>

    <div><Members /></div>

    <div>{data.sanityApp.email}</div>

  </StyledHeader>
}

export default Header
