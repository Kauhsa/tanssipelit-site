import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import Headroom from "react-headroom";
import FaBars from "react-icons/lib/fa/bars";
import styled, { css } from "styled-components";

import FullRow from "./FullRow";
import { articleLink } from "../links";
import logo from "../images/stp_logo.png";
import { transparentize } from "polished";
import { colors } from "../style";

const HeaderContainer = styled(Headroom)`
  ${props =>
    props.absolute &&
    css`
      position: absolute;
    `};

  left: 0;
  right: 0;

  ${props =>
    props.transparentUnfixed &&
    css`
      .headroom--unfixed header {
        background-color: rgba(16, 0, 65, 0);
      }
    `};

  header {
    width: 100%;
    display: flex;
    height: 6rem;
    transition: background-color 250ms;
    background-color: ${transparentize(0.03, colors.purple)};

    #logo {
      display: flex;
      align-items: center;
      margin-left: 3rem;
    }

    nav {
      margin-left: auto;
      margin-right: 3rem;
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    #nav ul li {
      display: inline-block;
      margin-left: 2rem;
    }

    #nav ul li a {
      color: #fff;
      text-decoration: none;
      display: block;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0);
    }

    #nav ul li a:hover {
      border-bottom: 1px solid #fff;
    }

    #nav li a.active {
      font-weight: 900;
    }

    @media only screen and (max-width: 48em) {
      nav {
        float: none;
        display: block;
        position: fixed;
        top: 5rem;
        width: 100%;
      }

      .hidden-mobile {
        display: none;
      }

      #nav ul {
        background-color: #3a2a6c;
        border-top: 1px solid #544585;
      }

      #nav ul li {
        margin: 0;
        display: block;
        padding: 15px 0;
      }
      #nav ul li a:hover,
      #nav li a.active {
        border-bottom: none;
        text-decoration: underline;
      }
    }
  }
`;

const MenuIcon = styled.a`
  display: none;
  float: right;
  height: 100%;
  align-items: center;
  cursor: pointer;
  padding: 0 2rem;

  @media only screen and (max-width: 48em) {
    display: flex;
  }

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
          <HeaderContainer
            absolute={this.props.absolute}
            transparentUnfixed={this.props.transparentUnfixed}
          >
            <FullRow>
              <header>
                <Link id="logo" to="/">
                  <img src={logo} alt="logo" id="logo-img" />
                </Link>
                <MenuIcon onClick={this.handleToggleMenu}>
                  <FaBars />
                </MenuIcon>
                <nav
                  id="nav"
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
