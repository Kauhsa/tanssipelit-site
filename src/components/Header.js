import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import Headroom from "react-headroom";
import FaBars from "react-icons/lib/fa/bars";
import styled from "styled-components";

import FullRow from "./FullRow";
import { articleLink } from "../links";
import logo from "../images/stp_logo.png";

const HeaderContainer = styled(Headroom)`
  header {
    width: 100%;
    height: 5rem;
    background-color: #3a2a6c;

    #logo {
      height: 100%;
      float: left;
      display: flex;
      align-items: center;
      padding: 0 2rem;
    }

    nav {
      float: right;
      height: 100%;
      display: flex;
      align-items: center;
    }

    #nav ul li {
      margin: 0;
      display: inline-block;
      margin-right: 2rem;
    }

    #nav ul li a {
      color: #fff;
      text-decoration: none;
      text-transform: uppercase;
      display: block;
      text-align: center;
      font-weight: bold;
      border-bottom: 2px solid rgba(0, 0, 0, 0);
    }

    #nav ul li a:hover,
    #nav li a.active {
      border-bottom: 2px solid #fff;
      transition: all 0s ease 0s;
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
          <HeaderContainer>
            <FullRow gray>
              <div className="col-xs-12">
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
                        <Link activeClassName="active" to="/" exact>
                          Etusivu
                        </Link>
                      </li>

                      {data.contentfulSettings.navigation.map(link => (
                        <li key={link.id}>
                          <Link
                            activeClassName="active"
                            to={articleLink(link.slug)}
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </header>
              </div>
            </FullRow>
          </HeaderContainer>
        )}
      />
    );
  }
}

export default Header;
