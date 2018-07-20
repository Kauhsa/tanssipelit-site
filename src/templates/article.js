import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import TextContent from "../components/TextContent";

export default function Template({ data: { contentfulArticle } }) {
  return (
    <Layout>
      <FullRow>
        <Content>
          <Helmet title={contentfulArticle.title} />
          <TextContent
            dangerouslySetInnerHTML={{
              __html: contentfulArticle.content.childMarkdownRemark.html
            }}
          />
        </Content>
      </FullRow>
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
