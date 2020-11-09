import {createSlice} from "@reduxjs/toolkit";

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
        // console.log("urlsSlice.js loadArrayURLs action.payload", action.payload);
        // console.log("urlsSlice.js loadArrayURLs action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log("urlsSlice.js loadArrayURLs action.payload[i]", action.payload[i]);
          state.arrayURLs.push(action.payload[i]);
        };

        state.urlsLoaded = true;

      }
    },
    setPageURL: {
      reducer(state, action) {
        // console.log("urlsSlice.js setPageURL action.payload", action.payload);
        // console.log("urlsSlice.js setPageURL action.payload.length", action.payload.length);

        state.pageURL = action.payload;

      }
    },
    setLinkItem: {
      reducer(state, action) {
        // console.log("urlsSlice.js setLinkItem action.payload", action.payload);
        // console.log("urlsSlice.js setLinkItem action.payload.length", action.payload.length);

        state.linkItem = action.payload;

      }
    }
}
});

export const {loadArrayURLs, setPageURL, setLinkItem} = urlsSlice.actions;

export default urlsSlice.reducer;