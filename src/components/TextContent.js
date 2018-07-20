import styled, { css } from "styled-components";
import { colors } from "../style";

const headerBase = css`
  font-family: Lato;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-left: 5px solid ${colors.purple};
  padding-left: 1rem;
  line-height: 1.2;
`;

export const h1 = css`
  ${headerBase};
  font-size: 2rem;
  font-weight: 900;
`;

export const h2 = css`
  ${headerBase};
  font-weight: 400;
  font-size: 1.5rem;
`;

export const h3 = css`
  ${headerBase};
  text-transform: none;
  font-size: 1.3rem;
`;

const TextContent = styled.div`
  *:first-child {
    margin-top: 0;
  }

  a {
    color: #4f3af6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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
