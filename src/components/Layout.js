import React from "react";
import Helmet from "react-helmet";
import { injectGlobal } from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import "css-wipe/index.css";
import "flexboxgrid/css/flexboxgrid.min.css";
import "./index.css";
import PurpleContainer from "./PurpleContainer";
import FullRow from "./FullRow";

injectGlobal`
  :root {
    font-size: 18px;
  }

  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Lato', sans-serif;
  }
`;

export default ({ children, headerAbsolute = false }) => {
  const HeaderWrapper = headerAbsolute ? React.Fragment : PurpleContainer;

  return (
    <>
      <HeaderWrapper>
        <Header absolute={headerAbsolute} />
      </HeaderWrapper>
      <div>
        <Helmet
          titleTemplate={`%s | Tanssipelit.fi`}
          defaultTitle={"Tanssipelit.fi"}
        >
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700,900,400i"
            rel="stylesheet"
          />
        </Helmet>
        {children}
        <Footer />
      </div>
    </>
  );
};
