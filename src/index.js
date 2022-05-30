import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./app/store";
import "bootstrap/dist/css/bootstrap.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.css";
import { isEmpty, displayValue, getDateTime } from "shared-functions";
import TagManager from 'react-gtm-module';
// import {tagManagerArgs} from "./app/constants";
import applicationSettings from "./app/environment";
import App from './App';
import './index.css';
// import * as serviceWorker from "./serviceWorker";
// import reportWebVitals from './reportWebVitals';
// * https://stackoverflow.com/questions/66384368/how-is-it-possible-to-access-homepage-from-package-json-in-a-react-app -- 12/17/2021 MF
// import { version, copyrightYear } from '../package.json';
// * https://stackoverflow.com/questions/64993118/error-should-not-import-the-named-export-version-imported-as-version -- 12/27/2021 MF
// * Now imports the entire package.json file because of changes needed to be made due to updates with webpack 5. -- 12/27/2021 MF
// import packageJSON from '../package.json';

// const componentName = "index";

// console.log(componentName, "packageJSON.version", packageJSON.version);
// console.log(componentName, "packageJSON.copyrightYear", packageJSON.copyrightYear);

// * Google Tag Manager -- 03/06/2021 MF
if (isEmpty(applicationSettings.tagManagerArgs.gtmId) === false) {

  TagManager.initialize(applicationSettings.tagManagerArgs);

};

// const metaDescription = useSelector(state => state.applicationSettings.metaDescription);
// document.getElementsByTagName("META")[3].content = metaDescription;
document.getElementsByTagName("META")[3].content = applicationSettings.metaDescription;

// * The old syntax for React 17 and older. -- 05/29/2022 MF
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       {/* <App applicationVersion={packageJSON.version} copyrightYear={packageJSON.copyrightYear} /> */}
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App applicationVersion={packageJSON.version} copyrightYear={packageJSON.copyrightYear} /> */}
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

