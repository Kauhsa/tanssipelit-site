import React from "react";
import Layout from "../components/Layout";
import Intl from "../components/Intl";
import TextContent from "../components/TextContent";

function NotFoundPage() {
  return (
    <Intl locale="fi">
      <Layout>
        <TextContent>
          <h1>Sivua ei löytynyt!</h1>
          <p>:(</p>
        </TextContent>
      </Layout>
    </Intl>
  );
}

export default NotFoundPage;
