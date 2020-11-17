import {createSlice} from "@reduxjs/toolkit";

const componentName = "urlsSlice.js";

const initialState = {
  arrayURLs: [],
  urlsLoaded: false,
  pageURL: "",
  linkItem: {}
};

const urlsSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    loadArrayURLs: {
      reducer(state, action) {
        // console.log(componentName, "loadArrayURLs action.payload", action.payload);
        // console.log(componentName, "loadArrayURLs action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayURLs action.payload[i]", action.payload[i]);
          state.arrayURLs.push(action.payload[i]);
        };

        state.urlsLoaded = true;

      }
    },
    setPageURL: {
      reducer(state, action) {
        // console.log(componentName, "setPageURL action.payload", action.payload);

        state.pageURL = action.payload;

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

export const {loadArrayURLs, setPageURL, setLinkItem} = urlsSlice.actions;

export default urlsSlice.reducer;