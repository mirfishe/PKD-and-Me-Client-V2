import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime } from "../app/sharedFunctions";

const componentName = "mediaSlice.js";

const initialState = {
  arrayMedia: [],
  mediaLoaded: false,
  lastDatabaseRetrievalMedia: null,
  mediaDataOffline: false
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    loadArrayMedia: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "loadArrayMedia action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "loadArrayMedia action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "loadArrayMedia action.payload[i]", action.payload[i]);
          state.arrayMedia.push(action.payload[i]);
        };

        state.mediaLoaded = true;
        state.lastDatabaseRetrievalMedia = GetDateTime();

      }
    },
    addStateMedia: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "addStateMedia action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "addStateMedia action.payload.length", action.payload.length);

        // * Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "addStateMedia action.payload[i]", action.payload[i]);
          state.arrayMedia.push(action.payload[i]);
        };

      }
    },
    updateStateMedia: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "updateStateMedia action.payload", action.payload);

        const mediaItem = action.payload;
        let mediaItemIndex;
        // console.log(componentName, GetDateTime(), "updateStateMedia mediaItem", mediaItem);
        // console.log(componentName, GetDateTime(), "updateStateMedia mediaItem.mediaID", mediaItem.mediaID);

        if (typeof mediaItem === "object") {

          if (mediaItem.hasOwnProperty("mediaID")) {

            mediaItemIndex = state.arrayMedia.findIndex(media => media.mediaID === mediaItem.mediaID);

            // console.log(componentName, GetDateTime(), "updateStateMedia mediaItemIndex", mediaItemIndex);

            // state.arrayMedia[mediaItemIndex].mediaID = mediaItem.mediaID;
          };

          if (mediaItem.hasOwnProperty("media")) {
            state.arrayMedia[mediaItemIndex].media = mediaItem.media;
          };

          if (mediaItem.hasOwnProperty("electronic")) {
            state.arrayMedia[mediaItemIndex].electronic = mediaItem.electronic;
          };

          if (mediaItem.hasOwnProperty("sortID")) {
            state.arrayMedia[mediaItemIndex].sortID = mediaItem.sortID;
          };

          if (mediaItem.hasOwnProperty("active")) {
            state.arrayMedia[mediaItemIndex].active = mediaItem.active;
          };

          if (mediaItem.hasOwnProperty("updateDate")) {
            state.arrayMedia[mediaItemIndex].updateDate = mediaItem.updateDate;
          };

        };

      }
    },
    deleteStateMedia: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "deleteStateMedia action.payload", action.payload);

        // const mediaItemIndex = action.payload;
        let mediaListIndex;
        const mediaID = action.payload;

        // ? This doesn't work because state.arrayMedia isn't stored as an array of objects?
        // ? Need to copy the array?
        // const existingMediaIndex = state.arrayMedia.findIndex(media => media.mediaID === mediaID);
        // console.log(componentName, GetDateTime(), "deleteStateMedia existingMediaIndex", existingMediaIndex);

        if (IsEmpty(mediaID) === false) {

          mediaListIndex = state.arrayMedia.findIndex(media => media.mediaID === mediaID);

          // console.log(componentName, GetDateTime(), "deleteStateMedia mediaListIndex", mediaListIndex);

          state.arrayMedia.splice(mediaListIndex, 1);

        };

      }
    },
    setMediaDataOffline: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setMediaDataOffline action.payload", action.payload);

        state.mediaDataOffline = action.payload;

      }
    }
  }
});

export const { loadArrayMedia, addStateMedia, updateStateMedia, deleteStateMedia, setMediaDataOffline } = mediaSlice.actions;

export default mediaSlice.reducer;