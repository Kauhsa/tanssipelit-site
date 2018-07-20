import React from "react";
import styled from "styled-components";

import FullRow from "./FullRow";
import Content from "./Content";
import TextContent from "./TextContent";

import seulLogo from "../images/seul.png";

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  img {
    margin: 2rem;
    max-width: 100%;
    height: 6rem;
  }
`;

const Email = ({ email, label }) => (
  <div>
    <a href={"mailto:" + email}>{email}</a>
  </div>
);

const Footer = () => (
  <FullRow gray>
    <FooterContent className="col-xs-12 col-md-6">
      <Content>
        <TextContent>
          <h3>Suomen Tanssipelaajat ry</h3>
          <Email label="Sihteeri" email="sihteeri@tanssipelit.fi" />
          <Email label="Hallitus" email="hallitus@tanssipelit.fi" />
          <Email label="Puheenjohtaja" email="pj@tanssipelit.fi" />
          <Email label="Ylläpito" email="admin@tanssipelit.fi" />
        </TextContent>
      </Content>
    </FooterContent>
    <FooterContent className="col-xs-12 col-md-6">
      <a href="http://seul.fi/" target="_blank" rel="noopener noreferrer">
        <img src={seulLogo} />
      </a>
    </FooterContent>
  </FullRow>
);
export default Footer;
