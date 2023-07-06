import React from "react";
import { IntlProvider } from "react-intl";

import * as messages from "../messages";

export const nodesWithLocale = (locale, edges) =>
  edges.filter(edge => edge.node.node_locale === locale);

const Intl = ({ locale, children }) => (
  <IntlProvider
    locale={locale}
    key={locale}
    messages={messages[locale]}
    textComponent={React.Fragment}
  >
    <>{children}</>
  </IntlProvider>
);

export default Intl;
