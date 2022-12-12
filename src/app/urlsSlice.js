import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";

const componentName = "urlsSlice";

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

      if (isNonEmptyArray(action.payload) === true) {

        // state.arrayURLs = [];

        for (let i = 0; i < action.payload.length; i++) {

          state.arrayURLs.push(action.payload[i]);

        };

      };

      state.urlsLoaded = true;

    },
    // addStateURL(state, action) {

    //   // Could change this to accept an object and add that object to the store
    //   if (isNonEmptyArray(action.payload) === true) {

    //     // state.arrayURLs = [];

    //     for (let i = 0; i < action.payload.length; i++) {

    //       state.arrayURLs.push(action.payload[i]);

    //     };

    //   };

    // },
    // updateStateURL(state, action) {

    //   // ? Doesn't seem to be updating the state for some reason?

    //   const urlItem = action.payload;
    //   let urlListIndex;

    //   if (typeof urlItem === "object") {

    //     if (hasNonEmptyProperty(urlItem, "linkID") && hasNonEmptyProperty(urlItem, "linkType")) {

    //       urlListIndex = state.arrayURLs.findIndex(url => url.linkID === urlItem.linkID && url.linkType === urlItem.linkType);


    //       if (isEmpty(urlListIndex) === false) {

    //         if (hasNonEmptyProperty(urlItem, "linkName")) {

    //           state.arrayURLs[urlListIndex].linkName = urlItem.linkName;

    //         };

    //         if (hasNonEmptyProperty(urlItem, "linkType")) {

    //           state.arrayURLs[urlListIndex].linkType = urlItem.linkType;

    //         };

    //         if (hasNonEmptyProperty(urlItem, "linkID")) {

    //           state.arrayURLs[urlListIndex].linkID = urlItem.linkID;

    //         };

    //         if (hasNonEmptyProperty(urlItem, "linkTypeNameID")) {

    //           state.arrayURLs[urlListIndex].linkTypeNameID = urlItem.linkTypeNameID;

    //         };

    //         if (hasNonEmptyProperty(urlItem, "linkTypeName")) {

    //           state.arrayURLs[urlListIndex].linkTypeName = urlItem.linkTypeName;

    //         };

    //       };

    //     };

    //   };

    // },
    // deleteStateURL(state, action) {

    //   // const urlListIndex = action.payload;
    //   const urlItem = action.payload;
    //   let urlItemIndex;

    //   if (typeof urlItem === "object") {

    //     if (hasNonEmptyProperty(urlItem, "linkID") && hasNonEmptyProperty(urlItem, "linkType")) {

    //       urlItemIndex = state.arrayURLs.findIndex(url => url.linkID === urlItem.linkID && url.linkType === urlItem.linkType);


    //       if (isEmpty(urlItemIndex) === false) {

    //         state.arrayURLs.splice(urlItemIndex, 1);

    //       };

    //     };

    //   };

    // },
    setPageURL(state, action) {

      state.pageURL = action.payload;

    },
    setLinkItem(state, action) {

      state.linkItem = action.payload;

    }
  }
});

export const { loadArrayURLs, /* addStateURL, updateStateURL, deleteStateURL, */ setPageURL, setLinkItem } = urlsSlice.actions;

export default urlsSlice.reducer;