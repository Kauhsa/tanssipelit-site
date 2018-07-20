import styled, { css } from "styled-components";
import { colors } from "../style";
import { transparentize } from "polished";

const headerBase = css`
  font-family: Lato;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  line-height: 1.2;
`;

export const h1 = css`
  ${headerBase};
  border-left: 5px solid ${colors.purple};
  font-weight: 900;
  padding-left: 1rem;
  font-size: 2.5rem;
  margin: 2.5rem 0;
`;

export const h2 = css`
  ${headerBase};
  font-weight: 400;
  border-left-color: ${transparentize(0.4, colors.purple)};
  font-size: 1.5rem;
`;

export const h3 = css`
  ${headerBase};
  text-transform: none;
  border-left-color: ${transparentize(0.4, colors.purple)};
  font-size: 1.3rem;
`;

export const a = css`
  color: #4f3af6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SectionTitle = styled.h3`
  opacity: 0.9;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.75);
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const TextContent = styled.div`
  *:first-child {
    margin-top: 0;
  }

  a {
    ${a};
  }

  line-height: 1.5;

  h1,
  h2,
  h3 {
    margin: 1.5rem 0;
  }

  h1 {
    ${h1};
  }

  h2 {
    ${h2};
  }

  h3 {
    ${h3};
  }

  p {
    margin: 1rem 0;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: 600;
  }

  ul,
  ol {
    margin: 1rem 1.5rem;
  }

  ul {
    list-style-type: square;
  }

  ol {
    list-style-type: decimal;
  }

  blockquote {
    color: rgba(0, 0, 0, 0.7);
    padding-left: 1rem;
    border-left: 3px solid rgba(0, 0, 0, 0.7);
  }

  pre {
    white-space: pre-line;
  }
`;

export default TextContent;
