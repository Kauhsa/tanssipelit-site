import styled, { css } from "styled-components";

const headerBase = css`
  font-family: Play;
  font-weight: 600;
`;

export const h1 = css`
  ${headerBase};
  font-size: 3rem;
`;

export const h2 = css`
  ${headerBase};
  font-size: 2rem;
`;

export const h3 = css`
  ${headerBase};
  font-size: 1.3rem;
`;

const TextContent = styled.div`
  *:first-child {
    margin-top: 0;
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
