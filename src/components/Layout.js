import React from "react";
import Helmet from "react-helmet";
import { injectGlobal } from "styled-components";

import Header from "./Header";
import "css-wipe/index.css";
import "flexboxgrid/css/flexboxgrid.min.css";
import "./index.css";

injectGlobal`
  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Karla', sans-serif;
  }
`;

export default ({ children }) => (
  <>
    <Header />
    <div>
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
      {children}
    </div>
  </>
);
