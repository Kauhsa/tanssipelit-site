import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import { newsLink } from "../links";
import Img from "gatsby-image";

import "flexboxgrid/css/flexboxgrid.min.css";
import "./index.css";

const NewsItem = ({ summary, title, slug, mainImageFluid }) => (
  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
    <Link to={newsLink(slug)}>
      <div className="image-wrapper">
        <Img fluid={mainImageFluid} />
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
        allContentfulNews(limit: 3, sort: { fields: createdAt, order: DESC }) {
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
                fluid(maxWidth: 800) {
                  ...GatsbyContentfulFluid
                }
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
            {data.allContentfulNews.edges.map(({ node }, i) => (
              <NewsItem
                key={i}
                summary={node.content.childMarkdownRemark.html}
                title={node.title}
                slug={node.slug}
                mainImageFluid={node.mainImage.fluid}
              />
            ))}
          </div>
        </div>
      </section>
    )}
  />
);

export default News;
