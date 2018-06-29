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
        <nav id="nav" className={!this.state.mobileMenuOpen && "hidden-mobile"}>
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

const News = () => (
  <section className="content grey">
    <div className="container center">
      <div className="row" id="news">
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <a href="#">
            <div className="image-wrapper">
              <img alt="" src="images/animu1.jpg" />
            </div>
          </a>
          <div className="bordered-content">
            <a href="#">
              <h4>Uutispostaus 1</h4>
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacus
              sapien, <a href="#">fringilla</a> a tristique sed, pretium vitae
              neque. Ut nec urna ut dolor eleifend molestie. Donec ut dui non
              dolor bibendum vulputate at quis nunc. Suspendisse facilisis augue
              ut lorem laoreet pretium. Mauris sit amet dui et mi pharetra
              laoreet. Curabitur tincidunt condimentum nulla ut maximus. Sed id
              consectetur risus. Cras ullamcorper rutrum blandit. Proin viverra
              nibh leo, cursus feugiat magna pretium non. Curabitur porttitor
              ornare nibh sed pulvinar.
            </p>
            <button className="primary">Lue lisää</button>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <a href="#">
            <div className="image-wrapper">
              <img alt="" src="images/animu2.png" />
            </div>
          </a>
          <div className="bordered-content">
            <a href="#">
              <h4>Toinen uutinen</h4>
            </a>
            <p>
              Fusce convallis justo vitae consectetur euismod. Nulla tincidunt
              tempus turpis, in ullamcorper felis condimentum quis. Morbi sed
              faucibus diam. Pellentesque facilisis euismod leo, at fringilla
              nisi gravida at. Aenean justo purus, laoreet at bibendum et,
              volutpat quis lacus. Vestibulum eleifend diam mauris, vitae
              fermentum lacus vulputate at. Vivamus euismod leo sit amet risus
              imperdiet, eu ullamcorper risus pharetra. Cras eu dignissim justo,
              a dapibus arcu.
            </p>
            <button className="primary">Lue lisää</button>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <a href="#">
            <div className="image-wrapper">
              <img alt="" src="images/animu3.jpg" />
            </div>
          </a>
          <div className="bordered-content">
            <a href="#">
              <h4>EM-kisat 2018</h4>
            </a>
            <p>
              Nam tempus euismod placerat. Maecenas rhoncus justo ipsum, eget
              sagittis neque mattis et. In eget nisi et dolor facilisis
              convallis quis et turpis. Praesent auctor mi eu dui consequat
              vestibulum.
            </p>
            <button className="primary">Lue lisää</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

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
        <News />
        <section>
          <div className="container center">
            <div className="row">
              <div className="col-xs-12">{children}</div>
            </div>
          </div>
        </section>
      </>
    )}
  />
);
