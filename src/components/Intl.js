import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fi from "react-intl/locale-data/fi";

import * as messages from "../messages";

addLocaleData(en);
addLocaleData(fi);

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
