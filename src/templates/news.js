import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import TextImage from "../components/TextImage";
import DateTime from "../components/DateTime";
import TextContent from "../components/TextContent";
import Intl from "../components/Intl";

export default function Template({ data: { contentfulNews } }) {
  return (
    <Intl locale={contentfulNews.node_locale}>
      <Helmet title={contentfulNews.title}>
        <meta name="og:title" content={contentfulNews.title} />
        <meta name="og:type" content="article" />
        <meta name="og:image" content={contentfulNews.mainImage.file.url} />
        <meta
          name="og:article:published_time"
          content={contentfulNews.createdAt}
        />
        <meta
          name="og:description"
          content={contentfulNews.summary.childMarkdownRemark.rawMarkdownBody}
        />
        <meta
          name="description"
          content={contentfulNews.summary.childMarkdownRemark.rawMarkdownBody}
        />
      </Helmet>
      <Layout>
        <FullRow>
          <div>
            <TextImage fluid={contentfulNews.mainImage.fluid}>
              <h1>{contentfulNews.title}</h1>
              <DateTime dateTime={contentfulNews.createdAt} />
            </TextImage>
            <Content>
              <div>
                <TextContent
                  dangerouslySetInnerHTML={{
                    __html: contentfulNews.content.childMarkdownRemark.html
                  }}
                />
              </div>
            </Content>
          </div>
        </FullRow>
      </Layout>
    </Intl>
  );
}

export const pageQuery = graphql`
  query NewsPostById($id: String!) {
    contentfulNews(id: { eq: $id }) {
      node_locale
      id
      title
      slug
      createdAt
      summary {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      content {
        childMarkdownRemark {
          html
        }
      }
      mainImage {
        file {
          url
        }
        fluid(maxWidth: 1200, maxHeight: 600) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
