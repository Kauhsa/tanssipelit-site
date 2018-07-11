import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  ${props =>
    props.gray &&
    css`
      background-color: #f6f6f6;
    `};
`;

const Centered = styled.div.attrs({
  className: "container"
})`
  margin: 0 auto;

  ${props =>
    props.stretch &&
    css`
      align-items: stretch;
    `};
`;

const FullRow = ({ children, ...rest }) => (
  <Container {...rest}>
    <Centered>
      <div className="row">{children}</div>
    </Centered>
  </Container>
);

export default styled(FullRow)``;
