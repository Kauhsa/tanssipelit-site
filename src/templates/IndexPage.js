import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import IndexHeader from "../components/IndexHeader";
import Content from "../components/Content";
import TextContent from "../components/TextContent";
import { injectIntl } from "react-intl";

const IndexPage = ({ intl: { locale } }) => (
  <StaticQuery
    query={graphql`
      query IndexPageQuery {
        allContentfulSettings {
          edges {
            node {
              node_locale
              frontPageContent {
                childMarkdownRemark {
                  html
                }
              }
              metaDescription {
                childMarkdownRemark {
                  rawMarkdownBody
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const node = data.allContentfulSettings.edges.find(
        edge => edge.node.node_locale === locale
      ).node;

      return (
        <Layout headerAbsolute={true} headerTransparentUnfixed={true}>
          <Helmet>
            <meta
              name="description"
              content={node.metaDescription.childMarkdownRemark.rawMarkdownBody}
            />
          </Helmet>
          <IndexHeader />
          <FullRow>
            <Content>
              <TextContent
                dangerouslySetInnerHTML={{
                  __html: node.frontPageContent.childMarkdownRemark.html
                }}
              />
            </Content>
          </FullRow>
        </Layout>
      );
    }}
  />
);

export default injectIntl(IndexPage);
