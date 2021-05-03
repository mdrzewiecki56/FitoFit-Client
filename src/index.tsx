import { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

