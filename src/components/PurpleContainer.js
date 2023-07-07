import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import { StaticQuery, graphql } from "gatsby";
import { colors } from "../style";
import FullRow from "./FullRow";

const Overlay = styled.div`
  background: ${transparentize(0.03, colors.purple)};
  position: relative;
  color: white;

  &::after,
  &::before {
    content: "";
    position: absolute;
    display: block;
    background: rgba(255, 255, 255, 0.97);
    top: 0;
    height: 100%;
    width: 100vw;
  }

  &::after {
    right: 100%;
  }

  &::before {
    left: 100%;
  }
`;

const Background = styled.div`
  background-image: url("${(props) => props.backgroundImage}");
  background-position: center top;
  background-size: cover;
`;

function Container({ children, className }) {
  return (
    <StaticQuery
      query={graphql`
        query PurpleContainerQuery {
          background: file(relativePath: { eq: "background.png" }) {
            childImageSharp {
              gatsbyImageData(
                width: 1500
                jpgOptions: { progressive: true, quality: 60 }
                formats: [JPG]
              )
            }
          }
        }
      `}
      render={(data) => (
        <Background
          backgroundImage={
            data.background.childImageSharp.gatsbyImageData.images.fallback.src
          }
        >
          <FullRow>
            <Overlay className={className}>{children}</Overlay>
          </FullRow>
        </Background>
      )}
    />
  );
}

export default styled(Container)``;
