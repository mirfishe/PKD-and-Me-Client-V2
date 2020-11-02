import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    siteName: "PKD and Me",
    baseURL: "",
    appOffline: false,
    electronicOnly: false,
    electronicOnlyMessage: "You are viewing elctronic only editions."
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setBaseURL: {
        reducer(state, action) {
          // console.log("appSlice.js setBaseURL action.payload", action.payload);
          // console.log("appSlice.js setBaseURL action.payload.length", action.payload.length);
  
          state.baseURL = action.payload;
  
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
    }
}
});

export const {setBaseURL, setAppOffline, setElectronicOnly} = appSlice.actions

export default appSlice.reducer