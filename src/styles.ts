/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defaultTheme } from '@xstyled/styled-components';
import { createGlobalStyle } from 'styled-components';

export const colors = {
  ...defaultTheme.colors,
  background: '#003049',
};

export const theme = {
  ...defaultTheme,
  colors,
};

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;
    background-color: ${colors.background};
    font-size: 16px;
    font-family: 'Nunito', system-ui, -apple-system, "Segoe UI",  Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-weight: 900;
  }
`;
