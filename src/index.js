import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Grid, Row } from 'react-bootstrap';

import Home from './components/Home';
import Join from './containers/Join';
import Host from './containers/Host';
import Test from './containers/Test';
import Playlist from './components/Playlist';
import Settings from './components/Settings';
import PlaylistImport from './containers/PlaylistImport';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk, ReduxPromise)));

ReactDOM.render(
  <Grid bsClass='container mt-5'>
      <Row bsClass='app-content mx-auto d-flex justify-content-center'>
          <Provider store={store}>
            <BrowserRouter>
              <Switch>
                <Route path='/playlist' component={Playlist} />
                <Route path='/join' component={Join} />
                <Route path='/settings' component={Settings} />
                <Route path='/import' component={PlaylistImport} />
                <Route path='/host' component={Host} />
                <Route path='/test' component={Test} />
                <Route path='/' component={Home} />
              </Switch>
            </BrowserRouter>
           </Provider>
      </Row>
  </Grid>
  
  , document.getElementById('root'));
registerServiceWorker();
