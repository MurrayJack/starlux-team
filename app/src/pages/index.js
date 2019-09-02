import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/projects";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
  
    <Projects />

  </Layout>
)

export default IndexPage
