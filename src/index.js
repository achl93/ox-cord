import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/app' component={App} />
    </Switch>
  </BrowserRouter>
  
  , document.getElementById('root'));
registerServiceWorker();
