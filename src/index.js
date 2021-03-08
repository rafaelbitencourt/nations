import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#60835F'
    },
    secondary: {
      main: '#834949'
    }    
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
