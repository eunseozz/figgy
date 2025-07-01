import styled from "styled-components";

const GlobalStyle = styled.div`
  font-family: sans-serif;
  color: #5c5e64;
  box-sizing: border-box;

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: normal;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea {
    font: inherit;
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
