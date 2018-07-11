import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

import DateTime from "./DateTime";
import TextContent from "./TextContent";

const Content = styled.div`
  display: block;
  position: relative;
  height: 100%;

  .stretch {
    height: 100%;
  }
`;

const ItemContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
  color: white;
`;

const Text = TextContent.extend`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  line-height: 1;
  color: white;

  h1,
  h2,
  h3,
  ${DateTime}, p {
    margin: 0 0 1rem 0;
  }

  ${DateTime} {
    display: block;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 0 1rem 0;
  }

  *:last-child {
    margin: 0;
  }
`;

const TextImage = ({ fluid, children }) => (
  <Content>
    <Img fluid={fluid} className="stretch" outerWrapperClassName="stretch" />
    <ItemContent>
      <Text>{children}</Text>
    </ItemContent>
  </Content>
);

export default TextImage;
