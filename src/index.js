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

import Home from './components/Home.jsx';
import Join from './containers/Join.jsx';
import Host from './containers/Host.jsx';
import Create from './containers/Create.jsx';
import Playlist from './components/Playlist.jsx';
import Settings from './containers/Settings.jsx';
import UserPlaylist from './components/UserPlaylist.jsx';
import PlaylistImport from './containers/PlaylistImport.jsx';
import Test from './containers/Test.jsx';
import BGImg from './containers/BGImg.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk, ReduxPromise)));


ReactDOM.render(
  <Provider store={store}>
  <Grid bsClass='mt-3 wholePage'>
    <h1 className = "title">Ox Cord</h1>
    <Row bsClass='mainPage app-content mx-auto d-flex justify-content-center px-3'>
      <BGImg/>
          <BrowserRouter>
            <Switch>
              <Route path='/user-playlist' component={UserPlaylist} />
              <Route path='/playlist' component={Playlist} />
              <Route path='/join' component={Join} />
              <Route path='/settings' component={Settings} />
              <Route path='/import' component={PlaylistImport} />
              <Route path='/host' component={Host} />
              <Route path='/create' component={Create} />
              <Route path='/test' component={Test} />
              <Route path='/' component={Home} />
            </Switch>
          </BrowserRouter>
    </Row>
  </Grid>
  </Provider>
  
  , document.getElementById('root'));
registerServiceWorker();
