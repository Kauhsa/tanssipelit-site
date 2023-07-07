import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";
import Headroom from "react-headroom";
import { FaBars } from "react-icons/fa";
import styled, { css } from "styled-components";
import media from "styled-media-query";
import { injectIntl, FormattedMessage } from "react-intl";
import { transparentize, lighten, darken } from "polished";

import FullRow from "./FullRow";
import { nodesWithLocale } from "./Intl";

import { articleLink } from "../links";
import { colors } from "../style";
import stpLogo from "../images/stp_logo_slim.png";

import fiFlag from "../images/fi.svg";
import enFlag from "../images/gb.svg";

export const headerHeight = "5rem";

const headerBackground = transparentize(0.05, colors.purple);

const HeaderContainer = styled(Headroom)`
  ${(props) =>
    props.$absolute &&
    css`
      position: absolute;
    `};

  left: 0;
  right: 0;

  .headroom--unfixed header {
    background-color: ${transparentize(1, colors.purple)}};
  }

  header {
    width: 100%;
    display: flex;
    height: ${headerHeight};
    transition: background-color 250ms;
    background-color: ${headerBackground};
    justify-content: stretch;

    #logo {
      display: block;
      margin: 1.5rem 1rem 1.5rem 2rem;
      flex-grow: 1;
      background-image: url('${stpLogo}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 0 center;
    }

    nav {
      margin-right: 2rem;
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;

      ul li {
        display: inline-block;
        margin-left: 2rem;
        
        a {
          color: #fff;
          text-decoration: none;
          display: block;
          text-align: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0);
        
          &:hover {
            border-bottom: 1px solid #fff;
          }

          &.active {
            font-weight: 900;
          }
        }
      }
    }

    ${media.lessThan("medium")`
      nav {
        float: none;
        display: block;
        position: fixed;
        top: ${headerHeight};
        width: 100%;
        background: ${transparentize(-1, darken(0.01, headerBackground))};
        
        ul {
          li {
            margin: 0;
            display: block;

            &:hover {
              background-color: ${lighten(0.1, headerBackground)}
            }
            
            a {
              padding: 1rem 0;
              border: none !important;
            }
          }
        }
      }
      
      .hidden-mobile {
        display: none;
      }
    }
  `}
`;

const MenuIcon = styled.a`
  display: none;
  float: right;
  height: 100%;
  align-items: center;
  cursor: pointer;
  padding: 0 2rem;
  user-select: none;

  ${media.lessThan("medium")`
    display: flex;
  `};

  svg {
    height: 2rem;
    width: 2rem;
    color: white;
  }
`;

const FlagContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  user-select: none;
`;

const Flag = styled.img`
  border-radius: 0.1rem;
  width: 2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const defaultLocaleUrls = {
  fi: "/",
  en: "/en",
};

const Header = (props) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      allContentfulSettings {
        edges {
          node {
            node_locale
            navigation {
              id
              title
              slug
              node_locale
            }
          }
        }
      }
    }
  `);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const frontPageUrl = props.intl.locale === "fi" ? "/" : "/en";

  const { locale } = props.intl;

  const { navigation } = nodesWithLocale(
    locale,
    data.allContentfulSettings.edges
  )[0].node;

  const otherLocale = locale === "fi" ? "en" : "fi";
  const flagImage = otherLocale === "fi" ? fiFlag : enFlag;
  const flagUrl =
    (props.localeUrls && props.localeUrls[otherLocale]) ||
    defaultLocaleUrls[otherLocale];

  return (
    <HeaderContainer $absolute={props.absolute}>
      <FullRow>
        <header>
          <Link id="logo" to={frontPageUrl} />
          <MenuIcon
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen((open) => !open);
            }}
          >
            <FaBars />
          </MenuIcon>
          <nav className={mobileMenuOpen ? undefined : "hidden-mobile"}>
            <ul>
              <li>
                <Link
                  activeClassName="active"
                  to={frontPageUrl}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FormattedMessage id="frontPage" />
                </Link>
              </li>

              {navigation.map((link) => (
                <li key={link.id}>
                  <Link
                    activeClassName="active"
                    to={articleLink(link.slug, link.node_locale)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <FlagContainer>
            <Link to={flagUrl}>
              <Flag src={flagImage} />
            </Link>
          </FlagContainer>
        </header>
      </FullRow>
    </HeaderContainer>
  );
};

export default injectIntl(Header);
