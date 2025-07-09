import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  :where(#figgy-dashboard) {
    font-family: system-ui, sans-serif;
    font-weight: normal;
    color: #5c5e64;
    box-sizing: border-box;
  }

  :where(#figgy-dashboard *),
  :where(#figgy-dashboard *::before),
  :where(#figgy-dashboard *::after) {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    border: 0;
  }

  :where(#figgy-dashboard ul),
  :where(#figgy-dashboard ol) {
    list-style: none;
  }

  :where(#figgy-dashboard a) {
    text-decoration: none;
    color: inherit;
  }

  :where(#figgy-dashboard img) {
    display: block;
    max-width: 100%;
  }

  :where(#figgy-dashboard button) {
    cursor: pointer;
    background: none;
    border: none;
  }

  :where(#figgy-dashboard input),
  :where(#figgy-dashboard textarea) {
    font: inherit;
    border: none;
    outline: none;
    background: none;
  }

  :where(#figgy-dashboard h1),
  :where(#figgy-dashboard h2),
  :where(#figgy-dashboard h3),
  :where(#figgy-dashboard h4),
  :where(#figgy-dashboard h5),
  :where(#figgy-dashboard h6) {
    font-weight: normal;
    font-size: inherit;
  }
`;

export default GlobalStyle;
