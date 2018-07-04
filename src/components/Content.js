import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
`;

const Content = ({ children }) => (
  <section>
    <div className="container center">
      <div className="row">
        <Container className="col-xs-12">{children}</Container>
      </div>
    </div>
  </section>
);

export default Content;
