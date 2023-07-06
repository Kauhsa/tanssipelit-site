import React from "react";
import styled from "styled-components";
import media from "styled-media-query";
import { StaticQuery, graphql } from "gatsby";

import { colors } from "../style";
import seulLogo from "../images/seul-logo-varillinen-sininen.png";
import discordLogo from "../images/discord-logo-purple-trimmed.svg";
import mckylaLogo from "../images/mckyla-logo.svg";
import redditLogo from "../images/reddit-logo.svg";

import FullRow from "./FullRow";
import TextContent, { SectionTitle, a } from "./TextContent";
import { FormattedMessage } from "react-intl";
import EmailLink from "./EmailLink";

const presidentName = "Esa Laitinen";
const secretaryName = "Meo Ekroos";

const FooterRow = styled(FullRow)`
  position: relative;
  padding: 1rem;
  color: ${colors.purple};

  ${media.lessThan("medium")`
    border-top: 5px solid rgba(0, 0, 0, 0.01);
  `};

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
    background-position: center bottom;
    opacity: 0.02;
    z-index: -1;
  }
`;

const FooterContainer = styled.div`
  ${media.greaterThan("medium")`
    display: flex;
  `};

  width: 100%;
  justify-content: space-between;
`;

const FooterSection = styled.div`
  padding: 1rem;
  flex-basis: calc(100% / 3 - 1rem);

  img {
    max-width: 100%;
    padding: 1rem;
  }

  a {
    display: block;
  }

  ${SectionTitle} {
    margin-bottom: 1.5rem;
  }
`;

const Email = ({ emailPrefix, name, title }) => (
  <TextContent>
    <p>
      {(name || title) && <strong>{name || title}</strong>}
      {name && title && ", "}
      {name && title && <span>{title}</span>}
      <EmailLink prefix={emailPrefix} />
    </p>
  </TextContent>
);

const Footer = () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
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
      <FooterRow background={data.background.childImageSharp.fixed.src}>
        <FooterContainer>
          <FooterSection>
            <SectionTitle>
              <FormattedMessage id="finnishDanceGamersAssociation" />
            </SectionTitle>
            <div>
              <Email
                title={<FormattedMessage id="president" />}
                name={presidentName}
                emailPrefix="pj"
              />
              <Email
                title={<FormattedMessage id="secretary" />}
                name={secretaryName}
                emailPrefix="sihteeri"
              />
              <Email
                title={<FormattedMessage id="board" />}
                emailPrefix="hallitus"
              />
              <Email
                title={<FormattedMessage id="admin" />}
                emailPrefix="admin"
              />
            </div>
          </FooterSection>

          <FooterSection>
            <SectionTitle>
              <FormattedMessage id="community" />
            </SectionTitle>
            <div>
              <a href="https://discord.me/tanssipelaajat">
                <img src={discordLogo} />
              </a>

              <a href="https://mckyla.tanssipelit.fi/">
                <img src={mckylaLogo} />
              </a>

              <a href="https://reddit.com/r/tanssipelit">
                <img src={redditLogo} />
              </a>
            </div>
          </FooterSection>

          <FooterSection>
            <SectionTitle>
              <FormattedMessage id="partners" />
            </SectionTitle>
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
