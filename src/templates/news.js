import { graphql } from "gatsby";
import styled from "styled-components";
import React from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";

const Ingress = styled.div`
  & > * {
    font-weight: bold;
  }
`;

export default function Template({ data: { contentfulNews } }) {
  return (
    <Layout>
      <FullRow gray>
        <div className="col-xs-12">
          <Img fluid={contentfulNews.mainImage.fluid} />
        </div>
      </FullRow>
      <FullRow>
        <div className="col-xs-12">
          <Content>
            <article>
              <Helmet title={contentfulNews.title} />
              <h1>{contentfulNews.title}</h1>
              <Ingress
                dangerouslySetInnerHTML={{
                  __html: contentfulNews.summary.childMarkdownRemark.html
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: contentfulNews.content.childMarkdownRemark.html
                }}
              />
            </article>
          </Content>
        </div>
      </FullRow>
    </Layout>
  );
}

export const pageQuery = graphql`
  query NewsPostById($id: String!) {
    contentfulNews(id: { eq: $id }) {
      id
      title
      slug
      content {
        childMarkdownRemark {
          html
        }
      }
      summary {
        childMarkdownRemark {
          html
        }
      }
      mainImage {
        fluid(maxWidth: 1200, maxHeight: 500) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
