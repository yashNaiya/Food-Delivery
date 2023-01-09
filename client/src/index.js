import React from 'react';
import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './Theme';
import { BrowserRouter } from "react-router-dom"
// dotenv.config({ path: "." })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </BrowserRouter>

);

