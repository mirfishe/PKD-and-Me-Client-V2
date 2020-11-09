import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    hostname: "",
    profileType: "",
    API_URL: "",
    baseURL: "",
    tagManagerArgsgtmId: "",
    siteName: "",
    appName: "",
    metaDescription: "",
    defaultPageComponent: "",
    routerBaseName: "",
    appOffline: false,
    electronicOnly: false,
    electronicOnlyMessage: "",
    linkItem: {}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHostname: {
      reducer(state, action) {
        // console.log("appSlice.js setAPI_URL action.payload", action.payload);
        // console.log("appSlice.js setAPI_URL action.payload.length", action.payload.length);

        state.hostname = action.payload;

      }
    },
    setProfileType: {
      reducer(state, action) {
        // console.log("appSlice.js setAPI_URL action.payload", action.payload);
        // console.log("appSlice.js setAPI_URL action.payload.length", action.payload.length);

        state.profileType = action.payload;

      }
    },
    setAPI_URL: {
      reducer(state, action) {
        // console.log("appSlice.js setAPI_URL action.payload", action.payload);
        // console.log("appSlice.js setAPI_URL action.payload.length", action.payload.length);

        state.API_URL = action.payload;

      }
    },
    setBaseURL: {
        reducer(state, action) {
          // console.log("appSlice.js setBaseURL action.payload", action.payload);
          // console.log("appSlice.js setBaseURL action.payload.length", action.payload.length);
  
          state.baseURL = action.payload;
  
        }
      },
    setTagManagerArgsgtmId: {
        reducer(state, action) {
          // console.log("appSlice.js setTagManagerArgsgtmId action.payload", action.payload);
          // console.log("appSlice.js setTagManagerArgsgtmId action.payload.length", action.payload.length);
  
          state.tagManagerArgsgtmId = action.payload;
  
        }
      },
    setSiteName: {
      reducer(state, action) {
        // console.log("appSlice.js setSiteName action.payload", action.payload);
        // console.log("appSlice.js setSiteName action.payload.length", action.payload.length);

        state.siteName = action.payload;

      }
    },
    setAppName: {
      reducer(state, action) {
        // console.log("appSlice.js setAppName action.payload", action.payload);
        // console.log("appSlice.js setAppName action.payload.length", action.payload.length);

        state.appName = action.payload;

      }
    },
    setMetaDescription: {
      reducer(state, action) {
        // console.log("appSlice.js setMetaDescription action.payload", action.payload);
        // console.log("appSlice.js setMetaDescription action.payload.length", action.payload.length);

        state.metaDescription = action.payload;

      }
    },
    setDefaultPageComponent: {
      reducer(state, action) {
        // console.log("appSlice.js setDefaultPageComponent action.payload", action.payload);
        // console.log("appSlice.js setDefaultPageComponent action.payload.length", action.payload.length);

        state.defaultPageComponent = action.payload;

      }
    },
    setRouterBaseName: {
      reducer(state, action) {
        // console.log("appSlice.js setRouterBaseName action.payload", action.payload);
        // console.log("appSlice.js setRouterBaseName action.payload.length", action.payload.length);

        state.routerBaseName = action.payload;

      }
    },
    setAppOffline: {
      reducer(state, action) {
        // console.log("appSlice.js setAppOffline action.payload", action.payload);
        // console.log("appSlice.js setAppOffline action.payload.length", action.payload.length);

        state.appOffline = action.payload;

      }
    },
    setElectronicOnly: {
      reducer(state, action) {
        // console.log("appSlice.js setElectronicOnly action.payload", action.payload);
        // console.log("appSlice.js setElectronicOnly action.payload.length", action.payload.length);

        state.electronicOnly = action.payload;

      }
    },
    setElectronicOnlyMessage: {
      reducer(state, action) {
        // console.log("appSlice.js setElectronicOnlyMessage action.payload", action.payload);
        // console.log("appSlice.js setElectronicOnlyMessage action.payload.length", action.payload.length);

        state.electronicOnlyMessage = action.payload;

      }
    },
    setLinkItem: {
      reducer(state, action) {
        // console.log("appSlice.js setLinkItem action.payload", action.payload);
        // console.log("appSlice.js setLinkItem action.payload.length", action.payload.length);

        state.linkItem = action.payload;

      }
    }
}
});

export const {setHostname, setProfileType, setAPI_URL, setBaseURL, setTagManagerArgsgtmId, setSiteName, setAppName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setAppOffline, setElectronicOnly, setElectronicOnlyMessage, setLinkItem} = appSlice.actions;

export default appSlice.reducer;