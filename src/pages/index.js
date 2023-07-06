import React from "react";
import IndexPage from "../templates/IndexPage";
import Intl from "../components/Intl";

function Index() {
  return (
    <Intl locale="fi">
      <IndexPage />
    </Intl>
  );
}

export default Index;
