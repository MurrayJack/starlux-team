module.exports = {
  siteMetadata: {
    title: `StarLux Team`,
    description: `StarRez Team Site`,
    author: `@murrayjack`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "COVERAGE",
        // This is the field under which it's accessible
        fieldName: "coverage",
        // URL to query from
        url: "https://us-central1-coverage-lux-data.cloudfunctions.net/graphql",
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'uz9llh6i',
        dataset: 'production',
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        watchMode: true,
        overlayDrafts: true
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
