module.exports = {
  siteMetadata: {
    title: "Tanssipelit.fi"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `jt8agxvntamh`,
        accessToken: `33b72bc053f88d3779c8d2d52608ff4f369bf1c7ae60a8127e653e736379214a`
      }
    },

    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        // Add any options here
      }
    },

    "gatsby-plugin-netlify"
  ]
};
