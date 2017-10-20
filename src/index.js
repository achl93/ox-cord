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

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path='/playlist' component={Playlist} />
        <Route path='/join' component={Join} />
        <Route path='/host*' component={Host} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
  
  , document.getElementById('root'));
registerServiceWorker();
