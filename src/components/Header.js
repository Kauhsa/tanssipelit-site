import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import Headroom from "react-headroom";
import FaBars from "react-icons/lib/fa/bars";
import styled, { css } from "styled-components";
import media from "styled-media-query";

import FullRow from "./FullRow";
import { articleLink } from "../links";
import { transparentize, lighten, darken } from "polished";
import { colors } from "../style";

import stpLogo from "../images/stp_logo.png";

export const headerHeight = "9rem";

const headerBackground = transparentize(0.05, colors.purple);

const HeaderContainer = styled(Headroom)`
  ${props =>
    props.absolute &&
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
      margin: 2rem 1rem 2rem 3rem;
      flex-grow: 1;
      background-image: url('${stpLogo}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 0 center;
    }

    nav {
      margin-right: 3rem;
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
        background: ${transparentize(-1, darken(0.1, headerBackground))};
        
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

// this CAN'T be PureComponent, or activeClassName in links won't work
class Header extends React.Component {
  state = {
    mobileMenuOpen: false
  };

  handleToggleMenu = e => {
    e.preventDefault();

    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen
    });
  };

  handleHideMenu = () => {
    this.setState({
      mobileMenuOpen: false
    });
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            contentfulSettings {
              navigation {
                id
                title
                slug
              }
            }
          }
        `}
        render={data => (
          <HeaderContainer absolute={this.props.absolute}>
            <FullRow>
              <header>
                <Link id="logo" to="/" />
                <MenuIcon onClick={this.handleToggleMenu}>
                  <FaBars />
                </MenuIcon>
                <nav
                  className={
                    this.state.mobileMenuOpen ? undefined : "hidden-mobile"
                  }
                >
                  <ul>
                    <li>
                      <Link
                        activeClassName="active"
                        to="/"
                        exact
                        onClick={this.handleHideMenu}
                      >
                        Etusivu
                      </Link>
                    </li>

                    {data.contentfulSettings.navigation.map(link => (
                      <li key={link.id}>
                        <Link
                          activeClassName="active"
                          to={articleLink(link.slug)}
                          onClick={this.handleHideMenu}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}

                    <li>
                      <Link
                        activeClassName="active"
                        to="/liity"
                        exact
                        onClick={this.handleHideMenu}
                      >
                        Liity
                      </Link>
                    </li>
                  </ul>
                </nav>
              </header>
            </FullRow>
          </HeaderContainer>
        )}
      />
    );
  }
}

export default Header;
