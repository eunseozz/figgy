import styled from "styled-components";

const GlobalStyle = styled.div`
  font-family: sans-serif;
  color: #000;
  box-sizing: border-box;

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    border: 0;
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
    all: unset;
    cursor: pointer;
  }

  input,
  textarea {
    font: inherit;
    border: none;
    outline: none;
    background: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    font-size: inherit;
  }
`;

export default GlobalStyle;
