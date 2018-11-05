import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import AppContainer from './containers/App';
import store from './store'
import * as serviceWorker from './serviceWorker';
import GridLayout from 'react-grid-layout';


render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
