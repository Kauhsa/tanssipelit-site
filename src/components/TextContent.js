import styled from "styled-components";

const TextContent = styled.div`
  *:first-child {
    margin-top: 0;
  }

  h1,
  h2,
  h3 {
    margin: 2rem 0;
  }

  p {
    margin: 1rem 0;
  }

  h1 {
    font-weight: 600;
    font-size: 3rem;
  }

  h2 {
    font-weight: 600;
    font-size: 2rem;
  }

  h3 {
    font-weight: 600;
    font-size: 1.5rem;
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
`;

export default TextContent;
