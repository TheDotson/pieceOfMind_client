import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { PieceOfMind } from './components/PieceOfMind';
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PieceOfMind />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
