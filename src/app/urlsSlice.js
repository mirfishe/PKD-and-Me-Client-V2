import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime } from "./sharedFunctions";

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
        // console.log(componentName, GetDateTime(), "loadArrayURLs action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "loadArrayURLs action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "loadArrayURLs action.payload[i]", action.payload[i]);
          state.arrayURLs.push(action.payload[i]);
        };

        state.urlsLoaded = true;

      }
    },
    addStateURL: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "addStateTitle action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "addStateTitle action.payload.length", action.payload.length);

        // Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "addStateTitle action.payload[i]", action.payload[i]);
          state.arrayURLs.push(action.payload[i]);
        };

      }
    },
    updateStateURL: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "updateStateURL action.payload", action.payload);

        // ? Doesn't seem to be updating the state for some reason?

        const urlItem = action.payload;
        let urlListIndex;
        // console.log(componentName, GetDateTime(), "updateStateURL urlItem", urlItem);
        // console.log(componentName, GetDateTime(), "updateStateURL urlItem.linkID", urlItem.linkID);

        if (typeof urlItem === "object") {

          if (urlItem.hasOwnProperty("linkID") && urlItem.hasOwnProperty("linkType")) {

            urlListIndex = state.arrayURLs.findIndex(url => url.linkID === urlItem.linkID && url.linkType === urlItem.linkType);

            // console.log(componentName, GetDateTime(), "updateStateURL urlListIndex", urlListIndex);

            if (IsEmpty(urlListIndex) === false) {

              if (urlItem.hasOwnProperty("linkName")) {
                state.arrayURLs[urlListIndex].linkName = urlItem.linkName;
              };

              if (urlItem.hasOwnProperty("linkType")) {
                state.arrayURLs[urlListIndex].linkType = urlItem.linkType;
              };

              if (urlItem.hasOwnProperty("linkID")) {
                state.arrayURLs[urlListIndex].linkID = urlItem.linkID;
              };

              if (urlItem.hasOwnProperty("linkTypeNameID")) {
                state.arrayURLs[urlListIndex].linkTypeNameID = urlItem.linkTypeNameID;
              };

              if (urlItem.hasOwnProperty("linkTypeName")) {
                state.arrayURLs[urlListIndex].linkTypeName = urlItem.linkTypeName;
              };

            };

          };

        };

      }
    },
    deleteStateURL: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "deleteStateURL action.payload", action.payload);

        // const urlListIndex = action.payload;
        const urlItem = action.payload;
        let urlItemIndex;

        if (typeof urlItem === "object") {

          if (urlItem.hasOwnProperty("linkID") && urlItem.hasOwnProperty("linkType")) {

            urlItemIndex = state.arrayURLs.findIndex(url => url.linkID === urlItem.linkID && url.linkType === urlItem.linkType);

            // console.log(componentName, GetDateTime(), "deleteStateURL urlItemIndex", urlItemIndex);

            if (IsEmpty(urlItemIndex) === false) {

              state.arrayURLs.splice(urlItemIndex, 1);

            };

          };

        };

      }
    },
    setPageURL: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setPageURL action.payload", action.payload);

        state.pageURL = action.payload;

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

export const { loadArrayURLs, addStateURL, updateStateURL, deleteStateURL, setPageURL, setLinkItem } = urlsSlice.actions;

export default urlsSlice.reducer;