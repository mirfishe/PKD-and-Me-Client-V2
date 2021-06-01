import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime } from "./sharedFunctions";

const componentName = "appSlice.js";

const initialState = {
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
  linkItem: {}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHostname: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setAPI_URL action.payload", action.payload);

        state.hostname = action.payload;

      }
    },
    setProfileType: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setAPI_URL action.payload", action.payload);

        state.profileType = action.payload;

      }
    },
    // setAPI_URL: {
    //   reducer(state, action) {
    //     // console.log(componentName, GetDateTime(), "setAPI_URL action.payload", action.payload);

    //     state.API_URL = action.payload;

    //   }
    // },
    // setBaseURL: {
    //     reducer(state, action) {
    //       // console.log(componentName, GetDateTime(), "setBaseURL action.payload", action.payload);

    //       state.baseURL = action.payload;

    //     }
    //   },
    setTagManagerArgsgtmId: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setTagManagerArgsgtmId action.payload", action.payload);

        state.tagManagerArgsgtmId = action.payload;

      }
    },
    setSiteName: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setSiteName action.payload", action.payload);

        state.siteName = action.payload;

      }
    },
    setAppName: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setAppName action.payload", action.payload);

        state.appName = action.payload;

      }
    },
    setMetaDescription: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setMetaDescription action.payload", action.payload);

        state.metaDescription = action.payload;

      }
    },
    setDefaultPageComponent: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setDefaultPageComponent action.payload", action.payload);

        state.defaultPageComponent = action.payload;

      }
    },
    setRouterBaseName: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setRouterBaseName action.payload", action.payload);

        state.routerBaseName = action.payload;

      }
    },
    setAppOffline: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setAppOffline action.payload", action.payload);

        state.appOffline = action.payload;

      }
    },
    setElectronicOnly: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setElectronicOnly action.payload", action.payload);

        state.electronicOnly = action.payload;

      }
    },
    setUserElectronicOnly: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setUserElectronicOnly action.payload", action.payload);

        state.userElectronicOnly = action.payload;

      }
    },
    setElectronicOnlyMessage: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setElectronicOnlyMessage action.payload", action.payload);

        state.electronicOnlyMessage = action.payload;

      }
    },
    setPhysicalOnly: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setPhysicalOnly action.payload", action.payload);

        state.physicalOnly = action.payload;

      }
    },
    setUserPhysicalOnly: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setUserPhysicalOnly action.payload", action.payload);

        state.userPhysicalOnly = action.payload;

      }
    },
    setPhysicalOnlyMessage: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setPhysicalOnlyMessage action.payload", action.payload);

        state.physicalOnlyMessage = action.payload;

      }
    },
    setAppAllowUserInteractions: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setAppAllowUserInteractions action.payload", action.payload);

        state.appAllowUserInteractions = action.payload;

      }
    },
    setRequireUserLogin: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setRequireUserLogin action.payload", action.payload);

        state.requireUserLogin = action.payload;

      }
    },
    setAppSettingsLoaded: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setAppSettingsLoaded action.payload", action.payload);

        state.appSettingsLoaded = action.payload;

      }
    },
    setAppSettingsJsonLoaded: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setAppSettingsJsonLoaded action.payload", action.payload);

        state.appSettingsJsonLoaded = action.payload;

      }
    },
    setMenuSettings: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setMenuSettings action.payload", action.payload);

        state.menuSettings = action.payload;

      }
    },
    setLinkItem: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setLinkItem action.payload", action.payload);

        state.linkItem = action.payload;

      }
    }
  }
});

export const { setHostname, setProfileType, /*setAPI_URL, setBaseURL,*/ setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setUserElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setUserPhysicalOnly, setPhysicalOnlyMessage, setAppAllowUserInteractions, setRequireUserLogin, setAppSettingsLoaded, setAppSettingsJsonLoaded, setMenuSettings, setLinkItem } = appSlice.actions;

export default appSlice.reducer;