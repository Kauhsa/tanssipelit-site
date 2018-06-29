const path = require("path");
const { newsLink } = require("./src/links");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const newsTemplate = path.resolve(`src/templates/news.js`);

  const { errors, data } = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: newsLink(node.frontmatter.slug),
      component: newsTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    });
  });
};
