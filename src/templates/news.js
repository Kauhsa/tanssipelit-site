import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import Content from "../components/Content";

export default function Template({ data: { contentfulNews } }) {
  return (
    <Layout>
      <Content>
        <Helmet title={contentfulNews.title} />
        <h1>{contentfulNews.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: contentfulNews.content.childMarkdownRemark.html
          }}
        />
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
      mainImage {
        title
        file {
          url
        }
      }
    }
  }
`;
