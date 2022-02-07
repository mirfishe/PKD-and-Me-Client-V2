import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, displayValue, getDateTime, hasNonEmptyProperty } from "../utilities/SharedFunctions";

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
      // console.log(componentName, getDateTime(), "loadArrayURLs action.payload", action.payload);
      // console.log(componentName, getDateTime(), "loadArrayURLs action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, getDateTime(), "loadArrayURLs action.payload[i]", action.payload[i]);
        state.arrayURLs.push(action.payload[i]);

      };

      state.urlsLoaded = true;

    },
    addStateURL(state, action) {
      // console.log(componentName, getDateTime(), "addStateTitle action.payload", action.payload);
      // console.log(componentName, getDateTime(), "addStateTitle action.payload.length", action.payload.length);

      // Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, getDateTime(), "addStateTitle action.payload[i]", action.payload[i]);
        state.arrayURLs.push(action.payload[i]);

      };

    },
    updateStateURL(state, action) {
      // console.log(componentName, getDateTime(), "updateStateURL action.payload", action.payload);

      // ? Doesn't seem to be updating the state for some reason?

      const urlItem = action.payload;
      let urlListIndex;
      // console.log(componentName, getDateTime(), "updateStateURL urlItem", urlItem);
      // console.log(componentName, getDateTime(), "updateStateURL urlItem.linkID", urlItem.linkID);

      if (typeof urlItem === "object") {

        if (hasNonEmptyProperty(urlItem, "linkID") && hasNonEmptyProperty(urlItem, "linkType")) {

          urlListIndex = state.arrayURLs.findIndex(url => url.linkID === urlItem.linkID && url.linkType === urlItem.linkType);

          // console.log(componentName, getDateTime(), "updateStateURL urlListIndex", urlListIndex);

          if (isEmpty(urlListIndex) === false) {

            if (hasNonEmptyProperty(urlItem, "linkName")) {

              state.arrayURLs[urlListIndex].linkName = urlItem.linkName;

            };

            if (hasNonEmptyProperty(urlItem, "linkType")) {

              state.arrayURLs[urlListIndex].linkType = urlItem.linkType;

            };

            if (hasNonEmptyProperty(urlItem, "linkID")) {

              state.arrayURLs[urlListIndex].linkID = urlItem.linkID;

            };

            if (hasNonEmptyProperty(urlItem, "linkTypeNameID")) {

              state.arrayURLs[urlListIndex].linkTypeNameID = urlItem.linkTypeNameID;

            };

            if (hasNonEmptyProperty(urlItem, "linkTypeName")) {

              state.arrayURLs[urlListIndex].linkTypeName = urlItem.linkTypeName;

            };

          };

        };

      };

    },
    deleteStateURL(state, action) {
      // console.log(componentName, getDateTime(), "deleteStateURL action.payload", action.payload);

      // const urlListIndex = action.payload;
      const urlItem = action.payload;
      let urlItemIndex;

      if (typeof urlItem === "object") {

        if (hasNonEmptyProperty(urlItem, "linkID") && hasNonEmptyProperty(urlItem, "linkType")) {

          urlItemIndex = state.arrayURLs.findIndex(url => url.linkID === urlItem.linkID && url.linkType === urlItem.linkType);

          // console.log(componentName, getDateTime(), "deleteStateURL urlItemIndex", urlItemIndex);

          if (isEmpty(urlItemIndex) === false) {

            state.arrayURLs.splice(urlItemIndex, 1);

          };

        };

      };

    },
    setPageURL(state, action) {
      // console.log(componentName, getDateTime(), "setPageURL action.payload", action.payload);

      state.pageURL = action.payload;

    },
    setLinkItem(state, action) {
      // console.log(componentName, getDateTime(), "setLinkItem action.payload", action.payload);

      state.linkItem = action.payload;

    }
  }
});

export const { loadArrayURLs, addStateURL, updateStateURL, deleteStateURL, setPageURL, setLinkItem } = urlsSlice.actions;

export default urlsSlice.reducer;