import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, displayValue } from "shared-functions";
import { addErrorLog } from "../../utilities/ApplicationFunctions";
import { setHostname, setProfileType, setTagManagerArgsgtmId, setSiteName, setApplicationName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, /* setApplicationOffline, */ setElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setPhysicalOnlyMessage, setApplicationAllowUserInteractions, setRequireUserLogin, setApplicationSettingsLoaded, setApplicationSettingsJsonLoaded, setMenuSettings } from "../../app/applicationSettingsSlice";

function LoadApplicationSettings() {

  const componentName = "LoadApplicationSettings";

  const dispatch = useDispatch();

  const applicationSettingsLoaded = useSelector(state => state.applicationSettings.applicationSettingsLoaded);


  useEffect(() => {

    // * Only load the applicationSettings data once per session unless the data is changed. -- 03/06/2021 MF
    if (applicationSettingsLoaded !== true) {

      getApplicationSettings();

    };

  }, []);


  // * Loads the settings from environment.js first and then if there are any settings in the applicationSettings.json file on the server, those override what was set in environment.js. -- 03/06/2021 MF
  const getApplicationSettings = () => {

    // * Load settings from environment.js into Redux. -- 03/06/2021 MF
    // const hostname = applicationSettings.hostname;
    dispatch(setHostname(applicationSettings.hostname));

    let profileType = applicationSettings.profileType;

    if (isEmpty(profileType) === true) {

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
    // dispatch(setApplicationOffline(applicationSettings.applicationOffline));

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


    fetch(url)
      .then(response => {

        if (response.ok !== true) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Categories data used.", categories: CategoryData};

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          // ! Don't change the profileType even if the applicationSettings are loaded from the .json file. -- 03/06/2021 MF

          // if isEmpty(results.profileType) === false) {

          //     // profileType = results.profileType;
          //     dispatch(setProfileType(results.profileType));

          // };

          // ! Loading the API_URL from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF

          // if (isEmpty(results.API_URL) === false) {

          //     // API_URL = results.API_URL;
          //     dispatch(setAPI_URL(results.API_URL));

          // };

          // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF

          // if (isEmpty(results.baseURL) === false) {

          //     // baseURL = results.baseURL;
          //     dispatch(setBaseURL(results.baseURL));

          // };

          // ! Loading the tagManagerArgs from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF

          // if (isEmpty(results.tagManagerArgs) === false && isEmpty(results.tagManagerArgs.gtmId) === false) {

          //     // tagManagerArgsgtmId = results.tagManagerArgs.gtmId;
          //     dispatch(setTagManagerArgsgtmId(results.tagManagerArgs.gtmId));

          // };

          if (isEmpty(results.siteName) === false) {

            // siteName = results.siteName;
            dispatch(setSiteName(results.siteName));

          };

          if (isEmpty(results.applicationName) === false) {

            // applicationName = results.applicationName;
            dispatch(setApplicationName(results.applicationName));

          };

          // ! Loading the metaDescription from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF

          // if (isEmpty(results.metaDescription) === false) {

          //     // metaDescription = results.metaDescription;
          //     dispatch(setMetaDescription(results.metaDescription));

          // };

          // ! Loading the defaultPageComponent from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF

          // if (isEmpty(results.defaultPageComponent) === false) {

          //     // defaultPageComponent = results.defaultPageComponent;
          //     dispatch(setDefaultPageComponent(results.defaultPageComponent));

          // };

          // ! Loading the routerBaseName from the state store here is too slow. -- 03/06/2021 MF
          // ! Always pulling it from environment.js. -- 03/06/2021 MF

          // if (isEmpty(results.routerBaseName) === false) {

          //     // routerBaseName = results.routerBaseName;
          //     dispatch(setRouterBaseName(results.routerBaseName));

          // };

          // if (isEmpty(results.applicationOffline) === false) {

          //   // applicationOffline = results.applicationOffline;
          //   dispatch(setApplicationOffline(results.applicationOffline));

          // };

          if (isEmpty(results.electronicOnly) === false) {

            // electronicOnly = results.electronicOnly;
            dispatch(setElectronicOnly(results.electronicOnly));

          };

          if (isEmpty(results.electronicOnlyMessage) === false) {

            // electronicOnlyMessage = results.electronicOnlyMessage;
            dispatch(setElectronicOnlyMessage(results.electronicOnlyMessage));

          };

          if (isEmpty(results.physicalOnly) === false) {

            // physicalOnly = results.physicalOnly;
            dispatch(setPhysicalOnly(results.physicalOnly));

          };

          if (isEmpty(results.physicalOnlyMessage) === false) {

            // physicalOnlyMessage = results.physicalOnlyMessage;
            dispatch(setPhysicalOnlyMessage(results.physicalOnlyMessage));

          };

          if (isEmpty(results.applicationAllowUserInteractions) === false) {

            // applicationAllowUserInteractions = results.applicationAllowUserInteractions;
            dispatch(setApplicationAllowUserInteractions(results.applicationAllowUserInteractions));

          };

          if (isEmpty(results.requireUserLogin) === false) {

            // requireUserLogin = results.requireUserLogin;
            dispatch(setRequireUserLogin(results.requireUserLogin));

          };

          // * In case accidentally set both to true, then electronicOnly overides.
          if (results.physicalOnly && results.electronicOnly) {

            dispatch(setElectronicOnly(true));
            dispatch(setPhysicalOnly(false));

          };

          if (isEmpty(results.menuSettings) === false) {

            // tagManagerArgsgtmId = results.menuSettings;
            dispatch(setMenuSettings(results.menuSettings));

          };

        } else {

          console.error(componentName, getDateTime(), "getApplicationSettings error", results.message);

        };

        dispatch(setApplicationSettingsJsonLoaded(true));

      })
      .catch((error) => {
        console.error(componentName, getDateTime(), "getApplicationSettings error", error);
        // console.error(componentName, getDateTime(), "getApplicationSettings error.name", error.name);
        // console.error(componentName, getDateTime(), "getApplicationSettings error.message", error.message);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <React.Fragment></React.Fragment>
  );
}

export default LoadApplicationSettings;
