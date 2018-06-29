import React from "react";

const Content = ({ children }) => (
  <section>
    <div className="container center">
      <div className="row">
        <div className="col-xs-12">{children}</div>
      </div>
    </div>
  </section>
);

export default Content;
