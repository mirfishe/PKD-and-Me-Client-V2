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
    addStateURL: {
      reducer(state, action) {
        // console.log(componentName, "addStateTitle action.payload", action.payload);
        // console.log(componentName, "addStateTitle action.payload.length", action.payload.length);

        // Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "addStateTitle action.payload[i]", action.payload[i]);
          state.arrayURLs.push(action.payload[i]);
        };

      }
    },
    updateStateURL: {
      reducer(state, action) {
        // console.log(componentName, "updateStateURL action.payload", action.payload);

        // Doesn't seem to be updating the state for some reason?

        const urlItem = action.payload;
        // console.log(componentName, "updateStateURL urlItem", urlItem);
        // console.log(componentName, "updateStateURL urlItem.linkID", urlItem.linkID);
        // console.log(componentName, "updateStateURL urlItem.urlListIndex", urlItem.urlListIndex);

        if (typeof urlItem === "object") {

          if (urlItem.hasOwnProperty("linkName")) {
            state.arrayURLs[urlItem.urlListIndex].linkName = urlItem.linkName;
          };
          if (urlItem.hasOwnProperty("linkType")) {
            state.arrayURLs[urlItem.urlListIndex].linkType = urlItem.linkType;
          };
          if (urlItem.hasOwnProperty("linkID")) {
            state.arrayURLs[urlItem.urlListIndex].linkID = urlItem.linkID;
          };
          if (urlItem.hasOwnProperty("linkTypeNameID")) {
            state.arrayURLs[urlItem.urlListIndex].linkTypeNameID = urlItem.linkTypeNameID;
          };
          if (urlItem.hasOwnProperty("linkTypeName")) {
            state.arrayURLs[urlItem.urlListIndex].linkTypeName = urlItem.linkTypeName;
          };

        };

      }
    },
    deleteStateURL: {
      reducer(state, action) {
        // console.log(componentName, "deleteStateURL action.payload", action.payload);

        const urlListIndex = action.payload;

        state.arrayURLs.splice(urlListIndex, 1);

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

export const {loadArrayURLs, addStateURL, updateStateURL, deleteStateURL, setPageURL, setLinkItem} = urlsSlice.actions;

export default urlsSlice.reducer;