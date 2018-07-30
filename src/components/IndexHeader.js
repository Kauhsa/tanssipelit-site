import styled from "styled-components";
import media from "styled-media-query";
import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import { times, take, sortBy } from "lodash-es";
import isAfter from "date-fns/is_after";
import startOfDay from "date-fns/start_of_day";
import getTime from "date-fns/get_time";

import { newsLink, calendarEntryLink } from "../links";

import { h3, SectionTitle } from "./TextContent";
import TextImage from "./TextImage";
import DateTime from "./DateTime";

import { headerHeight } from "./Header";
import PurpleContainer from "./PurpleContainer";
import { injectIntl, FormattedMessage } from "react-intl";
import { nodesWithLocale } from "./Intl";

const NewsContainer = styled.div`
  a {
    display: block;
    height: 100%;
  }
`;

const SideContent = styled.aside`
  font-size: 1rem;
  font-weight: bold;

  ul:not(:last-child) {
    margin-bottom: 3rem;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

const SideContentTime = styled.div`
  font-weight: 400;
  opacity: 0.8;
  margin-top: 0.4rem;
`;

const Container = PurpleContainer.extend`
  padding: ${headerHeight} 1.5rem 0 0;
  display: flex;
  flex-basis: 100%;

  ${media.lessThan("medium")`
    display: block;
    padding-right: 0;
  `};

  ${NewsContainer} {
    padding-right: 1.5rem;
    flex-basis: 67%;

    ${media.lessThan("medium")`
      padding: 0;
      padding-bottom: 1.5rem;
      width: 100%;
    `};
  }

  ${SideContent} {
    padding: 2rem;
    flex-basis: 33%;
  }
`;

const HighlightNewsItem = ({
  node: { summary, title, slug, mainImage, createdAt, node_locale: nodeLocale }
}) => (
  <NewsContainer>
    <Link to={newsLink(slug, nodeLocale)}>
      <TextImage fluid={mainImage.fluid}>
        <h2>{title}</h2>
        <DateTime dateTime={createdAt} />
      </TextImage>
    </Link>
  </NewsContainer>
);

const SideContentItem = styled(({ to, className, children }) => (
  <li className={className}>
    {to ? <Link to={to}>{children}</Link> : <span>{children}</span>}
  </li>
))`
  color: white;
  list-style-type: none;
  display: block;
  transition: border-left 250ms, padding-left 250ms;
  border-left: 0 solid rgba(255, 255, 255, 0);
  padding-left: 0;
  margin: 2rem 0;

  &:hover {
    border-left: 4px solid rgba(255, 255, 255, 0.5);
    padding-left: 8px;
  }
`;

class IndexHeader extends React.Component {
  state = {
    date: null
  };

  componentDidMount() {
    this.setState({
      date: Date.now()
    });
  }

  getEvents = events => {
    // If no date, we haven't rendered on client and don't know current date yet.
    // So – render empty entries!
    if (!this.state.date) {
      return times(Math.min(3, events.length), i => (
        <SideContentItem key={i}>
          <SideContentTime>&nbsp;</SideContentTime>
          &nbsp;
        </SideContentItem>
      ));
    }

    const futureEvents = events.map(({ node }) => node).filter(event => {
      return isAfter(event.end || event.start, startOfDay(this.state.date));
    });

    const sortedFutureEvents = sortBy(futureEvents, event =>
      getTime(event.start)
    );

    return take(sortedFutureEvents, 3).map((event, i) => (
      <SideContentItem
        key={i}
        to={calendarEntryLink(event.id, event.node_locale)}
      >
        <h3>{event.eventName}</h3>
        <SideContentTime>
          <DateTime
            dateTime={event.start}
            options={{ day: "numeric", month: "numeric", weekday: "short" }}
          />
          {event.end && (
            <>
              {" "}
              –{" "}
              <DateTime
                dateTime={event.end}
                options={{
                  day: "numeric",
                  month: "numeric",
                  weekday: "short"
                }}
              />
            </>
          )}
        </SideContentTime>
      </SideContentItem>
    ));
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query LatestNewsQuery {
            allContentfulNews(
              limit: 3
              sort: { fields: createdAt, order: DESC }
            ) {
              edges {
                node {
                  node_locale
                  id
                  title
                  slug
                  createdAt
                  summary {
                    childMarkdownRemark {
                      rawMarkdownBody
                    }
                  }
                  mainImage {
                    fluid(maxWidth: 1000, maxHeight: 600) {
                      ...GatsbyContentfulFluid
                    }
                  }
                }
              }
            }

            allContentfulCalendarEntry {
              edges {
                node {
                  node_locale
                  id
                  eventName
                  start
                  end
                }
              }
            }
          }
        `}
        render={data => {
          const {
            intl: { locale }
          } = this.props;

          const [mostRecentNews, ...otherNews] = nodesWithLocale(
            locale,
            data.allContentfulNews.edges
          );

          const allEvents = nodesWithLocale(
            locale,
            data.allContentfulCalendarEntry.edges
          );

          return (
            <Container>
              <HighlightNewsItem node={mostRecentNews.node} />

              <SideContent>
                <SectionTitle>
                  <FormattedMessage id="upcomingEvents" />
                </SectionTitle>
                <ul>{this.getEvents(allEvents)}</ul>

                <SectionTitle>
                  <FormattedMessage id="otherNews" />
                </SectionTitle>
                <ul>
                  {otherNews.map(({ node }, i) => (
                    <SideContentItem
                      to={newsLink(node.slug, node.node_locale)}
                      key={i}
                    >
                      <h3>{node.title}</h3>
                      <SideContentTime>
                        <DateTime dateTime={node.createdAt} />
                      </SideContentTime>
                    </SideContentItem>
                  ))}
                </ul>
              </SideContent>
            </Container>
          );
        }}
      />
    );
  }
}

export default injectIntl(IndexHeader);
