import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import News from "../components/News";
import Content from "../components/Content";

const Index = ({ data }) => (
  <Layout>
    <News />
    <Content>
      <div
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
