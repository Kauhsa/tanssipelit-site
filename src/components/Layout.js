import React from "react";
import Helmet from "react-helmet";
import { injectGlobal } from "styled-components";
import { injectIntl } from "react-intl";

import Header from "./Header";
import Footer from "./Footer";
import PurpleContainer from "./PurpleContainer";

import favicon from "../images/favicon.png";

import "css-wipe/index.css";

injectGlobal`
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
  componentDidMount() {
    if (typeof window !== "undefined") {
      const WebFont = require("webfontloader");
      WebFont.load({
        google: {
          families: ["Lato:400,700,900,400i"]
        }
      });
    }
  }

  render() {
    const { headerAbsolute = false, localeUrls, children, intl } = this.props;
    const HeaderWrapper = headerAbsolute ? React.Fragment : PurpleContainer;

    return (
      <>
        <HeaderWrapper>
          <Header absolute={headerAbsolute} localeUrls={localeUrls} />
        </HeaderWrapper>
        <div>
          <Helmet
            titleTemplate={`%s | Tanssipelit.fi`}
            defaultTitle={"Tanssipelit.fi"}
            htmlAttributes={{ lang: intl.locale }}
          >
            <link rel="icon" type="image/png" href={favicon} sizes="64x46" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com/"
              crossOrigin
            />
            <link
              rel="preconnect"
              href="https://fonts.googleapis.com/"
              crossOrigin
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
