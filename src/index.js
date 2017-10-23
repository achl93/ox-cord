import React from 'react';
import ReactDOM from 'react-dom';



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
import Playlist from './components/Playlist';
import Settings from './components/Settings';


import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStore(reducers, applyMiddleware(ReduxPromise));

ReactDOM.render(
  <Grid bsClass='container mt-5'>
    <div className='app-content mx-auto d-flex justify-content-center'>
      <Row bsClass=' border p-3'>
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
      </Row>
    </div>
  </Grid>
  
  , document.getElementById('root'));
registerServiceWorker();
