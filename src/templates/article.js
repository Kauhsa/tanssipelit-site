import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import Layout from "../components/Layout";
import Content from "../components/Content";

export default function Template({ data: { contentfulArticle } }) {
  return (
    <Layout>
      <Content>
        <Helmet title={contentfulArticle.title} />
        <h1>{contentfulArticle.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: contentfulArticle.content.childMarkdownRemark.html
          }}
        />
      </Content>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ArticleById($id: String!) {
    contentfulArticle(id: { eq: $id }) {
      id
      title
      slug
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
