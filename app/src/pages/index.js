import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/projects"
import * as Sentry from '@sentry/browser'

Sentry.init({ dsn: 'https://539f971cbec34ef59994fb40fb5b122c@sentry.io/1686105' });

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
  
    <Projects />

  </Layout>
)

export default IndexPage
