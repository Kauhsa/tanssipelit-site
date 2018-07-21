const path = require("path");
const { newsLink, articleLink } = require("./src/links");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const { errors, data } = await graphql(`
    {
      allContentfulNews(limit: 1000) {
        edges {
          node {
            id
            slug
            node_locale
          }
        }
      }

      allContentfulArticle(limit: 1000) {
        edges {
          node {
            id
            slug
            node_locale
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
      path: newsLink(node.slug, node.node_locale),
      component: path.resolve(`src/templates/news.js`),
      context: {
        id: node.id
      }
    });
  });

  data.allContentfulArticle.edges.forEach(({ node }) => {
    createPage({
      path: articleLink(node.slug, node.node_locale),
      component: path.resolve(`src/templates/article.js`),
      context: {
        id: node.id
      }
    });
  });
};
