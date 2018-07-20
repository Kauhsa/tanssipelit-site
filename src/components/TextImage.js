import React from "react";
import styled from "styled-components";
import media from "styled-media-query";
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
  background: linear-gradient(
    180deg,
    rgba(16, 0, 65, 0) 0%,
    rgba(3, 0, 12, 0.46) 100%
  );

  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2),
    inset 0px 0px 40px rgba(0, 0, 0, 0.25);

  color: white;
`;

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  line-height: 1;
  color: white;

  ${media.lessThan("medium")`
    padding: 2rem;
  `}

  h1,
  h2,
  h3,
  ${DateTime} {
    margin: 0 0 0.75rem 0;
  }

  h1,
  h2 {
    font-weight: 900;
    font-size: 2rem;
    text-shadow: 0px 0px 20px #000000;
  }

  ${DateTime} {
    display: block;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0px 0px 20px #000000;
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
