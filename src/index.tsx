import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';

// Support Blob.prototype.arrayBuffer() on Safari.
import './ArrayBuffer.prototype';

ReactDOM.render(
  <div>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </div>,
  document.querySelector('#root'),
);
