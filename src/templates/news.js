import { graphql } from "gatsby";
import styled from "styled-components";
import React from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";

import Layout from "../components/Layout";
import Content from "../components/Content";

const Ingress = styled.div`
  & > * {
    font-weight: bold;
  }
`;

const Post = styled.article`
  margin-top: 8rem;
`;

export default function Template({ data: { contentfulNews } }) {
  return (
    <Layout>
      <Content>
        <Post>
          <Img fluid={contentfulNews.mainImage.fluid} />
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
        </Post>
      </Content>
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
