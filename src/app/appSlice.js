import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "../utilities/SharedFunctions";

const componentName = "appSlice.js";

const initialState = {
  // applicationVersion: "",
  // copyrightYear: "",
  computerLog: {},
  locationLogged: false,
  hostname: "",
  profileType: "",
  // API_URL: "",
  // baseURL: "",
  tagManagerArgsgtmId: "",
  siteName: "",
  appName: "",
  metaDescription: "",
  defaultPageComponent: "",
  routerBaseName: "",
  appOffline: false,
  electronicOnly: false,
  userElectronicOnly: false,
  electronicOnlyMessage: "",
  physicalOnly: false,
  userPhysicalOnly: false,
  physicalOnlyMessage: "",
  appAllowUserInteractions: true,
  requireUserLogin: true,
  appSettingsLoaded: false,
  appSettingsJsonLoaded: false,
  menuSettings: {},
  linkItem: {},
  informationMessage: "",
  informationMessageVisible: false,
  successMessage: "",
  successMessageVisible: false,
  warningMessage: "",
  warningMessageVisible: false,
  errorMessage: "",
  errorMessageVisible: false,
  showMessages: false
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // setApplicationVersion(state, action) {
    //   // console.log(componentName, GetDateTime(), "setApplicationVersion action.payload", action.payload);

    //   state.applicationVersion = action.payload;

    // },
    // setCopyrightYear(state, action) {
    //   // console.log(componentName, GetDateTime(), "setCopyrightYear action.payload", action.payload);

    //   state.copyrightYear = action.payload;

    // },
    setLocationLogged(state, action) {
      // console.log(componentName, GetDateTime(), "setLocationLogged action.payload", action.payload);

      state.locationLogged = action.payload;

    },
    addComputerLog(state, action) {
      // console.log(componentName, GetDateTime(), "addComputerLog action.payload", action.payload);

      // state.computerLog = action.payload;

      const computerLogItem = action.payload;
      // console.log(componentName, GetDateTime(), "addComputerLog computerLogItem", computerLogItem);

      if (typeof computerLogItem === "object") {

        // * From https://geolocation-db.com/json/ -- 09/27/2021 MF
        if (HasNonEmptyProperty(computerLogItem, "country_code") === true) {

          state.computerLog.countryCode = computerLogItem.country_code;

        };

        if (HasNonEmptyProperty(computerLogItem, "country_name") === true) {

          state.computerLog.countryName = computerLogItem.country_name;

        };

        if (HasNonEmptyProperty(computerLogItem, "city") === true) {

          state.computerLog.city = computerLogItem.city;

        };

        if (HasNonEmptyProperty(computerLogItem, "postal") === true) {

          state.computerLog.postal = computerLogItem.postal;

        };

        if (HasNonEmptyProperty(computerLogItem, "latitude") === true) {

          state.computerLog.latitude = computerLogItem.latitude;

        };

        if (HasNonEmptyProperty(computerLogItem, "longitude") === true) {

          state.computerLog.longitude = computerLogItem.longitude;

        };

        if (HasNonEmptyProperty(computerLogItem, "IPv4") === true) {

          state.computerLog.ipAddress = computerLogItem.IPv4;

        };

        if (HasNonEmptyProperty(computerLogItem, "state") === true) {

          state.computerLog.state = computerLogItem.state;

        };

        // * From https://api.db-ip.com/v2/free/self -- 09/27/2021 MF
        if (HasNonEmptyProperty(computerLogItem, "ipAddress") === true) {

          state.computerLog.ipAddress = computerLogItem.ipAddress;

        };

        if (HasNonEmptyProperty(computerLogItem, "continentCode") === true) {

          state.computerLog.continentCode = computerLogItem.continentCode;

        };

        if (HasNonEmptyProperty(computerLogItem, "continentName") === true) {

          state.computerLog.continentName = computerLogItem.continentName;

        };

        if (HasNonEmptyProperty(computerLogItem, "countryCode") === true) {

          state.computerLog.countryCode = computerLogItem.countryCode;

        };

        if (HasNonEmptyProperty(computerLogItem, "countryName") === true) {

          state.computerLog.countryName = computerLogItem.countryName;

        };

        if (HasNonEmptyProperty(computerLogItem, "stateProvCode") === true) {

          state.computerLog.stateProvCode = computerLogItem.stateProvCode;

        };

        if (HasNonEmptyProperty(computerLogItem, "stateProv") === true) {

          state.computerLog.state = computerLogItem.state;

        };

        if (HasNonEmptyProperty(computerLogItem, "city") === true) {

          state.computerLog.city = computerLogItem.city;

        };

      };

    },
    setHostname(state, action) {
      // console.log(componentName, GetDateTime(), "setAPI_URL action.payload", action.payload);

      state.hostname = action.payload;

    },
    setProfileType(state, action) {
      // console.log(componentName, GetDateTime(), "setAPI_URL action.payload", action.payload);

      state.profileType = action.payload;

    },
    // setAPI_URL(state, action) {
    //     // console.log(componentName, GetDateTime(), "setAPI_URL action.payload", action.payload);

    //     state.API_URL = action.payload;

    // },
    // setBaseURL(state, action) {
    //       // console.log(componentName, GetDateTime(), "setBaseURL action.payload", action.payload);

    //       state.baseURL = action.payload;

    //   },
    setTagManagerArgsgtmId(state, action) {
      // console.log(componentName, GetDateTime(), "setTagManagerArgsgtmId action.payload", action.payload);

      state.tagManagerArgsgtmId = action.payload;

    },
    setSiteName(state, action) {
      // console.log(componentName, GetDateTime(), "setSiteName action.payload", action.payload);

      state.siteName = action.payload;

    },
    setAppName(state, action) {
      // console.log(componentName, GetDateTime(), "setAppName action.payload", action.payload);

      state.appName = action.payload;

    },
    setMetaDescription(state, action) {
      // console.log(componentName, GetDateTime(), "setMetaDescription action.payload", action.payload);

      state.metaDescription = action.payload;

    },
    setDefaultPageComponent(state, action) {
      // console.log(componentName, GetDateTime(), "setDefaultPageComponent action.payload", action.payload);

      state.defaultPageComponent = action.payload;

    },
    setRouterBaseName(state, action) {
      // console.log(componentName, GetDateTime(), "setRouterBaseName action.payload", action.payload);

      state.routerBaseName = action.payload;

    },
    setAppOffline(state, action) {
      // console.log(componentName, GetDateTime(), "setAppOffline action.payload", action.payload);

      state.appOffline = action.payload;

    },
    setElectronicOnly(state, action) {
      // console.log(componentName, GetDateTime(), "setElectronicOnly action.payload", action.payload);

      state.electronicOnly = action.payload;

    },
    setUserElectronicOnly(state, action) {
      // console.log(componentName, GetDateTime(), "setUserElectronicOnly action.payload", action.payload);

      state.userElectronicOnly = action.payload;

    },
    setElectronicOnlyMessage(state, action) {
      // console.log(componentName, GetDateTime(), "setElectronicOnlyMessage action.payload", action.payload);

      state.electronicOnlyMessage = action.payload;

    },
    setPhysicalOnly(state, action) {
      // console.log(componentName, GetDateTime(), "setPhysicalOnly action.payload", action.payload);

      state.physicalOnly = action.payload;

    },
    setUserPhysicalOnly(state, action) {
      // console.log(componentName, GetDateTime(), "setUserPhysicalOnly action.payload", action.payload);

      state.userPhysicalOnly = action.payload;

    },
    setPhysicalOnlyMessage(state, action) {
      // console.log(componentName, GetDateTime(), "setPhysicalOnlyMessage action.payload", action.payload);

      state.physicalOnlyMessage = action.payload;

    },
    setAppAllowUserInteractions(state, action) {
      // console.log(componentName, GetDateTime(), "setAppAllowUserInteractions action.payload", action.payload);

      state.appAllowUserInteractions = action.payload;

    },
    setRequireUserLogin(state, action) {
      // console.log(componentName, GetDateTime(), "setRequireUserLogin action.payload", action.payload);

      state.requireUserLogin = action.payload;

    },
    setAppSettingsLoaded(state, action) {
      // console.log(componentName, GetDateTime(), "setAppSettingsLoaded action.payload", action.payload);

      state.appSettingsLoaded = action.payload;

    },
    setAppSettingsJsonLoaded(state, action) {
      // console.log(componentName, GetDateTime(), "setAppSettingsJsonLoaded action.payload", action.payload);

      state.appSettingsJsonLoaded = action.payload;

    },
    setMenuSettings(state, action) {
      // console.log(componentName, GetDateTime(), "setMenuSettings action.payload", action.payload);

      state.menuSettings = action.payload;

    },
    setLinkItem(state, action) {
      // console.log(componentName, GetDateTime(), "setLinkItem action.payload", action.payload);

      state.linkItem = action.payload;

    },
    addInformationMessage(state, action) {
      // console.log(componentName, GetDateTime(), "addInformationMessage action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "addInformationMessage state.informationMessage", state.informationMessage);

      // console.log(componentName, GetDateTime(), "addInformationMessage state.informationMessage", state.informationMessage);

      if (IsEmpty(action.payload) === false) {

        // * Make sure that the new phrase isn't in the existing information message. -- 09/27/2021 MF
        // if (state.informationMessage !== action.payload) {
        if (state.informationMessage.includes(action.payload) === false) {

          if (IsEmpty(state.informationMessage) === false) {

            state.informationMessage = state.informationMessage + " ";
          };

          state.informationMessage = state.informationMessage + action.payload;

          if (IsEmpty(action.payload) === false) {

            state.informationMessageVisible = true;

          } else {

            state.informationMessageVisible = false;

          };

        };

      } else {

        state.informationMessage = action.payload;
        state.informationMessageVisible = false;

      };

    },
    addSuccessMessage(state, action) {
      // console.log(componentName, GetDateTime(), "addSuccessMessage action.payload", action.payload);

      if (IsEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing success message. -- 09/27/2021 MF
        // if (state.successMessage !== action.payload) {
        if (state.successMessage.includes(action.payload) === false) {


          if (IsEmpty(state.successMessage) === false) {

            state.successMessage = state.successMessage + " ";

          };

          state.successMessage = state.successMessage + action.payload;

          if (IsEmpty(action.payload) === false) {

            state.successMessageVisible = true;

          } else {

            state.successMessageVisible = false;

          };

        };

      } else {

        state.successMessage = action.payload;
        state.successMessageVisible = false;

      };

    },
    addWarningMessage(state, action) {
      // console.log(componentName, GetDateTime(), "addWarningMessage action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "addWarningMessage state.warningMessage", state.warningMessage);

      // console.log(componentName, GetDateTime(), "addWarningMessage state.warningMessage", state.warningMessage);

      if (IsEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing warning message. -- 09/27/2021 MF
        // if (state.warningMessage !== action.payload) {
        if (state.warningMessage.includes(action.payload) === false) {


          if (IsEmpty(state.warningMessage) === false) {

            state.warningMessage = state.warningMessage + " ";

          };

          state.warningMessage = state.warningMessage + action.payload;

          if (IsEmpty(action.payload) === false) {

            state.warningMessageVisible = true;

          } else {

            state.warningMessageVisible = false;

          };

        };

      } else {

        state.warningMessage = action.payload;
        state.warningMessageVisible = false;

      };

    },
    addErrorMessage(state, action) {
      // console.log(componentName, GetDateTime(), "addErrorMessage action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "addErrorMessage state.errorMessage", state.errorMessage);

      // console.log(componentName, GetDateTime(), "addErrorMessage state.errorMessage", state.errorMessage);

      if (IsEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing error message. -- 09/27/2021 MF
        // if (state.errorMessage !== action.payload) {
        if (state.errorMessage.includes(action.payload) === false) {


          if (IsEmpty(state.errorMessage) === false) {

            state.errorMessage = state.errorMessage + " ";

          };

          state.errorMessage = state.errorMessage + action.payload;

          if (IsEmpty(action.payload) === false) {

            state.errorMessageVisible = true;

          } else {

            state.errorMessageVisible = false;

          };

        };

      } else {

        state.errorMessage = action.payload;
        state.errorMessageVisible = false;

      };

    },
    clearMessages(state, action) {
      // console.log(componentName, GetDateTime(), "clearMessages action.payload", action.payload);

      state.informationMessage = "";
      state.successMessage = "";
      state.warningMessage = "";
      state.errorMessage = "";

      state.informationMessageVisible = false;
      state.successMessageVisible = false;
      state.warningMessageVisible = false;
      state.errorMessageVisible = false;

    },
    setShowMessages(state, action) {
      // console.log(componentName, GetDateTime(), "setShowMessages action.payload", action.payload);

      state.showMessages = action.payload;

    }
  }
});

export const { /* setApplicationVersion, setCopyrightYear, */ setLocationLogged, addComputerLog, setHostname, setProfileType, /*setAPI_URL, setBaseURL,*/ setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setUserElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setUserPhysicalOnly, setPhysicalOnlyMessage, setAppAllowUserInteractions, setRequireUserLogin, setAppSettingsLoaded, setAppSettingsJsonLoaded, setMenuSettings, setLinkItem, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages, setShowMessages } = appSlice.actions;

export default appSlice.reducer;