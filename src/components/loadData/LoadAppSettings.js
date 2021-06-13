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
      .then(data => {
        console.log(componentName, GetDateTime(), "getAppSettings data", data);

        if (data.resultsFound === true) {

          // ! Don't change the profileType even if the AppSettings are loaded from the .json file 
          // console.log(componentName, GetDateTime(), "getAppSettings data.profileType", data.profileType);
          // if IsEmpty(data.profileType) === false) {
          //     // profileType = data.profileType;
          //     dispatch(setProfileType(data.profileType));
          // };

          // ! Loading the API_URL from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings data.API_URL", data.API_URL);
          // if (IsEmpty(data.API_URL) === false) {
          //     // API_URL = data.API_URL;
          //     dispatch(setAPI_URL(data.API_URL));
          // };

          // ! Loading the baseURL from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings data.baseURL", data.baseURL);
          // if (IsEmpty(data.baseURL) === false) {
          //     // baseURL = data.baseURL;
          //     dispatch(setBaseURL(data.baseURL));
          // };

          // ! Loading the tagManagerArgs from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings data.tagManagerArgs", data.tagManagerArgs);
          // console.log(componentName, GetDateTime(), "getAppSettings data.tagManagerArgs.gtmId", data.tagManagerArgs.gtmId);
          // if (IsEmpty(data.tagManagerArgs) === false && IsEmpty(data.tagManagerArgs.gtmId) === false) {
          //     // tagManagerArgsgtmId = data.tagManagerArgs.gtmId;
          //     dispatch(setTagManagerArgsgtmId(data.tagManagerArgs.gtmId));
          // };

          // console.log(componentName, GetDateTime(), "getAppSettings data.siteName", data.siteName);
          if (IsEmpty(data.siteName) === false) {
            // siteName = data.siteName;
            dispatch(setSiteName(data.siteName));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings data.appName", data.appName);
          if (IsEmpty(data.appName) === false) {
            // appName = data.appName;
            dispatch(setAppName(data.appName));
          };

          // ! Loading the metaDescription from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings data.metaDescription", data.metaDescription);
          // if (IsEmpty(data.metaDescription) === false) {
          //     // metaDescription = data.metaDescription;
          //     dispatch(setMetaDescription(data.metaDescription));
          // };

          // ! Loading the defaultPageComponent from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings data.defaultPageComponent", data.defaultPageComponent);
          // if (IsEmpty(data.defaultPageComponent) === false) {
          //     // defaultPageComponent = data.defaultPageComponent;
          //     dispatch(setDefaultPageComponent(data.defaultPageComponent));
          // };

          // ! Loading the routerBaseName from the state store here is too slow
          // ! Always pulling it from environment.js
          // console.log(componentName, GetDateTime(), "getAppSettings data.routerBaseName", data.routerBaseName);
          // if (IsEmpty(data.routerBaseName) === false) {
          //     // routerBaseName = data.routerBaseName;
          //     dispatch(setRouterBaseName(data.routerBaseName));
          // };

          // console.log(componentName, GetDateTime(), "getAppSettings data.appOffline", data.appOffline);
          if (IsEmpty(data.appOffline) === false) {
            // appOffline = data.appOffline;
            dispatch(setAppOffline(data.appOffline));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings data.electronicOnly", data.electronicOnly);
          if (IsEmpty(data.electronicOnly) === false) {
            // electronicOnly = data.electronicOnly;
            dispatch(setElectronicOnly(data.electronicOnly));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings data.electronicOnlyMessage", data.electronicOnlyMessage);
          if (IsEmpty(data.electronicOnlyMessage) === false) {
            // electronicOnlyMessage = data.electronicOnlyMessage;
            dispatch(setElectronicOnlyMessage(data.electronicOnlyMessage));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings data.physicalOnly", data.physicalOnly);
          if (IsEmpty(data.physicalOnly) === false) {
            // physicalOnly = data.physicalOnly;
            dispatch(setPhysicalOnly(data.physicalOnly));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings data.physicalOnlyMessage", data.physicalOnlyMessage);
          if (IsEmpty(data.physicalOnlyMessage) === false) {
            // physicalOnlyMessage = data.physicalOnlyMessage;
            dispatch(setPhysicalOnlyMessage(data.physicalOnlyMessage));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings data.appAllowUserInteractions", data.appAllowUserInteractions);
          if (IsEmpty(data.appAllowUserInteractions) === false) {
            // appAllowUserInteractions = data.appAllowUserInteractions;
            dispatch(setAppAllowUserInteractions(data.appAllowUserInteractions));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings data.requireUserLogin", data.requireUserLogin);
          if (IsEmpty(data.requireUserLogin) === false) {
            // requireUserLogin = data.requireUserLogin;
            dispatch(setRequireUserLogin(data.requireUserLogin));
          };

          // * In case accidentally set both to true, then electronicOnly overides.
          if (data.physicalOnly && data.electronicOnly) {
            dispatch(setElectronicOnly(true));
            dispatch(setPhysicalOnly(false));
          };

          // console.log(componentName, GetDateTime(), "getAppSettings data.menuSettings", data.menuSettings);

          if (IsEmpty(data.menuSettings) === false) {
            // tagManagerArgsgtmId = data.menuSettings;
            dispatch(setMenuSettings(data.menuSettings));
          };

        } else {
          console.log(componentName, GetDateTime(), "getAppSettings resultsFound error", data.message);
        };

        dispatch(setAppSettingsJsonLoaded(true));

      })
      .catch(error => {
        console.log(componentName, GetDateTime(), "getAppSettings error", error);
        // console.log(componentName, GetDateTime(), "getAppSettings error.name", error.name);
        // console.log(componentName, GetDateTime(), "getAppSettings error.message", error.message);
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
