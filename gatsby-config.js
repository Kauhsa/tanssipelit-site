module.exports = {
  siteMetadata: {
    title: "Tanssipelit.fi"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `jt8agxvntamh`,
        accessToken: `33b72bc053f88d3779c8d2d52608ff4f369bf1c7ae60a8127e653e736379214a`
      }
    },

    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1100
            }
          }
        ]
      }
    },

    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        // Add any options here
      }
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-10310459-1",
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: []
      }
    },

    "gatsby-plugin-netlify"
  ]
};
