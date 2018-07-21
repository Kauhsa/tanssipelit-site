import React from "react";
import { stripIndent } from "common-tags";
import styled from "styled-components";
import { Link } from "gatsby";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import TextContent from "../components/TextContent";
import Intl from "../components/Intl";

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

const email = "sihteeri@tanssipelit.fi";

const emailHref = "mailto:" + email;

// prettier-ignore
const emailHrefWithContent = `${emailHref}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

const MailTemplate = styled.pre`
  padding: 1rem;
  background-color: #fafafa;
`;

const Join = () => (
  <Intl locale="fi">
    <Layout>
      <FullRow>
        <div className="col-xs-12">
          <Content>
            <TextContent>
              <h1>Liity yhdistykseen</h1>
              <p>
                Voit liittyä yhdistyksen jäseneksi sähköpostitse. Yhdistyksen
                sihteeri ottaa sinuun yhteyttä viikon kuluessa jäsenyytesi
                vahvistamiseksi. Lähettämällä hakemuksen hyväksyt myös
                yhdistyksen <Link to="/saannot">säännöt</Link>.
              </p>
              <p>
                <strong>
                  <a href={emailHrefWithContent}>
                    Avaa esitäytetty sähköposti sähköpostiohjelmassasi
                    klikkaamalla tästä.
                  </a>
                </strong>
              </p>
              <p>
                Jos et saa sähköpostia lähetettyä ylläolevan linkin kautta, voit
                lähettää sähköpostin osoitteeseen{" "}
                <a href={emailHref}>{email}</a>. Käytä sähköpostin pohjana tätä
                mallia:
              </p>
              <MailTemplate>{emailBody}</MailTemplate>
            </TextContent>
          </Content>
        </div>
      </FullRow>
    </Layout>
  </Intl>
);

export default Join;
