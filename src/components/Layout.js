import React from "react";
import Helmet from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { injectIntl } from "react-intl";

import Header from "./Header";
import Footer from "./Footer";
import PurpleContainer from "./PurpleContainer";

import favicon from "../images/favicon.png";

import "css-wipe/index.css";

const GlobalStyle = createGlobalStyle`

  :root {
    font-size: 18px;
  }

  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: Lato, Geneva, Tahoma, sans-serif;
    font-display: swap;
  }
`;

class Layout extends React.PureComponent {
  render() {
    const { headerAbsolute = false, localeUrls, children, intl } = this.props;
    const HeaderWrapper = headerAbsolute ? React.Fragment : PurpleContainer;

    return (
      <>
        <GlobalStyle />
        <HeaderWrapper>
          <Header absolute={headerAbsolute} localeUrls={localeUrls} />
        </HeaderWrapper>
        <div>
          <Helmet
            titleTemplate="%s | Tanssipelit.fi"
            defaultTitle="Tanssipelit.fi"
            htmlAttributes={{ lang: intl.locale }}
          >
            <link rel="icon" type="image/png" href={favicon} sizes="64x46" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          {children}
          <Footer />
        </div>
      </>
    );
  }
}

export default injectIntl(Layout);
