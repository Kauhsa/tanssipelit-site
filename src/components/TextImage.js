import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

import DateTime from "./DateTime";

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

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: white !important;

  h1 {
    font-weight: bold;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  ${DateTime} {
    display: block;
    color: rgba(255, 255, 255, 0.8);
  }

  p {
    margin-top: 1rem;
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
