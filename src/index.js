import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Join from './components/join';
import Host from './components/host';
import Playlist from './containers/playlist';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import Settings from './components/settings';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStore(reducers, applyMiddleware(ReduxPromise));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/playlist' component={Playlist} />
        <Route path='/join' component={Join} />
        <Route path='/settings' component={Settings} />
        <Route path='/host' component={Host} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
  
  , document.getElementById('root'));
registerServiceWorker();
