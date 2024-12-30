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
// * https://stackoverflow.com/questions/66384368/how-is-it-possible-to-access-homepage-from-package-json-in-a-react-app -- 12/17/2021 MF
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
