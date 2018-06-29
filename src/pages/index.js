import React from "react";

import Layout from "../components/Layout";
import News from "../components/News";
import Content from "../components/Content";

const Index = () => (
  <Layout>
    <News />
    <Content>
      <h2>Lusso grande</h2>
      <p>Foo foo</p>
    </Content>
  </Layout>
);

export default Index;
