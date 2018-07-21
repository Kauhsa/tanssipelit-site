import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import { colors } from "../style";
import { StaticQuery, graphql } from "gatsby";
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
  background-image: url('${props => props.backgroundImage}');
  background-position: center top;
  background-size: cover;
`;

const Container = ({ children, className }) => (
  <StaticQuery
    query={graphql`
      query PurpleContainerQuery {
        background: file(relativePath: { eq: "background.png" }) {
          childImageSharp {
            fixed(
              width: 1500
              quality: 60
              toFormat: JPG
              jpegProgressive: true
            ) {
              src
            }
          }
        }
      }
    `}
    render={data => (
      <Background backgroundImage={data.background.childImageSharp.fixed.src}>
        <FullRow>
          <Overlay className={className}>{children}</Overlay>
        </FullRow>
      </Background>
    )}
  />
);

export default styled(Container)``;
