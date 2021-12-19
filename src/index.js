import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.css";
import './index.css';
import TagManager from 'react-gtm-module';
// import {tagManagerArgs} from "./app/constants";
import AppSettings from "./app//environment";
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
// import * as serviceWorker from "./serviceWorker";
// import reportWebVitals from './reportWebVitals';
// * https://stackoverflow.com/questions/66384368/how-is-it-possible-to-access-homepage-from-package-json-in-a-react-app -- 12/17/2021 MF
import { version, copyrightYear } from '../package.json';

// const componentName = "index.js";

// console.log(componentName, "version", version);
// console.log(componentName, "copyrightYear", copyrightYear);

// * Google Tag Manager -- 03/06/2021 MF
if (AppSettings.tagManagerArgs.gtmId !== "") {

  TagManager.initialize(AppSettings.tagManagerArgs);

};

// const metaDescription = useSelector(state => state.app.metaDescription);
// document.getElementsByTagName("META")[3].content = metaDescription;
document.getElementsByTagName("META")[3].content = AppSettings.metaDescription;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App applicationVersion={version} copyrightYear={copyrightYear} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

