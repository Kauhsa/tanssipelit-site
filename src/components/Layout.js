import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import logo from "../images/stp_logo.png";
import FaBars from "react-icons/lib/fa/bars";
import styled from "styled-components";
import { articleLink } from "../links";

import "css-wipe/reset.css";
import "flexboxgrid/css/flexboxgrid.min.css";
import "./index.css";

const Container = styled.div`
  padding-top: 72px;
`;

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
      <Container>
        <Helmet
          titleTemplate={`%s | Tanssipelit.fi`}
          defaultTitle={"Tanssipelit.fi"}
        >
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,500,500i,700,700i,900,900i"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i"
            rel="stylesheet"
          />
        </Helmet>
        <Header navigation={data.contentfulSettings.navigation} />
        {children}
      </Container>
    )}
  />
);
