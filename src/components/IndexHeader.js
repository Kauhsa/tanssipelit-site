import styled from "styled-components";
import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import { times, take, sortBy } from "lodash-es";
import isAfter from "date-fns/is_after";
import startOfDay from "date-fns/start_of_day";
import getTime from "date-fns/get_time";

import { newsLink } from "../links";

import { h3 } from "./TextContent";
import TextImage from "./TextImage";
import DateTime from "./DateTime";

import backgroundImage from "../images/kuva.png";

import FullRow from "./FullRow";

const BackgroundContainer = styled.div`
  background-image: url(${backgroundImage});
  background-position: center;
  background-size: cover;
`;

const NewsContainer = styled.div`
  a {
    display: block;
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

const Title = styled.h2`
  opacity: 0.9;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.75);
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const Container = styled.div`
  background: rgba(16, 0, 65, 0.95);
  padding: 6rem 1.5rem 0 0;
  position: relative;
  display: flex;
  flex-basis: 100%;
  color: white;

  @media only screen and (max-width: 48em) {
    display: block;
  }

  &::after,
  &::before {
    content: "";
    position: absolute;
    display: block;
    background: rgba(255, 255, 255, 0.95);
    top: 0;
    height: 100%;
    width: 100vw;
  }

  &::after {
    right: 100%;
  }

  &::before {
    left: 100%;
  }

  ${NewsContainer} {
    padding-right: 1.5rem;

    flex-basis: 67%;

    @media only screen and (max-width: 48em) {
      padding: 0;
      padding-bottom: 3rem;

      a {
        margin-left: -1.5rem;
        margin-right: -1.5rem;
      }
    }
  }

  ${SideContent} {
    @media only screen and (max-width: 48em) {
      padding: 0;
    }

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
            <BackgroundContainer>
              <FullRow>
                <Container>
                  <HighlightNewsItem node={mostRecentNews.node} />

                  <SideContent>
                    <Title>Tulevat tapahtumat</Title>
                    <ul>{this.getEvents(allEvents)}</ul>

                    <Title>Muut uutiset</Title>
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
              </FullRow>
            </BackgroundContainer>
          );
        }}
      />
    );
  }
}

export default News;
