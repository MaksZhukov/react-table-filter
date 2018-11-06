import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import AppContainer from './containers/App';
import store from './store'
import 'react-widgets/dist/css/react-widgets.css';


render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, document.getElementById('root'));
