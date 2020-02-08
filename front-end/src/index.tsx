import 'antd/dist/antd.css';
import 'react-fine-uploader/gallery/gallery.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Router from './router';
import store from '@store/index';

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);