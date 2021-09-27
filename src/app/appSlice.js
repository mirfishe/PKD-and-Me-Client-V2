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

    }
  }
});

export const { setHostname, setProfileType, /*setAPI_URL, setBaseURL,*/ setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setUserElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setUserPhysicalOnly, setPhysicalOnlyMessage, setAppAllowUserInteractions, setRequireUserLogin, setAppSettingsLoaded, setAppSettingsJsonLoaded, setMenuSettings, setLinkItem } = appSlice.actions;

export default appSlice.reducer;