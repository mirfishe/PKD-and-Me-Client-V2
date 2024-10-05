import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import TagManager from "react-gtm-module";
import { isEmpty, getDateTime } from "shared-functions";
import store from "./app/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import applicationSettings from "./app/environment";
import "./index.css";
// import reportWebVitals from "./reportWebVitals";
// * https://stackoverflow.com/questions/66384368/how-is-it-possible-to-access-homepage-from-package-json-in-a-react-app -- 12/17/2021 MF
// import { version, copyrightYear } from "../package.json";
// * https://stackoverflow.com/questions/64993118/error-should-not-import-the-named-export-version-imported-as-version -- 12/27/2021 MF
// * Now imports the entire package.json file because of changes needed to be made due to updates with webpack 5. -- 12/27/2021 MF
// import packageJSON from "../package.json";
// const applicationVersion = require("../package.json").version;
// const copyrightYear = require("../package.json").copyrightYear;
// * Using Vite requires a different syntax. -- 09/22/2023 MF
import { version, copyrightYear } from '../package.json';
const applicationVersion = version;

// const componentName = "index";

// console.log(componentName, "applicationVersion", applicationVersion);
// console.log(componentName, "copyrightYear", copyrightYear);

const routerBaseName = applicationSettings.routerBaseName;

// * Google Tag Manager -- 03/06/2021 MF
if (isEmpty(applicationSettings.tagManagerArgs.gtmId) === false) {

  TagManager.initialize(applicationSettings.tagManagerArgs);

};

document.getElementsByTagName("META")[3].content = applicationSettings.metaDescription;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={routerBaseName}>
        <App applicationVersion={applicationVersion} copyrightYear={copyrightYear} />
      </BrowserRouter>
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

