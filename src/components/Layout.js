import { graphql, StaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import logo from "../images/stp_logo.png";
import FaBars from "react-icons/lib/fa/bars";
import styled from "styled-components";

import "flexboxgrid/css/flexboxgrid.min.css";
import "./index.css";

const MenuIcon = styled.a`
  display: none;
  float: right;

  @media only screen and (max-width: 48em) {
    display: block;
  }

  svg {
    margin-top: 20px;
    margin-right: 20px;
    height: 2em;
    width: 2em;
    color: white;
  }
`;

class Header extends React.PureComponent {
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
      <header>
        <a href="#" id="logo">
          <img src={logo} alt="logo" id="logo-img" />
        </a>
        <MenuIcon href="#" onClick={this.handleToggleMenu}>
          <FaBars />
        </MenuIcon>
        <nav
          id="nav"
          className={this.state.mobileMenuOpen ? undefined : "hidden-mobile"}
        >
          <ul>
            <li>
              <a className="active" href="#">
                Etusivu
              </a>
            </li>
            <li>
              <a href="#">Tanssipelit</a>
            </li>
            <li>
              <a href="#">Yhteisö</a>
            </li>
            <li>
              <a href="#">Yhdistys</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
        >
          <link
            href="http://fonts.googleapis.com/css?family=Lato:400,400italic,600,700"
            rel="stylesheet"
            type="text/css"
          />
        </Helmet>
        <Header />
        {children}
      </>
    )}
  />
);
