import React from "react";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import TextContent from "../components/TextContent";

/* Will do anything meaningful only when deployed to Netlify. */

const Join = () => (
  <Layout>
    <FullRow>
      <div className="col-xs-12">
        <Content>
          <TextContent>
            <h1>Kiitos!</h1>
            <p>Yhdistyksen sihteeri vahvistaa hakemuksesi sähköpostitse.</p>
            <p>
              Jos et saa sähköpostia viikon kuluessa, lähetä sähköpostia
              osoitteeseen{" "}
              <a href="mailto:sihteeri@tanssipelit.fi">
                sihteeri@tanssipelit.fi
              </a>.
            </p>
          </TextContent>
        </Content>
      </div>
    </FullRow>
  </Layout>
);

export default Join;
