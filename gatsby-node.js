const path = require("path");
const { newsLink } = require("./src/links");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const newsTemplate = path.resolve(`src/templates/news.js`);

  const { errors, data } = await graphql(`
    {
      allContentfulNews(limit: 1000) {
        edges {
          node {
            id
            title
            slug
            content {
              childMarkdownRemark {
                html
              }
            }
            mainImage {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  data.allContentfulNews.edges.forEach(({ node }) => {
    createPage({
      path: newsLink(node.slug),
      component: newsTemplate,
      context: {
        id: node.id
      }
    });
  });
};
