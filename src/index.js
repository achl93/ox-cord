import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Join from './components/join';
import Host from './components/host';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path='/join' component={Join} />
        <Route path='/host*' component={Host} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
  
  , document.getElementById('root'));
registerServiceWorker();
