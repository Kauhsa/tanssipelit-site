import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";

import { colors } from "../style";
import seulLogo from "../images/seul-logo-varillinen-sininen.png";
import discordLogo from "../images/discord-logo-purple-trimmed.svg";
import mckylaLogo from "../images/mckyla-logo.svg";

import FullRow from "./FullRow";
import { SectionTitle, a } from "./TextContent";

const FooterRow = FullRow.extend`
  margin-top: 4rem;
  position: relative;
  padding: 1rem;
  color: ${colors.purple};

  a {
    ${a};
    color: ${colors.purple};
  }

  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url(${props => props.background});
    background-size: cover;
    background-position: center;
    opacity: 0.02;
    z-index: -1;
  }
`;

const FooterContainer = styled.div`
  display: flex;
`;

const FooterSection = styled.div`
  padding: 2rem;
  max-width: calc(100% / 3);
  flex-basis: calc(100% / 3);

  img {
    max-width: 100%;
    padding: 1rem;
  }

  a {
    display: block;
    margin-bottom: 0.5rem;
  }

  ${SectionTitle} {
    margin-bottom: 1.5rem;
  }
`;

const Email = ({ email, label }) => <a href={"mailto:" + email}>{email}</a>;

const Footer = () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        background: file(relativePath: { eq: "background.png" }) {
          childImageSharp {
            fixed(
              width: 1500
              quality: 80
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
      <FooterRow background={data.background.childImageSharp.fixed.src}>
        <FooterContainer>
          <FooterSection>
            <SectionTitle>Suomen Tanssipelaajat ry</SectionTitle>
            <div>
              <Email email="sihteeri@tanssipelit.fi" />
              <Email email="hallitus@tanssipelit.fi" />
              <Email email="pj@tanssipelit.fi" />
              <Email email="admin@tanssipelit.fi" />
            </div>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Yhteisö</SectionTitle>
            <div>
              <a href="https://discord.me/tanssipelaajat">
                <img src={discordLogo} />
              </a>

              <a href="https://mckyla.tanssipelit.fi/">
                <img src={mckylaLogo} />
              </a>
            </div>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Yhteistyökumppanit</SectionTitle>
            <div>
              <a href="http://seul.fi/">
                <img src={seulLogo} />
              </a>
            </div>
          </FooterSection>
        </FooterContainer>
      </FooterRow>
    )}
  />
);
export default Footer;
