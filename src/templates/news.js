import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import TextImage from "../components/TextImage";
import DateTime from "../components/DateTime";
import TextContent from "../components/TextContent";

export default function Template({ data: { contentfulNews } }) {
  return (
    <>
      <Helmet title={contentfulNews.title} />
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
    </>
  );
}

export const pageQuery = graphql`
  query NewsPostById($id: String!) {
    contentfulNews(id: { eq: $id }) {
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
        fluid(maxWidth: 1000, maxHeight: 500) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
