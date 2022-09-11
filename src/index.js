import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <Router basename='/'>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);