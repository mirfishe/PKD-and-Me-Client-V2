import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "../utilities/SharedFunctions";

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
    loadArrayURLs(state, action) {
      // console.log(componentName, GetDateTime(), "loadArrayURLs action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "loadArrayURLs action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, GetDateTime(), "loadArrayURLs action.payload[i]", action.payload[i]);
        state.arrayURLs.push(action.payload[i]);

      };

      state.urlsLoaded = true;

    },
    addStateURL(state, action) {
      // console.log(componentName, GetDateTime(), "addStateTitle action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "addStateTitle action.payload.length", action.payload.length);

      // Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, GetDateTime(), "addStateTitle action.payload[i]", action.payload[i]);
        state.arrayURLs.push(action.payload[i]);

      };

    },
    updateStateURL(state, action) {
      // console.log(componentName, GetDateTime(), "updateStateURL action.payload", action.payload);

      // ? Doesn't seem to be updating the state for some reason?

      const urlItem = action.payload;
      let urlListIndex;
      // console.log(componentName, GetDateTime(), "updateStateURL urlItem", urlItem);
      // console.log(componentName, GetDateTime(), "updateStateURL urlItem.linkID", urlItem.linkID);

      if (typeof urlItem === "object") {

        if (HasNonEmptyProperty(urlItem, "linkID") && HasNonEmptyProperty(urlItem, "linkType")) {

          urlListIndex = state.arrayURLs.findIndex(url => url.linkID === urlItem.linkID && url.linkType === urlItem.linkType);

          // console.log(componentName, GetDateTime(), "updateStateURL urlListIndex", urlListIndex);

          if (IsEmpty(urlListIndex) === false) {

            if (HasNonEmptyProperty(urlItem, "linkName")) {

              state.arrayURLs[urlListIndex].linkName = urlItem.linkName;

            };

            if (HasNonEmptyProperty(urlItem, "linkType")) {

              state.arrayURLs[urlListIndex].linkType = urlItem.linkType;

            };

            if (HasNonEmptyProperty(urlItem, "linkID")) {

              state.arrayURLs[urlListIndex].linkID = urlItem.linkID;

            };

            if (HasNonEmptyProperty(urlItem, "linkTypeNameID")) {

              state.arrayURLs[urlListIndex].linkTypeNameID = urlItem.linkTypeNameID;

            };

            if (HasNonEmptyProperty(urlItem, "linkTypeName")) {

              state.arrayURLs[urlListIndex].linkTypeName = urlItem.linkTypeName;

            };

          };

        };

      };

    },
    deleteStateURL(state, action) {
      // console.log(componentName, GetDateTime(), "deleteStateURL action.payload", action.payload);

      // const urlListIndex = action.payload;
      const urlItem = action.payload;
      let urlItemIndex;

      if (typeof urlItem === "object") {

        if (HasNonEmptyProperty(urlItem, "linkID") && HasNonEmptyProperty(urlItem, "linkType")) {

          urlItemIndex = state.arrayURLs.findIndex(url => url.linkID === urlItem.linkID && url.linkType === urlItem.linkType);

          // console.log(componentName, GetDateTime(), "deleteStateURL urlItemIndex", urlItemIndex);

          if (IsEmpty(urlItemIndex) === false) {

            state.arrayURLs.splice(urlItemIndex, 1);

          };

        };

      };

    },
    setPageURL(state, action) {
      // console.log(componentName, GetDateTime(), "setPageURL action.payload", action.payload);

      state.pageURL = action.payload;

    },
    setLinkItem(state, action) {
      // console.log(componentName, GetDateTime(), "setLinkItem action.payload", action.payload);

      state.linkItem = action.payload;

    }
  }
});

export const { loadArrayURLs, addStateURL, updateStateURL, deleteStateURL, setPageURL, setLinkItem } = urlsSlice.actions;

export default urlsSlice.reducer;