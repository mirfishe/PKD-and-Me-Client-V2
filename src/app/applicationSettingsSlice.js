import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, hasNonEmptyProperty } from "shared-functions";

const componentName = "applicationSettingsSlice";

const initialState = {
  applicationVersion: "",
  copyrightYear: "",
  computerLog: {},
  locationLogged: false,
  hostname: "",
  profileType: "",
  // API_URL: "",
  // baseURL: "",
  tagManagerArgsgtmId: "",
  siteName: "",
  applicationName: "",
  metaDescription: "",
  defaultPageComponent: "",
  routerBaseName: "",
  // applicationOffline: false,
  electronicOnly: false,
  userElectronicOnly: false,
  electronicOnlyMessage: "",
  physicalOnly: false,
  userPhysicalOnly: false,
  physicalOnlyMessage: "",
  applicationAllowUserInteractions: true,
  requireUserLogin: true,
  applicationSettingsLoaded: false,
  applicationSettingsJsonLoaded: false,
  menuSettings: {},
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

const applicationSettingsSlice = createSlice({
  name: "applicationSettings",
  initialState,
  reducers: {
    setApplicationVersion(state, action) {

      state.applicationVersion = action.payload;

    },
    setCopyrightYear(state, action) {

      state.copyrightYear = action.payload;

    },
    setLocationLogged(state, action) {

      state.locationLogged = action.payload;

    },
    addComputerLog(state, action) {

      // state.computerLog = action.payload;

      const computerLogItem = action.payload;

      if (typeof computerLogItem === "object") {

        // * From https://geolocation-db.com/json/ -- 09/27/2021 MF
        if (hasNonEmptyProperty(computerLogItem, "country_code") === true) {

          state.computerLog.countryCode = computerLogItem.country_code;

        };

        if (hasNonEmptyProperty(computerLogItem, "country_name") === true) {

          state.computerLog.countryName = computerLogItem.country_name;

        };

        if (hasNonEmptyProperty(computerLogItem, "city") === true) {

          state.computerLog.city = computerLogItem.city;

        };

        if (hasNonEmptyProperty(computerLogItem, "postal") === true) {

          state.computerLog.postal = computerLogItem.postal;

        };

        if (hasNonEmptyProperty(computerLogItem, "latitude") === true) {

          state.computerLog.latitude = computerLogItem.latitude;

        };

        if (hasNonEmptyProperty(computerLogItem, "longitude") === true) {

          state.computerLog.longitude = computerLogItem.longitude;

        };

        if (hasNonEmptyProperty(computerLogItem, "IPv4") === true) {

          state.computerLog.ipAddress = computerLogItem.IPv4;

        };

        if (hasNonEmptyProperty(computerLogItem, "state") === true) {

          state.computerLog.state = computerLogItem.state;

        };

        // * From https://api.db-ip.com/v2/free/self -- 09/27/2021 MF
        if (hasNonEmptyProperty(computerLogItem, "ipAddress") === true) {

          state.computerLog.ipAddress = computerLogItem.ipAddress;

        };

        if (hasNonEmptyProperty(computerLogItem, "continentCode") === true) {

          state.computerLog.continentCode = computerLogItem.continentCode;

        };

        if (hasNonEmptyProperty(computerLogItem, "continentName") === true) {

          state.computerLog.continentName = computerLogItem.continentName;

        };

        if (hasNonEmptyProperty(computerLogItem, "countryCode") === true) {

          state.computerLog.countryCode = computerLogItem.countryCode;

        };

        if (hasNonEmptyProperty(computerLogItem, "countryName") === true) {

          state.computerLog.countryName = computerLogItem.countryName;

        };

        if (hasNonEmptyProperty(computerLogItem, "stateProvCode") === true) {

          state.computerLog.stateProvCode = computerLogItem.stateProvCode;

        };

        if (hasNonEmptyProperty(computerLogItem, "stateProv") === true) {

          state.computerLog.state = computerLogItem.state;

        };

        if (hasNonEmptyProperty(computerLogItem, "city") === true) {

          state.computerLog.city = computerLogItem.city;

        };

      };

    },
    setHostname(state, action) {

      state.hostname = action.payload;

    },
    setProfileType(state, action) {

      state.profileType = action.payload;

    },
    // setAPI_URL(state, action) {

    //     state.API_URL = action.payload;

    // },
    // setBaseURL(state, action) {

    //       state.baseURL = action.payload;

    //   },
    setTagManagerArgsgtmId(state, action) {

      state.tagManagerArgsgtmId = action.payload;

    },
    setSiteName(state, action) {

      state.siteName = action.payload;

    },
    setApplicationName(state, action) {

      state.applicationName = action.payload;

    },
    setMetaDescription(state, action) {

      state.metaDescription = action.payload;

    },
    setDefaultPageComponent(state, action) {

      state.defaultPageComponent = action.payload;

    },
    setRouterBaseName(state, action) {

      state.routerBaseName = action.payload;

    },
    // setApplicationOffline(state, action) {

    //   state.applicationOffline = action.payload;

    // },
    setElectronicOnly(state, action) {

      state.electronicOnly = action.payload;

    },
    setUserElectronicOnly(state, action) {

      state.userElectronicOnly = action.payload;

    },
    setElectronicOnlyMessage(state, action) {

      state.electronicOnlyMessage = action.payload;

    },
    setPhysicalOnly(state, action) {

      state.physicalOnly = action.payload;

    },
    setUserPhysicalOnly(state, action) {

      state.userPhysicalOnly = action.payload;

    },
    setPhysicalOnlyMessage(state, action) {

      state.physicalOnlyMessage = action.payload;

    },
    setApplicationAllowUserInteractions(state, action) {

      state.applicationAllowUserInteractions = action.payload;

    },
    setRequireUserLogin(state, action) {

      state.requireUserLogin = action.payload;

    },
    setApplicationSettingsLoaded(state, action) {

      state.applicationSettingsLoaded = action.payload;

    },
    setApplicationSettingsJsonLoaded(state, action) {

      state.applicationSettingsJsonLoaded = action.payload;

    },
    setMenuSettings(state, action) {

      state.menuSettings = action.payload;

    },
    addInformationMessage(state, action) {


      if (isEmpty(action.payload) === false) {

        // * Make sure that the new phrase isn't in the existing information message. -- 09/27/2021 MF
        // if (state.informationMessage !== action.payload) {
        if (state.informationMessage.includes(action.payload) === false) {

          if (isEmpty(state.informationMessage) === false) {

            state.informationMessage = state.informationMessage + " ";
          };

          state.informationMessage = state.informationMessage + action.payload;

          if (isEmpty(action.payload) === false) {

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

      if (isEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing success message. -- 09/27/2021 MF
        // if (state.successMessage !== action.payload) {
        if (state.successMessage.includes(action.payload) === false) {


          if (isEmpty(state.successMessage) === false) {

            state.successMessage = state.successMessage + " ";

          };

          state.successMessage = state.successMessage + action.payload;

          if (isEmpty(action.payload) === false) {

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


      if (isEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing warning message. -- 09/27/2021 MF
        // if (state.warningMessage !== action.payload) {
        if (state.warningMessage.includes(action.payload) === false) {


          if (isEmpty(state.warningMessage) === false) {

            state.warningMessage = state.warningMessage + " ";

          };

          state.warningMessage = state.warningMessage + action.payload;

          if (isEmpty(action.payload) === false) {

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


      if (isEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing error message. -- 09/27/2021 MF
        // if (state.errorMessage !== action.payload) {
        if (state.errorMessage.includes(action.payload) === false) {


          if (isEmpty(state.errorMessage) === false) {

            state.errorMessage = state.errorMessage + " ";

          };

          state.errorMessage = state.errorMessage + action.payload;

          if (isEmpty(action.payload) === false) {

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

      state.showMessages = action.payload;

    }
  }
});

export const { setApplicationVersion, setCopyrightYear, setLocationLogged, addComputerLog, setHostname, setProfileType, /*setAPI_URL, setBaseURL,*/ setTagManagerArgsgtmId, setSiteName, setApplicationName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, /* setApplicationOffline, */ setElectronicOnly, setUserElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setUserPhysicalOnly, setPhysicalOnlyMessage, setApplicationAllowUserInteractions, setRequireUserLogin, setApplicationSettingsLoaded, setApplicationSettingsJsonLoaded, setMenuSettings, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages, setShowMessages } = applicationSettingsSlice.actions;

export default applicationSettingsSlice.reducer;