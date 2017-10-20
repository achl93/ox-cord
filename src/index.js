import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Join from './components/join';
import Host from './components/host';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/join' component={Join} />
      <Route path='/host*' component={Host} />
      <Route path='/' component={Home} />
    </Switch>
  </BrowserRouter>
  
  , document.getElementById('root'));
registerServiceWorker();
