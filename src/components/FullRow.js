import React from "react";
import styled, { css } from "styled-components";

const Centered = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;

  ${props =>
    props.stretch &&
    css`
      align-items: stretch;
    `};
`;

const FullRow = ({ children, ...rest }) => (
  <div {...rest}>
    <Centered>{children}</Centered>
  </div>
);

export default styled(FullRow)``;
