import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { StaticQuery } from "gatsby";

const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
`;

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
        />
        <Container>{children}</Container>
      </>
    )}
  />
);
