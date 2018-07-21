import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import Intl from "../components/Intl";
import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import TextContent from "../components/TextContent";

export default function Template({ data: { contentfulArticle } }) {
  return (
    <Intl locale={contentfulArticle.node_locale}>
      <Layout>
        <FullRow>
          <Content>
            <Helmet title={contentfulArticle.title}>
              <meta name="og:title" content={contentfulArticle.title} />
              <meta name="og:type" content="article" />
            </Helmet>
            <TextContent
              dangerouslySetInnerHTML={{
                __html: contentfulArticle.content.childMarkdownRemark.html
              }}
            />
          </Content>
        </FullRow>
      </Layout>
    </Intl>
  );
}

export const pageQuery = graphql`
  query ArticleById($id: String!) {
    contentfulArticle(id: { eq: $id }) {
      id
      title
      slug
      node_locale
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
