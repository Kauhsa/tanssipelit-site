import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import { newsLink } from "../links";

import "flexboxgrid/css/flexboxgrid.min.css";
import "./index.css";

const NewsItem = ({ summary, title, slug }) => (
  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
    <Link to={newsLink(slug)}>
      <div className="image-wrapper">
        <img alt="" src="images/animu1.jpg" />
      </div>
    </Link>
    <div className="bordered-content">
      <Link to={newsLink(slug)}>
        <h4>{title}</h4>
      </Link>
      <p dangerouslySetInnerHTML={{ __html: summary }} />
      <Link to={newsLink(slug)} className="primary">
        Lue lisää
      </Link>
    </div>
  </div>
);

const News = () => (
  <StaticQuery
    query={graphql`
      query LatestNewsQuery {
        pages: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 3
        ) {
          edges {
            node {
              html
              frontmatter {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={data => (
      <section className="content grey">
        <div className="container center">
          <div className="row" id="news">
            {data.pages.edges.map(({ node }, i) => (
              <NewsItem
                key={i}
                summary={node.html}
                title={node.frontmatter.title}
                slug={node.frontmatter.slug}
              />
            ))}
          </div>
        </div>
      </section>
    )}
  />
);

export default News;
