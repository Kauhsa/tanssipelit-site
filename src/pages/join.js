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
            <h1>Liity yhdistykseen</h1>
            <p>Voit liittyä yhdistyksen jäseneksi oheisella lomakkeella.</p>
          </TextContent>

          <form name="join" data-netlify="true" action="/join-success">
            <input type="hidden" name="form-name" value="join" />

            <p>
              <label>
                Nimi <input type="text" name="name" />
              </label>
            </p>

            <p>
              <label>
                Sähköpostiosoite <input type="email" name="email" />
              </label>
            </p>

            <p>
              <button type="submit">Lähetä</button>
            </p>
          </form>
        </Content>
      </div>
    </FullRow>
  </Layout>
);

export default Join;
