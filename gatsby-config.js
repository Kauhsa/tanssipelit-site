module.exports = {
  siteMetadata: {
    title: "Tanssipelit.fi"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/news`,
        name: "news"
      }
    },

    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        // Add any options here
      }
    }
  ]
};
