// this is used from ../gatsby-node.js, so careful with fancy syntax

const slugid = require("slugid");

module.exports = {
  newsLink: (slug, locale) =>
    locale === "fi" ? `/uutiset/${slug}/` : `/news/${slug}/`,

  articleLink: (slug, locale) =>
    locale === "fi" ? `/${slug}/` : `/en/${slug}/`,

  calendarEntryLink: (id, locale) =>
    locale === "fi"
      ? `/tapahtumat/${slugid.encode(id)}/`
      : `/events/${slugid.encode(id)}/`
};
