import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Centered = styled.div`
  width: 100%;
  max-width: 1100px;

  ${(props) =>
    props.stretch &&
    css`
      align-items: stretch;
    `};
`;

function FullRow({ children, ...rest }) {
  return (
    <Container {...rest}>
      <Centered>{children}</Centered>
    </Container>
  );
}

export default styled(FullRow)``;
