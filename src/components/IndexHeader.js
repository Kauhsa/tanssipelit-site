import styled from "styled-components";
import media from "styled-media-query";
import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import { times, take, sortBy } from "lodash-es";
import isAfter from "date-fns/is_after";
import startOfDay from "date-fns/start_of_day";
import getTime from "date-fns/get_time";

import { newsLink } from "../links";

import { h3, SectionTitle } from "./TextContent";
import TextImage from "./TextImage";
import DateTime from "./DateTime";

import { headerHeight } from "./Header";
import PurpleContainer from "./PurpleContainer";

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
  `};

  ${NewsContainer} {
    padding-right: 1.5rem;
    flex-basis: 67%;

    ${media.lessThan("medium")`
      padding: 0;
      padding-bottom: 1.5rem;

      a {
        margin-left: -1.5rem;
        margin-right: -1.5rem;
      }
    `};
  }

  ${SideContent} {
    padding: 1.5rem;
    flex-basis: 33%;
  }
`;

const HighlightNewsItem = ({
  node: { summary, title, slug, mainImage, createdAt }
}) => (
  <NewsContainer>
    <Link to={newsLink(slug)}>
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

class News extends React.Component {
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
      <SideContentItem key={i}>
        <h3>{event.eventName}</h3>
        <SideContentTime>
          <DateTime dateTime={event.start} format="dd D.M." />
          {event.end && <DateTime dateTime={event.end} format="–dd D.M." />}
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
          const [mostRecentNews, ...otherNews] = data.allContentfulNews.edges;
          const allEvents = data.allContentfulCalendarEntry.edges;

          return (
            <Container>
              <HighlightNewsItem node={mostRecentNews.node} />

              <SideContent>
                <SectionTitle>Tulevat tapahtumat</SectionTitle>
                <ul>{this.getEvents(allEvents)}</ul>

                <SectionTitle>Muut uutiset</SectionTitle>
                <ul>
                  {otherNews.map(({ node }, i) => (
                    <SideContentItem to={newsLink(node.slug)} key={i}>
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

export default News;
