import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import TagManager from 'react-gtm-module'
// import {tagManagerArgs} from "./app/constants";
import AppSettings from "./app//environment";
import App from './App';
import store from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';

// * Google Tag Manager
if (AppSettings.tagManagerArgs.gtmId !== "") {
  TagManager.initialize(AppSettings.tagManagerArgs);
};

// const metaDescription = useSelector(state => state.app.metaDescription);
// document.getElementsByTagName("META")[3].content = metaDescription;
document.getElementsByTagName("META")[3].content = AppSettings.metaDescription;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
