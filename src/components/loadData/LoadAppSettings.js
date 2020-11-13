import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AppSettings from "../../app/environment";
import {setHostname, setProfileType, setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setPhysicalOnlyMessage, setAppSettingsLoaded, setAppSettingsJsonLoaded, setMenuSettings} from "../../app/appSlice";

function LoadAppSettings() {

  const componentName = "LoadAppSettings.js";

  const dispatch = useDispatch();

  const appSettingsLoaded = useSelector(state => state.app.appSettingsLoaded);

  // Loads the settings from environment.js first and then if there are any settings in the AppSettings.json file on the server, those override what was set in environment.js
  const getAppSettings = () => {
    // console.log(componentName, "getAppSettings");
    // console.log(componentName, "getAppSettings profileType", profileType);

    // Load settings from environment.js into Redux
    // const hostname = AppSettings.hostname;
    dispatch(setHostname(AppSettings.hostname));

    let profileType = AppSettings.profileType;
    if (profileType === undefined || profileType === "") {
        profileType = "localhost";
    };
    dispatch(setProfileType(AppSettings.profileType));

    // Loading the API_URL from the state store here is too slow
    // Always pulling it from environment.js
    // let API_URL = AppSettings.API_URL;
    // dispatch(setAPI_URL(AppSettings.API_URL));

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
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

    // let defaultPageComponent = AppSettings.defaultPageComponent;
    dispatch(setDefaultPageComponent(AppSettings.defaultPageComponent));

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

    // let menuSettings = AppSettings.menuSettings;
    dispatch(setMenuSettings(AppSettings.menuSettings));

    dispatch(setAppSettingsLoaded(true));

    let url = "./appSettings/" + profileType + ".json";

    fetch(url)
    .then(response => {
        // console.log(componentName, "getAppSettings response", response);
        if (!response.ok) {
          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // load offline data
          // return {resultsFound: true, message: "Offline Categories data used.", categories: CategoryData};
        } else {
          return response.json();
        };
    })
    .then(data => {
        // console.log(componentName, "getAppSettings data", data);

        if (data.resultsFound === true) {

            // Don't change the profileType even if the AppSettings are loaded from the .json file 
            // console.log(componentName, "getAppSettings data.profileType", data.profileType);
            // if (data.profileType !== undefined && data.profileType !== "") {
            //     // profileType = data.profileType;
            //     dispatch(setProfileType(data.profileType));
            // };

            // Loading the API_URL from the state store here is too slow
            // Always pulling it from environment.js
            // console.log(componentName, "getAppSettings data.API_URL", data.API_URL);
            // if (data.API_URL !== undefined && data.API_URL !== "") {
            //     // API_URL = data.API_URL;
            //     dispatch(setAPI_URL(data.API_URL));
            // };

            // Loading the baseURL from the state store here is too slow
            // Always pulling it from environment.js
            // console.log(componentName, "getAppSettings data.baseURL", data.baseURL);
            // if (data.baseURL !== undefined && data.baseURL !== "") {
            //     // baseURL = data.baseURL;
            //     dispatch(setBaseURL(data.baseURL));
            // };

            // Loading the tagManagerArgs from the state store here is too slow
            // Always pulling it from environment.js
            // console.log(componentName, "getAppSettings data.tagManagerArgs", data.tagManagerArgs);
            // console.log(componentName, "getAppSettings data.tagManagerArgs.gtmId", data.tagManagerArgs.gtmId);
            // if (data.tagManagerArgs !== undefined && data.tagManagerArgs.gtmId !== undefined && data.tagManagerArgs.gtmId !== "") {
            //     // tagManagerArgsgtmId = data.tagManagerArgs.gtmId;
            //     dispatch(setTagManagerArgsgtmId(data.tagManagerArgs.gtmId));
            // };

            // console.log(componentName, "getAppSettings data.siteName", data.siteName);
            if (data.siteName !== undefined && data.siteName !== "") {
                // siteName = data.siteName;
                dispatch(setSiteName(data.siteName));
            };

            // console.log(componentName, "getAppSettings data.appName", data.appName);
            if (data.appName !== undefined && data.appName !== "") {
                // appName = data.appName;
                dispatch(setAppName(data.appName));
            };

            // Loading the metaDescription from the state store here is too slow
            // Always pulling it from environment.js
            // console.log(componentName, "getAppSettings data.metaDescription", data.metaDescription);
            // if (data.metaDescription !== undefined && data.metaDescription !== "") {
            //     // metaDescription = data.metaDescription;
            //     dispatch(setMetaDescription(data.metaDescription));
            // };

            // console.log(componentName, "getAppSettings data.defaultPageComponent", data.defaultPageComponent);
            if (data.defaultPageComponent !== undefined && data.defaultPageComponent !== "") {
                // defaultPageComponent = data.defaultPageComponent;
                dispatch(setDefaultPageComponent(data.defaultPageComponent));
            };

            // console.log(componentName, "getAppSettings data.routerBaseName", data.routerBaseName);
            if (data.routerBaseName !== undefined && data.routerBaseName !== "") {
                // routerBaseName = data.routerBaseName;
                dispatch(setRouterBaseName(data.routerBaseName));
            };

            // console.log(componentName, "getAppSettings data.appOffline", data.appOffline);
            if (data.appOffline !== undefined) {
                // appOffline = data.appOffline;
                dispatch(setAppOffline(data.appOffline));
            };

            // console.log(componentName, "getAppSettings data.electronicOnly", data.electronicOnly);
            if (data.electronicOnly !== undefined) {
                // electronicOnly = data.electronicOnly;
                dispatch(setElectronicOnly(data.electronicOnly));
            };

            // console.log(componentName, "getAppSettings data.electronicOnlyMessage", data.electronicOnlyMessage);
            if (data.electronicOnlyMessage !== undefined && data.electronicOnlyMessage !== "") {
                // electronicOnlyMessage = data.electronicOnlyMessage;
                dispatch(setElectronicOnlyMessage(data.electronicOnlyMessage));
            };

            // console.log(componentName, "getAppSettings data.physicalOnly", data.physicalOnly);
            if (data.physicalOnly !== undefined) {
                // physicalOnly = data.physicalOnly;
                dispatch(setPhysicalOnly(data.physicalOnly));
            };

            // console.log(componentName, "getAppSettings data.physicalOnlyMessage", data.physicalOnlyMessage);
            if (data.physicalOnlyMessage !== undefined && data.physicalOnlyMessage !== "") {
                // physicalOnlyMessage = data.physicalOnlyMessage;
                dispatch(setPhysicalOnlyMessage(data.physicalOnlyMessage));
            };

            // In case accidentally set both to true, then electronicOnly overides.
            if (data.physicalOnly && data.electronicOnly) {
                dispatch(setElectronicOnly(true));
                dispatch(setPhysicalOnly(false));
            };

            // console.log(componentName, "getAppSettings data.menuSettings", data.menuSettings);

            if (data.menuSettings !== undefined) {
                // tagManagerArgsgtmId = data.menuSettings;
                dispatch(setMenuSettings(data.menuSettings));
            };

        } else {
          console.log(componentName, "getAppSettings resultsFound error", data.message);
        };

        dispatch(setAppSettingsJsonLoaded(true));

    })
    .catch(error => {
        console.log(componentName, "getAppSettings error", error);
        // console.log(componentName, "getAppSettings error.name", error.name);
        // console.log(componentName, "getAppSettings error.message", error.message);
    });

  };

useEffect(() => {
    console.log(componentName, "useEffect");

    // Only load the AppSettings data once per session unless the data is changed
    if (!appSettingsLoaded) {
        getAppSettings();
    };

}, []);

  return (
    <React.Fragment></React.Fragment>
  );
}

export default LoadAppSettings;
