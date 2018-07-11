import styled from "styled-components";
import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";
import { TiCalendar, TiNews } from "react-icons/lib/ti";
import { times, take, sortBy } from "lodash-es";
import isAfter from "date-fns/is_after";
import startOfDay from "date-fns/start_of_day";
import getTime from "date-fns/get_time";

import { newsLink } from "../links";

import { h3 } from "./TextContent";
import TextImage from "./TextImage";
import FullRow from "./FullRow";
import DateTime from "./DateTime";

const HighlightNewsItem = ({
  node: { summary, title, slug, mainImage, createdAt }
}) => (
  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
    <Link to={newsLink(slug)}>
      <TextImage fluid={mainImage.fluid}>
        <h2>{title}</h2>
        <DateTime dateTime={createdAt} />
        <p>{summary.childMarkdownRemark.rawMarkdownBody}</p>
      </TextImage>
    </Link>
  </div>
);

const SideContent = styled.aside.attrs({
  className: "col-lg-4 col-md-4 col-sm-4 col-xs-12"
})`
  padding: 2rem;

  h3 {
    ${h3};
    margin-bottom: 1rem;

    svg {
      vertical-align: text-bottom !important;
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  ul {
    margin-bottom: 2rem;
    border-left: 3px solid #3a2a6c;
  }
`;

const SideContentTime = styled.div`
  margin-bottom: 0.33rem;
  color: rgba(0, 0, 0, 0.5);
`;

const SideContentItem = styled(({ to, className, children }) => (
  <li className={className}>
    {to ? <Link to={to}>{children}</Link> : <span>{children}</span>}
  </li>
))`
  list-style-type: none;
  display: block;

  & > * {
    text-decoration: none;
    display: block;
    padding: 0.75rem;
    color: #111111;
    font-weight: 500;

    background-color: rgba(255, 255, 255, 0.1);
  }

  &:nth-child(odd) {
    & > * {
      background-color: rgba(255, 255, 255, 0.5);
    }
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
        <SideContentTime>
          <DateTime dateTime={event.start} format="dd D.M.YYYY" />
          {event.end && <DateTime dateTime={event.end} format="–dd D.M.YYYY" />}
        </SideContentTime>
        {event.eventName}
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
            <FullRow gray stretch>
              <HighlightNewsItem node={mostRecentNews.node} />

              <SideContent>
                <h3>
                  <TiCalendar /> Tulevat tapahtumat
                </h3>
                <ul>{this.getEvents(allEvents)}</ul>

                <h3>
                  <TiNews /> Muut uutiset
                </h3>
                <ul>
                  {otherNews.map(({ node }, i) => (
                    <SideContentItem to={newsLink(node.slug)} key={i}>
                      <SideContentTime>
                        <DateTime dateTime={node.createdAt} />
                      </SideContentTime>{" "}
                      {node.title}
                    </SideContentItem>
                  ))}
                </ul>
              </SideContent>
            </FullRow>
          );
        }}
      />
    );
  }
}

export default News;
