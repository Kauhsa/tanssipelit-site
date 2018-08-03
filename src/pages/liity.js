import React from "react";
import { stripIndent } from "common-tags";
import styled from "styled-components";
import { Link } from "gatsby";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import TextContent from "../components/TextContent";
import Intl from "../components/Intl";
import EmailLink from "../components/EmailLink";

const emailSubject = "Suomen Tanssipelaajat ry. jäsenhakemus";

const emailBody = stripIndent`
  Haluan liittyä tällä sähköpostilla Suomen Tanssipelaajat ry. jäseneksi. Hyväksyn myös yhdistyksen säännöt.

  Nimi:
  Lähiosoite:
  Postinumero:
  Postitoimipaikka:
  Sähköpostiosoite:
  Syntymäaika:
`;

const MailTemplate = styled.pre`
  padding: 1rem;
  background-color: #fafafa;
`;

const Join = () => (
  <Intl locale="fi">
    <Layout>
      <FullRow>
        <Content>
          <TextContent>
            <h1>Liity yhdistykseen</h1>
            <p>
              Voit liittyä yhdistyksen jäseneksi sähköpostitse. Yhdistyksen
              sihteeri ottaa sinuun yhteyttä viikon kuluessa jäsenyytesi
              vahvistamiseksi. Lähettämällä hakemuksen hyväksyt myös yhdistyksen{" "}
              <Link to="/saannot">säännöt</Link>.
            </p>
            <p>
              <strong>
                <EmailLink
                  prefix="sihteeri"
                  suffix={`?subject=${encodeURIComponent(
                    emailSubject
                  )}&body=${encodeURIComponent(emailBody)}`}
                >
                  Avaa esitäytetty sähköposti sähköpostiohjelmassasi
                  klikkaamalla tästä.
                </EmailLink>
              </strong>
            </p>
            <p>
              Jos et saa sähköpostia lähetettyä ylläolevan linkin kautta, voit
              lähettää sähköpostin osoitteeseen <EmailLink prefix="sihteeri" />.
              Käytä sähköpostin pohjana tätä mallia:
            </p>
            <MailTemplate>{emailBody}</MailTemplate>
            <p>
              Suomen Tanssipelaajat ry. ei jaa tietojasi eteenpäin, ks.{" "}
              <Link to="/rekisteriseloste">rekisteriseloste</Link>.
            </p>
          </TextContent>
        </Content>
      </FullRow>
    </Layout>
  </Intl>
);

export default Join;
