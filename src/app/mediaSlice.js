import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, isNonEmptyArray, hasNonEmptyProperty } from "shared-functions";

const componentName = "mediaSlice";

const initialState = {
  arrayMedia: [],
  mediaLoaded: false,
  lastDatabaseRetrievalMedia: null,
  // mediaDataOffline: false
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    loadArrayMedia(state, action) {

      if (isNonEmptyArray(action.payload) === true) {

        state.arrayMedia = [];

        for (let i = 0; i < action.payload.length; i++) {

          state.arrayMedia.push(action.payload[i]);

        };

      };

      state.mediaLoaded = true;
      state.lastDatabaseRetrievalMedia = getDateTime();

    },
    // addStateMedia(state, action) {

    //   // * Could change this to accept an object and add that object to the store
    //   if (isNonEmptyArray(action.payload) === true) {

    //     for (let i = 0; i < action.payload.length; i++) {

    //       state.arrayMedia.push(action.payload[i]);

    //     };

    //   };

    // },
    // updateStateMedia(state, action) {

    //   let mediaItem = action.payload;
    //   let mediaItemIndex;

    //   if (typeof mediaItem === "object") {

    //     if (hasNonEmptyProperty(mediaItem, "mediaID") === true) {

    //       mediaItemIndex = state.arrayMedia.findIndex(media => media.mediaID === mediaItem.mediaID);

    //       // state.arrayMedia[mediaItemIndex].mediaID = mediaItem.mediaID;
    //     };

    //     if (hasNonEmptyProperty(mediaItem, "media") === true) {

    //       state.arrayMedia[mediaItemIndex].media = mediaItem.media;

    //     };

    //     if (hasNonEmptyProperty(mediaItem, "electronic") === true) {

    //       state.arrayMedia[mediaItemIndex].electronic = mediaItem.electronic;

    //     };

    //     if (hasNonEmptyProperty(mediaItem, "sortID") === true) {

    //       state.arrayMedia[mediaItemIndex].sortID = mediaItem.sortID;

    //     };

    //     if (hasNonEmptyProperty(mediaItem, "active") === true) {

    //       state.arrayMedia[mediaItemIndex].active = mediaItem.active;

    //     };

    //     if (hasNonEmptyProperty(mediaItem, "updateDate") === true) {

    //       state.arrayMedia[mediaItemIndex].updateDate = mediaItem.updateDate;

    //     };

    //   };

    // },
    // deleteStateMedia(state, action) {

    //   // let mediaItemIndex = action.payload;
    //   let mediaListIndex;
    //   let mediaID = action.payload;

    //   // ? This doesn't work because state.arrayMedia isn't stored as an array of objects?
    //   // ? Need to copy the array?
    //   // let existingMediaIndex = state.arrayMedia.findIndex(media => media.mediaID === mediaID);

    //   if (isEmpty(mediaID) === false) {

    //     mediaListIndex = state.arrayMedia.findIndex(media => media.mediaID === mediaID);

    //     state.arrayMedia.splice(mediaListIndex, 1);

    //   };

    // },
    // setMediaDataOffline(state, action) {

    //   state.mediaDataOffline = action.payload;

    // }
  }
});

export const { loadArrayMedia, /* addStateMedia, updateStateMedia, deleteStateMedia, */ /* setMediaDataOffline */ } = mediaSlice.actions;

export default mediaSlice.reducer;