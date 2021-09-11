import {createSlice} from "@reduxjs/toolkit";

const componentName = "mediaSlice.js";

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
        // console.log(componentName, "loadArrayMedia action.payload", action.payload);
        // console.log(componentName, "loadArrayMedia action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayMedia action.payload[i]", action.payload[i]);
          state.arrayMedia.push(action.payload[i]);
        };

        state.mediaLoaded = true;

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

export const {loadArrayMedia, setMediaDataOffline} = mediaSlice.actions;

export default mediaSlice.reducer;