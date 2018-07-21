import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import FullRow from "../components/FullRow";
import Layout from "../components/Layout";
import Content from "../components/Content";
import DateTime from "../components/DateTime";
import TextContent from "../components/TextContent";
import Intl from "../components/Intl";

const dateFormat = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  weekday: "long"
};

export default function Template({ data: { contentfulCalendarEntry } }) {
  return (
    <Intl locale={contentfulCalendarEntry.node_locale}>
      <Helmet title={contentfulCalendarEntry.eventName}>
        <meta name="og:title" content={contentfulCalendarEntry.eventName} />
        <meta name="og:type" content="article" />
        <meta
          name="og:description"
          content={
            contentfulCalendarEntry.description.childMarkdownRemark.excerpt
          }
        />
        <meta
          name="description"
          content={
            contentfulCalendarEntry.description.childMarkdownRemark.excerpt
          }
        />
      </Helmet>
      <Layout>
        <FullRow>
          <Content>
            <div>
              <TextContent>
                <h2>{contentfulCalendarEntry.eventName}</h2>
                <p>
                  <strong>
                    <DateTime
                      dateTime={contentfulCalendarEntry.start}
                      options={dateFormat}
                    />
                    {contentfulCalendarEntry.end && (
                      <>
                        –<DateTime
                          dateTime={contentfulCalendarEntry.end}
                          options={dateFormat}
                        />
                      </>
                    )}
                  </strong>
                </p>
              </TextContent>

              <TextContent
                dangerouslySetInnerHTML={{
                  __html:
                    contentfulCalendarEntry.description.childMarkdownRemark.html
                }}
              />
            </div>
          </Content>
        </FullRow>
      </Layout>
    </Intl>
  );
}

export const pageQuery = graphql`
  query CalendarEntryById($id: String!) {
    contentfulCalendarEntry(id: { eq: $id }) {
      node_locale
      id
      start
      end
      eventName
      description {
        childMarkdownRemark {
          excerpt
          html
        }
      }
    }
  }
`;
