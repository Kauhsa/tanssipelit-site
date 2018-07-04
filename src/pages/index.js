import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import IndexHeader from "../components/IndexHeader";
import Content from "../components/Content";
import TextContent from "../components/TextContent";

const Index = ({ data }) => (
  <Layout>
    <IndexHeader />
    <Content>
      <TextContent
        dangerouslySetInnerHTML={{
          __html:
            data.contentfulSettings.frontPageContent.childMarkdownRemark.html
        }}
      />
    </Content>
  </Layout>
);

export const pageQuery = graphql`
  query IndexQuery {
    contentfulSettings {
      frontPageContent {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

export default Index;
