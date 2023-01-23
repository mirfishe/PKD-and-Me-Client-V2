import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, tryParseJSON, getQueryStringData, addErrorLog } from "shared-functions";
import { setHostname, setProfileType, setTagManagerArgsgtmId, setSiteName, setApplicationName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setApplicationOffline, setElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setPhysicalOnlyMessage, setApplicationAllowUserInteractions, setRequireUserLogin, setApplicationSettingsLoaded, setApplicationSettingsJsonLoaded, setMenuSettings } from "../../app/applicationSettingsSlice";

function LoadApplicationSettings() {

  const componentName = "LoadApplicationSettings";

  const dispatch = useDispatch();

  // const profileType = useSelector(state => state.applicationSettings.profileType);
  const applicationOffline = useSelector(state => state.applicationSettings.applicationOffline);
  const applicationSettingsLoaded = useSelector(state => state.applicationSettings.applicationSettingsLoaded);
  const applicationSettingsJsonLoaded = useSelector(state => state.applicationSettings.applicationSettingsJsonLoaded);


  useEffect(() => {

    // * Only load the applicationSettings data once per session unless the data is changed. -- 03/06/2021 MF
    if (applicationSettingsLoaded !== true) {

      getApplicationSettings();

    };

  }, []);


  // * Loads the settings from environment.js first and then if there are any settings in the applicationSettings.json file on the server, those override what was set in environment.js. -- 03/06/2021 MF
  const getApplicationSettings = () => {

    // * Load settings from environment.js into Redux. -- 03/06/2021 MF

    dispatch(setHostname(applicationSettings.hostname));

    let newProfileType = applicationSettings.profileType;

    if (isEmpty(newProfileType) === true) {

      newProfileType = "localhost";

    };

    let queryStringData = getQueryStringData();

    // * Retreive the queryString values if there are any. -- 05/10/2022 MF
    let profileTypeQueryString = isEmpty(queryStringData) === false && isEmpty(queryStringData.profileType) === false ? queryStringData.profileType : null;

    if (isEmpty(profileTypeQueryString) === false) {

      newProfileType = profileTypeQueryString;

    };

    dispatch(setProfileType(newProfileType));

    dispatch(setTagManagerArgsgtmId(applicationSettings.tagManagerArgs.gtmId));

    dispatch(setMetaDescription(applicationSettings.metaDescription));

    dispatch(setDefaultPageComponent(applicationSettings.defaultPageComponent));

    dispatch(setRouterBaseName(applicationSettings.routerBaseName));

    dispatch(setApplicationSettingsLoaded(true));

    let url = "applicationSettings/" + newProfileType + ".json";

    fetch(url)
      .then(results => {

        if (results.ok !== true) {

          // throw Error(results.status + " " + results.statusText + " " + results.url);
          // * Load offline data. -- 03/06/2021 MF
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Categories data used.", categories: CategoryData};

        } else {

          // return results.json();
          return results.text();

        };

      })
      .then(results => {

        // * Verifies that the data returned is in correct JSON format. -- 04/19/2021 MF
        let jsonData = tryParseJSON(results);

        if (isEmpty(jsonData) === false && jsonData !== false) {

          if (isEmpty(jsonData.siteName) === false) {

            dispatch(setSiteName(jsonData.siteName));

          };

          if (isEmpty(jsonData.applicationName) === false) {

            dispatch(setApplicationName(jsonData.applicationName));

          };

          if (isEmpty(jsonData.electronicOnly) === false) {

            dispatch(setElectronicOnly(jsonData.electronicOnly));

          };

          if (isEmpty(jsonData.electronicOnlyMessage) === false) {

            dispatch(setElectronicOnlyMessage(jsonData.electronicOnlyMessage));

          };

          if (isEmpty(jsonData.physicalOnly) === false) {

            dispatch(setPhysicalOnly(jsonData.physicalOnly));

          };

          if (isEmpty(jsonData.physicalOnlyMessage) === false) {

            dispatch(setPhysicalOnlyMessage(jsonData.physicalOnlyMessage));

          };

          if (isEmpty(jsonData.applicationAllowUserInteractions) === false) {

            dispatch(setApplicationAllowUserInteractions(jsonData.applicationAllowUserInteractions));

          };

          if (isEmpty(jsonData.requireUserLogin) === false) {

            dispatch(setRequireUserLogin(jsonData.requireUserLogin));

          };

          // * In case accidentally set both to true, then electronicOnly overides.
          if (jsonData.physicalOnly && jsonData.electronicOnly) {

            dispatch(setElectronicOnly(true));
            dispatch(setPhysicalOnly(false));

          };

          if (isEmpty(jsonData.menuSettings) === false) {

            dispatch(setMenuSettings(jsonData.menuSettings));

          };

        };

        dispatch(setApplicationSettingsJsonLoaded(true));

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), "getApplicationSettings error", error);
        // console.error(componentName, getDateTime(), "getApplicationSettings error.name", error.name);
        // console.error(componentName, getDateTime(), "getApplicationSettings error.message", error.message);

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <React.Fragment></React.Fragment>
  );
}

export default LoadApplicationSettings;
