import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/App';
import store from './store';

it('render application without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
