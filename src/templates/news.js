import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import TextImage from "../components/TextImage";
import DateTime from "../components/DateTime";
import TextContent from "../components/TextContent";

const Summary = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export default function Template({ data: { contentfulNews } }) {
  return (
    <>
      <Helmet title={contentfulNews.title} />
      <Layout>
        <FullRow gray>
          <div className="col-xs-12">
            <TextImage fluid={contentfulNews.mainImage.fluid}>
              <h1>{contentfulNews.title}</h1>
              <DateTime dateTime={contentfulNews.createdAt} />
            </TextImage>
          </div>
        </FullRow>
        <FullRow>
          <div className="col-xs-12">
            <Content>
              <Summary
                dangerouslySetInnerHTML={{
                  __html:
                    contentfulNews.summary.childMarkdownRemark.rawMarkdownBody
                }}
              />
              <TextContent
                dangerouslySetInnerHTML={{
                  __html: contentfulNews.content.childMarkdownRemark.html
                }}
              />
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
        fluid(maxWidth: 1000, maxHeight: 600) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
