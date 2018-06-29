import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import Content from "../components/Content";

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <Content>
        <Helmet title={post.frontmatter.title} />
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  );
}

export const pageQuery = graphql`
  query NewsPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
