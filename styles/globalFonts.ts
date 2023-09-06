import {createGlobalStyle} from 'styled-components';

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bruno';
    src: url('/fonts/BrunoAceSC-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'FontName1', sans-serif; // Use FontName1 as default for the body
  }
`;
