import React from "react";
import Helmet from "react-helmet";
import { injectGlobal } from "styled-components";
import { injectIntl } from "react-intl";

import Header from "./Header";
import Footer from "./Footer";
import PurpleContainer from "./PurpleContainer";

import "css-wipe/index.css";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700,900,400i');

  :root {
    font-size: 18px;
  }

  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Lato', sans-serif;
    font-display: swap;
  }
`;

const Layout = ({ children, intl, localeUrls, headerAbsolute = false }) => {
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
        />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default injectIntl(Layout);
