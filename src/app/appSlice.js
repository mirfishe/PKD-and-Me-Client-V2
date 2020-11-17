import {createSlice} from "@reduxjs/toolkit";

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
    electronicOnlyMessage: "",
    physicalOnly: false,
    physicalOnlyMessage: "",
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
        // console.log(componentName, "setAPI_URL action.payload", action.payload);

        state.hostname = action.payload;

      }
    },
    setProfileType: {
      reducer(state, action) {
        // console.log(componentName, "setAPI_URL action.payload", action.payload);

        state.profileType = action.payload;

      }
    },
    // setAPI_URL: {
    //   reducer(state, action) {
    //     // console.log(componentName, "setAPI_URL action.payload", action.payload);

    //     state.API_URL = action.payload;

    //   }
    // },
    // setBaseURL: {
    //     reducer(state, action) {
    //       // console.log(componentName, "setBaseURL action.payload", action.payload);
  
    //       state.baseURL = action.payload;
  
    //     }
    //   },
    setTagManagerArgsgtmId: {
        reducer(state, action) {
          // console.log(componentName, "setTagManagerArgsgtmId action.payload", action.payload);
  
          state.tagManagerArgsgtmId = action.payload;
  
        }
      },
    setSiteName: {
      reducer(state, action) {
        // console.log(componentName, "setSiteName action.payload", action.payload);

        state.siteName = action.payload;

      }
    },
    setAppName: {
      reducer(state, action) {
        // console.log(componentName, "setAppName action.payload", action.payload);

        state.appName = action.payload;

      }
    },
    setMetaDescription: {
      reducer(state, action) {
        // console.log(componentName, "setMetaDescription action.payload", action.payload);

        state.metaDescription = action.payload;

      }
    },
    setDefaultPageComponent: {
      reducer(state, action) {
        // console.log(componentName, "setDefaultPageComponent action.payload", action.payload);

        state.defaultPageComponent = action.payload;

      }
    },
    setRouterBaseName: {
      reducer(state, action) {
        // console.log(componentName, "setRouterBaseName action.payload", action.payload);

        state.routerBaseName = action.payload;

      }
    },
    setAppOffline: {
      reducer(state, action) {
        // console.log(componentName, "setAppOffline action.payload", action.payload);

        state.appOffline = action.payload;

      }
    },
    setElectronicOnly: {
      reducer(state, action) {
        // console.log(componentName, "setElectronicOnly action.payload", action.payload);

        state.electronicOnly = action.payload;

      }
    },
    setElectronicOnlyMessage: {
      reducer(state, action) {
        // console.log(componentName, "setElectronicOnlyMessage action.payload", action.payload);

        state.electronicOnlyMessage = action.payload;

      }
    },
    setPhysicalOnly: {
      reducer(state, action) {
        // console.log(componentName, "setPhysicalOnly action.payload", action.payload);

        state.physicalOnly = action.payload;

      }
    },
    setPhysicalOnlyMessage: {
      reducer(state, action) {
        // console.log(componentName, "setPhysicalOnlyMessage action.payload", action.payload);

        state.physicalOnlyMessage = action.payload;

      }
    },
    setAppSettingsLoaded: {
      reducer(state, action) {
        // console.log(componentName, "setAppSettingsLoaded action.payload", action.payload);

        state.appSettingsLoaded = action.payload;

      }
    },
    setAppSettingsJsonLoaded: {
      reducer(state, action) {
        // console.log(componentName, "setAppSettingsJsonLoaded action.payload", action.payload);

        state.appSettingsJsonLoaded = action.payload;

      }
    },
    setMenuSettings: {
      reducer(state, action) {
        // console.log(componentName, "setMenuSettings action.payload", action.payload);

        state.menuSettings = action.payload;

      }
    },
    setLinkItem: {
      reducer(state, action) {
        // console.log(componentName, "setLinkItem action.payload", action.payload);

        state.linkItem = action.payload;

      }
    }
}
});

export const {setHostname, setProfileType, /*setAPI_URL, setBaseURL,*/ setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setElectronicOnlyMessage, setPhysicalOnly, setPhysicalOnlyMessage, setAppSettingsLoaded, setAppSettingsJsonLoaded, setMenuSettings, setLinkItem} = appSlice.actions;

export default appSlice.reducer;