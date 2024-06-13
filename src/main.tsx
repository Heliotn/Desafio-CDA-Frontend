/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import App from './components/App';

const defaultTheme: any = {
  fontFamily: 'Roboto',
  yellowColor: 'rgb(255, 192, 70)',
  redColor: 'rgb(255, 70, 70)',
  primaryBlueColor: 'rgb(17, 19, 29)',
  secondBlueColor: 'rgb(22, 25, 38)',
  whiteColor: '#FFFFFF',
  blackColor: 'rgba(0, 0, 0, 1)',
  blackColor50: 'rgba(0, 0, 0, 0.5)',
  grayColor: '#212121',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <LanguageProvider>
        <App />
        <GlobalStyles />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
