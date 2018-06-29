import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import logo from "../images/stp_logo.png";
import FaBars from "react-icons/lib/fa/bars";
import styled from "styled-components";
import { articleLink } from "../links";

import "flexboxgrid/css/flexboxgrid.min.css";
import "./index.css";

const MenuIcon = styled.a`
  display: none;
  float: right;
  cursor: pointer;

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
    const { navigation } = this.props;

    return (
      <header>
        <Link id="logo" to="/">
          <img src={logo} alt="logo" id="logo-img" />
        </Link>
        <MenuIcon onClick={this.handleToggleMenu}>
          <FaBars />
        </MenuIcon>
        <nav
          id="nav"
          className={this.state.mobileMenuOpen ? undefined : "hidden-mobile"}
        >
          <ul>
            <li>
              <Link activeClassName="active" to="/" exact>
                Etusivu
              </Link>
            </li>

            {navigation.map(link => (
              <li key={link.id}>
                <Link activeClassName="active" to={articleLink(link.slug)}>
                  {link.title}
                </Link>
              </li>
            ))}
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
      <>
        <Helmet
          titleTemplate={`%s | Tanssipelit.fi`}
          defaultTitle={"Tanssipelit.fi"}
        >
          <link
            href="http://fonts.googleapis.com/css?family=Lato:400,400italic,600,700"
            rel="stylesheet"
            type="text/css"
          />
        </Helmet>
        <Header navigation={data.contentfulSettings.navigation} />
        {children}
      </>
    )}
  />
);
