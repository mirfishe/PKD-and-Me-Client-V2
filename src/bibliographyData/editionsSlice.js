import {createSlice} from "@reduxjs/toolkit";

const componentName = "editionsSlice.js";

const initialState = {
  arrayEditions: [],
  editionsLoaded: false,
  editionsDataOffline: false,
  editionSort: "titleName"
};

const editionsSlice = createSlice({
  name: "editions",
  initialState,
  reducers: {
    loadArrayEditions: {
      reducer(state, action) {
        // console.log(componentName, "loadArrayEditions action.payload", action.payload);
        // console.log(componentName, "loadArrayEditions action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayEditions action.payload[i]", action.payload[i]);
          state.arrayEditions.push(action.payload[i]);
        };

        state.editionsLoaded = true;

      }
    },
    setEditionsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setEditionsDataOffline action.payload", action.payload);
        // console.log(componentName, "setEditionsDataOffline action.payload.length", action.payload.length);

        state.editionsDataOffline = action.payload;

      }
    },
    setEditionSort: {
      reducer(state, action) {
        // console.log(componentName, "setEditionSort action.payload", action.payload);
        // console.log(componentName, "setEditionSort action.payload.length", action.payload.length);

        state.editionSort = action.payload;

      }
    }
}
});

export const {loadArrayEditions, setEditionsDataOffline, setEditionSort} = editionsSlice.actions;

export default editionsSlice.reducer;