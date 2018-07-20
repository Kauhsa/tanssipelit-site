import React from "react";
import styled from "styled-components";

import FullRow from "./FullRow";

import seulLogo from "../images/seul-logo-varillinen-tummalle.png";
import discordLogo from "../images/discord-logo-white-trimmed.svg";
import mckylaLogo from "../images/mckyla-logo.svg";

import { colors } from "../style";
import { SectionTitle, a } from "./TextContent";

const FooterSection = styled.div`
  padding: 2rem;
  color: white;
  background-color: ${colors.purple};
  max-width: calc(100% / 3);
  flex-basis: calc(100% / 3);

  img {
    max-width: 100%;
    padding: 1rem;
  }

  a {
    ${a};
    display: block;
    color: white;
    margin-bottom: 0.5rem;
  }

  ${SectionTitle} {
    margin-bottom: 1.5rem;
  }
`;

const FooterContent = styled.div``;

const Email = ({ email, label }) => <a href={"mailto:" + email}>{email}</a>;

const Footer = () => (
  <FullRow gray>
    <FooterSection>
      <SectionTitle>Suomen Tanssipelaajat ry</SectionTitle>
      <FooterContent>
        <Email email="sihteeri@tanssipelit.fi" />
        <Email email="hallitus@tanssipelit.fi" />
        <Email email="pj@tanssipelit.fi" />
        <Email email="admin@tanssipelit.fi" />
      </FooterContent>
    </FooterSection>

    <FooterSection>
      <SectionTitle>Yhteisö</SectionTitle>
      <FooterContent>
        <a href="https://discord.me/tanssipelaajat">
          <img src={discordLogo} />
        </a>

        <a href="https://mckyla.tanssipelit.fi/">
          <img src={mckylaLogo} />
        </a>
      </FooterContent>
    </FooterSection>

    <FooterSection>
      <SectionTitle>Yhteistyökumppanit</SectionTitle>
      <FooterContent>
        <a href="http://seul.fi/">
          <img src={seulLogo} />
        </a>
      </FooterContent>
    </FooterSection>
  </FullRow>
);
export default Footer;
