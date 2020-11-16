import {createSlice} from "@reduxjs/toolkit";

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
        // console.log(componentName, "loadArrayMedia action.payload", action.payload);
        // console.log(componentName, "loadArrayMedia action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayMedia action.payload[i]", action.payload[i]);
          state.arrayMedia.push(action.payload[i]);
        };

        state.mediaLoaded = true;
        state.lastDatabaseRetrievalMedia = new Date().toISOString();

      }
    },
    addStateMedia: {
      reducer(state, action) {
        // console.log(componentName, "addStateMedia action.payload", action.payload);
        // console.log(componentName, "addStateMedia action.payload.length", action.payload.length);

        // Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "addStateMedia action.payload[i]", action.payload[i]);
          state.arrayMedia.push(action.payload[i]);
        };

      }
    },
    updateStateMedia: {
      reducer(state, action) {
        // console.log(componentName, "updateStateMedia action.payload", action.payload);
        // console.log(componentName, "updateStateMedia action.payload.length", action.payload.length);

        const mediaItem = action.payload;
        const existingMedia = state.arrayMedia.find(media => media.mediaID === mediaItem.mediaID);
        console.log(componentName, "updateStateMedia existingMedia", existingMedia);

        if (existingMedia !== undefined) {
          // existingMedia.mediaID = mediaItem.mediaID;
          existingMedia.media = mediaItem.media;
          existingMedia.electronic = mediaItem.electronic;
          existingMedia.sortID = mediaItem.sortID;
          existingMedia.active = mediaItem.active;
          existingMedia.createdAt = mediaItem.createdAt;
          existingMedia.updatedAt = mediaItem.updatedAt;
        };

      }
    },
    deleteStateMedia: {
      reducer(state, action) {
        // console.log(componentName, "deleteStateMedia action.payload", action.payload);
        // console.log(componentName, "deleteStateMedia action.payload.length", action.payload.length);

        const mediaID = action.payload;

        const existingMediaIndex = state.arrayMedia.findIndex(media => media.mediaID === mediaID);
        console.log(componentName, "deleteStateMedia existingMediaIndex", existingMediaIndex);

        state.arrayMedia.splice(existingMediaIndex, 1);

      }
    },
    setMediaDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setMediaDataOffline action.payload", action.payload);
        // console.log(componentName, "setMediaDataOffline action.payload.length", action.payload.length);

        state.mediaDataOffline = action.payload;

      }
    }
}
});

export const {loadArrayMedia, addStateMedia, updateStateMedia, deleteStateMedia, setMediaDataOffline} = mediaSlice.actions;

export default mediaSlice.reducer;