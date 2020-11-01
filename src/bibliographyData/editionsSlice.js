import {createSlice} from "@reduxjs/toolkit";

// import initialState from "./editionsInitialState";

const initialState = {
  arrayEditions: [],
  editionsLoaded: false,
  editionsDataOffline: false
};

const editionsSlice = createSlice({
  name: "editions",
  initialState,
  reducers: {
    loadArrayEditions: {
      reducer(state, action) {
        // console.log("editionsSlice.js loadArrayEditions action.payload", action.payload);
        // console.log("editionsSlice.js loadArrayEditions action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log("editionsSlice.js loadArrayEditions action.payload[i]", action.payload[i]);
          state.arrayEditions.push(action.payload[i]);
        };

        state.editionsLoaded = true;

      }
    },
    setEditionsDataOffline: {
      reducer(state, action) {
        // console.log("editionsSlice.js setEditionsDataOffline action.payload", action.payload);
        // console.log("editionsSlice.js setEditionsDataOffline action.payload.length", action.payload.length);

        state.editionsDataOffline = action.payload;

      }
    }
}
});

export const {loadArrayEditions, setEditionsDataOffline} = editionsSlice.actions

export default editionsSlice.reducer