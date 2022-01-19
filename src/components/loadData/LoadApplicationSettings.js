import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import applicationSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../utilities/SharedFunctions";
import { LogError } from "../../utilities/ApplicationFunctions";
import { setHostname, setProfileType, setTagManagerArgsgtmId, setSiteName, setApplicationName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setApplicationOffline, setElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setPhysicalOnlyMessage, setApplicationAllowUserInteractions, setRequireUserLogin, setApplicationSettingsLoaded, setApplicationSettingsJsonLoaded, setMenuSettings } from "../../app/applicationSettingsSlice";

function LoadApplicationSettings() {

  const componentName = "LoadApplicationSettings.js";

  const dispatch = useDispatch();

  const applicationSettingsLoaded = useSelector(state => state.applicationSettings.applicationSettingsLoaded);


  // * Loads the settings from environment.js first and then if there are any settings in the applicationSettings.json file on the server, those override what was set in environment.js. -- 03/06/2021 MF
  const getApplicationSettings = () => {
    // console.log(componentName, GetDateTime(), "getApplicationSettings profileType", profileType);

    // * Load settings from environment.js into Redux. -- 03/06/2021 MF
    // const hostname = applicationSettings.hostname;
    dispatch(setHostname(applicationSettings.hostname));

    let profileType = applicationSettings.profileType;

    if (IsEmpty(profileType) === true) {

      profileType = "localhost";

    };

    dispatch(setProfileType(applicationSettings.profileType));

    // ! Loading the API_URL from the state store here is too slow
    // ! Always pulling it from environment.js. -- 03/06/2021 MF
    // let API_URL = applicationSettings.API_URL;
    // dispatch(setAPI_URL(applicationSettings.API_URL));

    // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
    // ! Always pulling it from environment.js. -- 03/06/2021 MF
    // let baseURL = applicationSettings.baseURL;
    // dispatch(setBaseURL(applicationSettings.baseURL));

    // let tagManagerArgsgtmId = applicationSettings.tagManagerArgs.gtmId;
    dispatch(setTagManagerArgsgtmId(applicationSettings.tagManagerArgs.gtmId));

    // let siteName = applicationSettings.siteName;
    dispatch(setSiteName(applicationSettings.siteName));

    // let applicationName = applicationSettings.applicationName;
    dispatch(setApplicationName(applicationSettings.applicationName));

    // let metaDescription = applicationSettings.metaDescription;
    dispatch(setMetaDescription(applicationSettings.metaDescription));

    // ! Loading the defaultPageComponent from the state store here is too slow
    // ! Always pulling it from environment.js. -- 03/06/2021 MF
    // let defaultPageComponent = applicationSettings.defaultPageComponent;
    dispatch(setDefaultPageComponent(applicationSettings.defaultPageComponent));

    // ! Loading the routerBaseName from the state store here is too slow
    // ! Always pulling it from environment.js. -- 03/06/2021 MF
    // let routerBaseName = applicationSettings.routerBaseName;
    dispatch(setRouterBaseName(applicationSettings.routerBaseName));

    // let applicationOffline = applicationSettings.applicationOffline;
    dispatch(setApplicationOffline(applicationSettings.applicationOffline));

    // let electronicOnly = applicationSettings.electronicOnly;
    dispatch(setElectronicOnly(applicationSettings.electronicOnly));

    // let electronicOnlyMessage = applicationSettings.electronicOnlyMessage;
    dispatch(setElectronicOnlyMessage(applicationSettings.electronicOnlyMessage));

    // let physicalOnly = applicationSettings.physicalOnly;
    dispatch(setPhysicalOnly(applicationSettings.physicalOnly));

    // let physicalOnlyMessage = applicationSettings.physicalOnlyMessage;
    dispatch(setPhysicalOnlyMessage(applicationSettings.physicalOnlyMessage));

    // let applicationAllowUserInteractions = applicationSettings.applicationAllowUserInteractions;
    dispatch(setApplicationAllowUserInteractions(applicationSettings.applicationAllowUserInteractions));

    // let requireUserLogin = applicationSettings.requireUserLogin;
    dispatch(setRequireUserLogin(applicationSettings.requireUserLogin));

    // let menuSettings = applicationSettings.menuSettings;
    dispatch(setMenuSettings(applicationSettings.menuSettings));

    dispatch(setApplicationSettingsLoaded(true));

    let url = "applicationSettings/" + profileType + ".json";

    // console.log(componentName, GetDateTime(), "getApplicationSettings url", url);

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getApplicationSettings response", response);

        if (!response.ok) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Categories data used.", categories: CategoryData};

        } else {

          return response.json();

        };

      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getApplicationSettings results", results);

        if (IsEmpty(results) === false && results.transactionSuccess === true) {

          // ! Don't change the profileType even if the applicationSettings are loaded from the .json file. -- 03/06/2021 MF
          // console.log(componentName, GetDateTime(), "getApplicationSettings results.profileType", results.profileType);

          // if IsEmpty(results.profileType) === false) {

          //     // profileType = results.profileType;
          //     dispatch(setProfileType(results.profileType));

          // };

          // ! Loading the API_URL from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF
          // console.log(componentName, GetDateTime(), "getApplicationSettings results.API_URL", results.API_URL);

          // if (IsEmpty(results.API_URL) === false) {

          //     // API_URL = results.API_URL;
          //     dispatch(setAPI_URL(results.API_URL));

          // };

          // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF
          // console.log(componentName, GetDateTime(), "getApplicationSettings results.baseURL", results.baseURL);

          // if (IsEmpty(results.baseURL) === false) {

          //     // baseURL = results.baseURL;
          //     dispatch(setBaseURL(results.baseURL));

          // };

          // ! Loading the tagManagerArgs from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF
          // console.log(componentName, GetDateTime(), "getApplicationSettings results.tagManagerArgs", results.tagManagerArgs);
          // console.log(componentName, GetDateTime(), "getApplicationSettings results.tagManagerArgs.gtmId", results.tagManagerArgs.gtmId);

          // if (IsEmpty(results.tagManagerArgs) === false && IsEmpty(results.tagManagerArgs.gtmId) === false) {

          //     // tagManagerArgsgtmId = results.tagManagerArgs.gtmId;
          //     dispatch(setTagManagerArgsgtmId(results.tagManagerArgs.gtmId));

          // };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.siteName", results.siteName);

          if (IsEmpty(results.siteName) === false) {

            // siteName = results.siteName;
            dispatch(setSiteName(results.siteName));

          };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.applicationName", results.applicationName);

          if (IsEmpty(results.applicationName) === false) {

            // applicationName = results.applicationName;
            dispatch(setApplicationName(results.applicationName));

          };

          // ! Loading the metaDescription from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF
          // console.log(componentName, GetDateTime(), "getApplicationSettings results.metaDescription", results.metaDescription);

          // if (IsEmpty(results.metaDescription) === false) {

          //     // metaDescription = results.metaDescription;
          //     dispatch(setMetaDescription(results.metaDescription));

          // };

          // ! Loading the defaultPageComponent from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF
          // console.log(componentName, GetDateTime(), "getApplicationSettings results.defaultPageComponent", results.defaultPageComponent);

          // if (IsEmpty(results.defaultPageComponent) === false) {

          //     // defaultPageComponent = results.defaultPageComponent;
          //     dispatch(setDefaultPageComponent(results.defaultPageComponent));

          // };

          // ! Loading the routerBaseName from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF
          // console.log(componentName, GetDateTime(), "getApplicationSettings results.routerBaseName", results.routerBaseName);

          // if (IsEmpty(results.routerBaseName) === false) {

          //     // routerBaseName = results.routerBaseName;
          //     dispatch(setRouterBaseName(results.routerBaseName));

          // };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.applicationOffline", results.applicationOffline);

          if (IsEmpty(results.applicationOffline) === false) {

            // applicationOffline = results.applicationOffline;
            dispatch(setApplicationOffline(results.applicationOffline));

          };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.electronicOnly", results.electronicOnly);

          if (IsEmpty(results.electronicOnly) === false) {

            // electronicOnly = results.electronicOnly;
            dispatch(setElectronicOnly(results.electronicOnly));

          };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.electronicOnlyMessage", results.electronicOnlyMessage);

          if (IsEmpty(results.electronicOnlyMessage) === false) {

            // electronicOnlyMessage = results.electronicOnlyMessage;
            dispatch(setElectronicOnlyMessage(results.electronicOnlyMessage));

          };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.physicalOnly", results.physicalOnly);

          if (IsEmpty(results.physicalOnly) === false) {

            // physicalOnly = results.physicalOnly;
            dispatch(setPhysicalOnly(results.physicalOnly));

          };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.physicalOnlyMessage", results.physicalOnlyMessage);

          if (IsEmpty(results.physicalOnlyMessage) === false) {

            // physicalOnlyMessage = results.physicalOnlyMessage;
            dispatch(setPhysicalOnlyMessage(results.physicalOnlyMessage));

          };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.applicationAllowUserInteractions", results.applicationAllowUserInteractions);

          if (IsEmpty(results.applicationAllowUserInteractions) === false) {

            // applicationAllowUserInteractions = results.applicationAllowUserInteractions;
            dispatch(setApplicationAllowUserInteractions(results.applicationAllowUserInteractions));

          };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.requireUserLogin", results.requireUserLogin);

          if (IsEmpty(results.requireUserLogin) === false) {

            // requireUserLogin = results.requireUserLogin;
            dispatch(setRequireUserLogin(results.requireUserLogin));

          };

          // * In case accidentally set both to true, then electronicOnly overides.
          if (results.physicalOnly && results.electronicOnly) {

            dispatch(setElectronicOnly(true));
            dispatch(setPhysicalOnly(false));

          };

          // console.log(componentName, GetDateTime(), "getApplicationSettings results.menuSettings", results.menuSettings);

          if (IsEmpty(results.menuSettings) === false) {

            // tagManagerArgsgtmId = results.menuSettings;
            dispatch(setMenuSettings(results.menuSettings));

          };

        } else {

          console.log(componentName, GetDateTime(), "getApplicationSettings error", results.message);

        };

        dispatch(setApplicationSettingsJsonLoaded(true));

      })
      .catch((error) => {
        console.error(componentName, GetDateTime(), "getApplicationSettings error", error);
        // console.error(componentName, GetDateTime(), "getApplicationSettings error.name", error.name);
        // console.error(componentName, GetDateTime(), "getApplicationSettings error.message", error.message);

        // let logErrorResult = LogError(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };

  useEffect(() => {

    // * Only load the applicationSettings data once per session unless the data is changed. -- 03/06/2021 MF
    if (!applicationSettingsLoaded) {

      getApplicationSettings();

    };

  }, []);

  return (
    <React.Fragment></React.Fragment>
  );
}

export default LoadApplicationSettings;
