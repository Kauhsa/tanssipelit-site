import styled from "styled-components";
import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import { TiCalendar, TiNews } from "react-icons/lib/ti";

import { newsLink } from "../links";

import DateTime from "./DateTime";

import "flexboxgrid/css/flexboxgrid.min.css";
import "./index.css";

const HeaderRow = styled.div.attrs({
  className: "row"
})`
  align-items: stretch;
`;

const Content = styled(Link)`
  display: block;
  position: relative;
  height: 100%;

  .stretch {
    height: 100%;
  }
`;

const ItemContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
  color: white;
`;

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: white !important;

  h2 {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  ${DateTime} {
    display: block;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const HighlightNewsItem = ({
  node: { summary, title, slug, mainImage, createdAt }
}) => (
  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
    <Content to={newsLink(slug)}>
      <Img
        fluid={mainImage.fluid}
        className="stretch"
        outerWrapperClassName="stretch"
      />
      <ItemContent>
        <Text>
          <h2>{title}</h2>
          <DateTime dateTime={createdAt} />
          <div
            dangerouslySetInnerHTML={{
              __html: summary.childMarkdownRemark.html
            }}
          />
        </Text>
      </ItemContent>
    </Content>
  </div>
);

const SideContent = styled.aside.attrs({
  className: "col-lg-4 col-md-4 col-sm-4 col-xs-12"
})`
  padding: 2rem;

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;

    svg {
      vertical-align: text-bottom !important;
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  ul {
    margin-bottom: 2rem;
    border-left: 3px solid #3a2a6c;
  }
`;

const SideContentItem = styled(({ to, className, children }) => (
  <li className={className}>
    <Link to={to}>{children}</Link>
  </li>
))`
  list-style-type: none;
  display: block;

  a {
    text-decoration: none;
    display: block;
    padding: 0.75rem;
    color: #111111;
    font-weight: 500;

    ${DateTime} {
      display: block;
      margin-bottom: 0.33rem;
      color: rgba(0, 0, 0, 0.5);
    }

    background-color: rgba(255, 255, 255, 0.1);
  }

  &:nth-child(odd) {
    a {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

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
              createdAt
              summary {
                childMarkdownRemark {
                  html
                }
              }
              mainImage {
                fluid(maxWidth: 1000, maxHeight: 600) {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const [mostRecentNews, ...otherNews] = data.allContentfulNews.edges;

      return (
        <section className="content grey">
          <div className="container center">
            <HeaderRow>
              <HighlightNewsItem node={mostRecentNews.node} />

              <SideContent>
                <h2>
                  <TiCalendar /> Tulevat tapahtumat:
                </h2>
                <ul>
                  <SideContentItem>
                    <DateTime format="dd D.M.YYYY" dateTime="01-01-2018" />{" "}
                    Staminaleiri
                  </SideContentItem>
                  <SideContentItem>
                    <DateTime format="dd D.M.YYYY" dateTime="01-01-2018" />{" "}
                    Avoimet ovet
                  </SideContentItem>
                  <SideContentItem>
                    <DateTime format="dd D.M.YYYY" dateTime="01-01-2018" />{" "}
                    Avoimet ovet
                  </SideContentItem>
                </ul>

                <h2>
                  <TiNews /> Muut uutiset:
                </h2>
                <ul>
                  {otherNews.map(({ node }, i) => (
                    <SideContentItem to={newsLink(node.slug)} key={i}>
                      <DateTime dateTime={node.createdAt} /> {node.title}
                    </SideContentItem>
                  ))}
                </ul>
              </SideContent>
            </HeaderRow>
          </div>
        </section>
      );
    }}
  />
);

export default News;
