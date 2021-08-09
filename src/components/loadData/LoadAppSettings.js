import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppSettings from "../../app/environment";
import { IsEmpty, DisplayValue, GetDateTime } from "../../app/sharedFunctions";
import { setHostname, setProfileType, setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setPhysicalOnlyMessage, setAppAllowUserInteractions, setRequireUserLogin, setAppSettingsLoaded, setAppSettingsJsonLoaded, setMenuSettings } from "../../app/appSlice";

function LoadAppSettings() {

  const componentName = "LoadAppSettings.js";

  const dispatch = useDispatch();

  const appSettingsLoaded = useSelector(state => state.app.appSettingsLoaded);


  // * Loads the settings from environment.js first and then if there are any settings in the AppSettings.json file on the server, those override what was set in environment.js
  const getAppSettings = () => {
    // console.log(componentName, GetDateTime(), "getAppSettings");
    // console.log(componentName, GetDateTime(), "getAppSettings profileType", profileType);

    // * Load settings from environment.js into Redux
    // const hostname = AppSettings.hostname;
    dispatch(setHostname(AppSettings.hostname));

    let profileType = AppSettings.profileType;
    if (IsEmpty(profileType) === true) {
      profileType = "localhost";
    };
    dispatch(setProfileType(AppSettings.profileType));

    // ! Loading the API_URL from the state store here is too slow
    // ! Always pulling it from environment.js
    // let API_URL = AppSettings.API_URL;
    // dispatch(setAPI_URL(AppSettings.API_URL));

    // ! Loading the baseURL from the state store here is too slow
    // ! Always pulling it from environment.js
    // let baseURL = AppSettings.baseURL;
    // dispatch(setBaseURL(AppSettings.baseURL));

    // let tagManagerArgsgtmId = AppSettings.tagManagerArgs.gtmId;
    dispatch(setTagManagerArgsgtmId(AppSettings.tagManagerArgs.gtmId));

    // let siteName = AppSettings.siteName;
    dispatch(setSiteName(AppSettings.siteName));

    // let appName = AppSettings.appName;
    dispatch(setAppName(AppSettings.appName));

    // let metaDescription = AppSettings.metaDescription;
    dispatch(setMetaDescription(AppSettings.metaDescription));

    // ! Loading the defaultPageComponent from the state store here is too slow
    // ! Always pulling it from environment.js
    // let defaultPageComponent = AppSettings.defaultPageComponent;
    dispatch(setDefaultPageComponent(AppSettings.defaultPageComponent));

    // ! Loading the routerBaseName from the state store here is too slow
    // ! Always pulling it from environment.js
    // let routerBaseName = AppSettings.routerBaseName;
    dispatch(setRouterBaseName(AppSettings.routerBaseName));

    // let appOffline = AppSettings.appOffline;
    dispatch(setAppOffline(AppSettings.appOffline));

    // let electronicOnly = AppSettings.electronicOnly;
    dispatch(setElectronicOnly(AppSettings.electronicOnly));

    // let electronicOnlyMessage = AppSettings.electronicOnlyMessage;
    dispatch(setElectronicOnlyMessage(AppSettings.electronicOnlyMessage));

    // let physicalOnly = AppSettings.physicalOnly;
    dispatch(setPhysicalOnly(AppSettings.physicalOnly));

    // let physicalOnlyMessage = AppSettings.physicalOnlyMessage;
    dispatch(setPhysicalOnlyMessage(AppSettings.physicalOnlyMessage));

    // let appAllowUserInteractions = AppSettings.appAllowUserInteractions;
    dispatch(setAppAllowUserInteractions(AppSettings.appAllowUserInteractions));

    // let requireUserLogin = AppSettings.requireUserLogin;
    dispatch(setRequireUserLogin(AppSettings.requireUserLogin));

    // let menuSettings = AppSettings.menuSettings;
    dispatch(setMenuSettings(AppSettings.menuSettings));

    dispatch(setAppSettingsLoaded(true));

    let url = "appSettings/" + profileType + ".json";

    // console.log(componentName, GetDateTime(), "getAppSettings url", url);

    fetch(url)
      .then(response => {
        // console.log(componentName, GetDateTime(), "getAppSettings response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * load offline data
          // return {resultsFound: true, message: "Offline Categories data used.", categories: CategoryData};
        } else {
          return response.json();
        };
      })
      .then(results => {
        // console.log(componentName, GetDateTime(), "getAppSettings results", results);

        if (IsEmpty(results) === false && results.resultsFound === true) {

          // ! Don't change the profileType even if the AppSettings are loaded from the .json file 
          // console.log(componentName, GetDateTime(), "getAppSettings results.profileType", results.profileType);
          // if IsEmpty(results.profileType) === false) {
          //     // profileType = results.profileType;
          //     dispatch(setProfileType(results.profileType));
          // };

          // ! Loading the API_URL from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings results.API_URL", results.API_URL);
          // if (IsEmpty(results.API_URL) === false) {
          //     // API_URL = results.API_URL;
          //     dispatch(setAPI_URL(results.API_URL));
          // };

          // ! Loading the baseURL from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings results.baseURL", results.baseURL);
          // if (IsEmpty(results.baseURL) === false) {
          //     // baseURL = results.baseURL;
          //     dispatch(setBaseURL(results.baseURL));
          // };

          // ! Loading the tagManagerArgs from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings results.tagManagerArgs", results.tagManagerArgs);
          // console.log(componentName, GetDateTime(), "getAppSettings results.tagManagerArgs.gtmId", results.tagManagerArgs.gtmId);
          // if (IsEmpty(results.tagManagerArgs) === false && IsEmpty(results.tagManagerArgs.gtmId) === false) {
          //     // tagManagerArgsgtmId = results.tagManagerArgs.gtmId;
          //     dispatch(setTagManagerArgsgtmId(results.tagManagerArgs.gtmId));
          // };

          // console.log(componentName, GetDateTime(), "getAppSettings results.siteName", results.siteName);
          if (IsEmpty(results.siteName) === false) {
            // siteName = results.siteName;
            dispatch(setSiteName(results.siteName));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings results.appName", results.appName);
          if (IsEmpty(results.appName) === false) {
            // appName = results.appName;
            dispatch(setAppName(results.appName));
          };

          // ! Loading the metaDescription from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings results.metaDescription", results.metaDescription);
          // if (IsEmpty(results.metaDescription) === false) {
          //     // metaDescription = results.metaDescription;
          //     dispatch(setMetaDescription(results.metaDescription));
          // };

          // ! Loading the defaultPageComponent from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings results.defaultPageComponent", results.defaultPageComponent);
          // if (IsEmpty(results.defaultPageComponent) === false) {
          //     // defaultPageComponent = results.defaultPageComponent;
          //     dispatch(setDefaultPageComponent(results.defaultPageComponent));
          // };

          // ! Loading the routerBaseName from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings results.routerBaseName", results.routerBaseName);
          // if (IsEmpty(results.routerBaseName) === false) {
          //     // routerBaseName = results.routerBaseName;
          //     dispatch(setRouterBaseName(results.routerBaseName));
          // };

          // console.log(componentName, GetDateTime(), "getAppSettings results.appOffline", results.appOffline);
          if (IsEmpty(results.appOffline) === false) {
            // appOffline = results.appOffline;
            dispatch(setAppOffline(results.appOffline));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings results.electronicOnly", results.electronicOnly);
          if (IsEmpty(results.electronicOnly) === false) {
            // electronicOnly = results.electronicOnly;
            dispatch(setElectronicOnly(results.electronicOnly));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings results.electronicOnlyMessage", results.electronicOnlyMessage);
          if (IsEmpty(results.electronicOnlyMessage) === false) {
            // electronicOnlyMessage = results.electronicOnlyMessage;
            dispatch(setElectronicOnlyMessage(results.electronicOnlyMessage));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings results.physicalOnly", results.physicalOnly);
          if (IsEmpty(results.physicalOnly) === false) {
            // physicalOnly = results.physicalOnly;
            dispatch(setPhysicalOnly(results.physicalOnly));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings results.physicalOnlyMessage", results.physicalOnlyMessage);
          if (IsEmpty(results.physicalOnlyMessage) === false) {
            // physicalOnlyMessage = results.physicalOnlyMessage;
            dispatch(setPhysicalOnlyMessage(results.physicalOnlyMessage));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings results.appAllowUserInteractions", results.appAllowUserInteractions);
          if (IsEmpty(results.appAllowUserInteractions) === false) {
            // appAllowUserInteractions = results.appAllowUserInteractions;
            dispatch(setAppAllowUserInteractions(results.appAllowUserInteractions));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings results.requireUserLogin", results.requireUserLogin);
          if (IsEmpty(results.requireUserLogin) === false) {
            // requireUserLogin = results.requireUserLogin;
            dispatch(setRequireUserLogin(results.requireUserLogin));
          };

          // * In case accidentally set both to true, then electronicOnly overides.
          if (results.physicalOnly && results.electronicOnly) {
            dispatch(setElectronicOnly(true));
            dispatch(setPhysicalOnly(false));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings results.menuSettings", results.menuSettings);

          if (IsEmpty(results.menuSettings) === false) {
            // tagManagerArgsgtmId = results.menuSettings;
            dispatch(setMenuSettings(results.menuSettings));
          };

        } else {
          console.log(componentName, GetDateTime(), "getAppSettings resultsFound error", results.message);
        };

        dispatch(setAppSettingsJsonLoaded(true));

      })
      .catch(error => {
        console.error(componentName, GetDateTime(), "getAppSettings error", error);
        // console.error(componentName, GetDateTime(), "getAppSettings error.name", error.name);
        // console.error(componentName, GetDateTime(), "getAppSettings error.message", error.message);
      });

  };

  useEffect(() => {
    // console.log(componentName, GetDateTime(), "useEffect");

    // * Only load the AppSettings data once per session unless the data is changed
    if (!appSettingsLoaded) {
      getAppSettings();
    };

  }, []);

  return (
    <React.Fragment></React.Fragment>
  );
}

export default LoadAppSettings;
