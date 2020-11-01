import {createSlice} from "@reduxjs/toolkit";

// import initialState from "./mediaInitialState";

const initialState = {
  arrayMedia: [],
  mediaLoaded: false,
  mediaDataOffline: false
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    loadArrayMedia: {
      reducer(state, action) {
        // console.log("mediaSlice.js loadArrayMedia action.payload", action.payload);
        // console.log("mediaSlice.js loadArrayMedia action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log("mediaSlice.js loadArrayMedia action.payload[i]", action.payload[i]);
          state.arrayMedia.push(action.payload[i]);
        };

        state.mediaLoaded = true;

      }
    },
    setMediaDataOffline: {
      reducer(state, action) {
        // console.log("mediaSlice.js setMediaDataOffline action.payload", action.payload);
        // console.log("mediaSlice.js setMediaDataOffline action.payload.length", action.payload.length);

        state.mediaDataOffline = action.payload;

      }
    }
}
});

export const {loadArrayMedia, setMediaDataOffline} = mediaSlice.actions

export default mediaSlice.reducer