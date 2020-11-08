import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  arrayURLs: [],
  urlsLoaded: false
};

const urlsSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    loadArrayURLs: {
      reducer(state, action) {
        // console.log("urlsSlice.js loadArrayURLs action.payload", action.payload);
        // console.log("urlsSlice.js loadArrayURLs action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log("urlsSlice.js loadArrayURLs action.payload[i]", action.payload[i]);
          state.arrayURLs.push(action.payload[i]);
        };

        state.urlsLoaded = true;

      }
    }
}
});

export const {loadArrayURLs} = urlsSlice.actions;

export default urlsSlice.reducer;