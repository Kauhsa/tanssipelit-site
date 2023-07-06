import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import IndexHeader from "../components/IndexHeader";
import Content from "../components/Content";
import TextContent from "../components/TextContent";
import { injectIntl } from "react-intl";

import logoPurpleBg from "../images/stp_logo_purple_background.png";

const SmallHeaders = styled(TextContent)`
  h1,
  h2,
  h3 {
    font-weight: 900;
    letter-spacing: 0;
  }

  h1 {
    text-transform: none;
  }
`;

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
            <meta name="og:image" content={logoPurpleBg} />
          </Helmet>
          <IndexHeader />
          <FullRow>
            <Content>
              <SmallHeaders
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
