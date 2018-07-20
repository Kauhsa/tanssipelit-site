import React from "react";
import { graphql } from "gatsby";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import IndexHeader from "../components/IndexHeader";
import Content from "../components/Content";
import TextContent from "../components/TextContent";

const Index = ({ data }) => (
  <Layout headerAbsolute={true} headerTransparentUnfixed={true}>
    <IndexHeader />
    <FullRow>
      <div className="col-xs-12">
        <Content>
          <TextContent
            dangerouslySetInnerHTML={{
              __html:
                data.contentfulSettings.frontPageContent.childMarkdownRemark
                  .html
            }}
          />
        </Content>
      </div>
    </FullRow>
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
