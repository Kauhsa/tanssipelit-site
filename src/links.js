/* eslint no-undef: "off" */

// this is used from ../gatsby-node.js, so careful with fancy syntax

module.exports = {
  newsLink: (slug, locale) =>
    locale === "fi" ? `/uutiset/${slug}/` : `/news/${slug}/`,

  articleLink: (slug, locale) =>
    locale === "fi" ? `/${slug}/` : `/en/${slug}/`,
};
