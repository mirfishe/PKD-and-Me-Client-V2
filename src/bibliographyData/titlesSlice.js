import {createSlice} from "@reduxjs/toolkit";

// import initialState from "./titlesInitialState";

const initialState = {
  arrayTitles: [],
  titlesLoaded: false,
  titlesDataOffline: false,
  titleSort: "titleName"
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    loadArrayTitles: {
      reducer(state, action) {
        // console.log("titlesSlice.js loadArrayTitles action.payload", action.payload);
        // console.log("titlesSlice.js loadArrayTitles action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log("titlesSlice.js loadArrayTitles action.payload[i]", action.payload[i]);
          state.arrayTitles.push(action.payload[i]);
        };

        state.titlesLoaded = true;

      }
    },
    setTitlesDataOffline: {
      reducer(state, action) {
        // console.log("titlesSlice.js setTitlesDataOffline action.payload", action.payload);
        // console.log("titlesSlice.js setTitlesDataOffline action.payload.length", action.payload.length);

        state.titlesDataOffline = action.payload;

      }
    },
    setTitleSort: {
      reducer(state, action) {
        // console.log("titlesSlice.js setTitleSort action.payload", action.payload);
        // console.log("titlesSlice.js setTitleSort action.payload.length", action.payload.length);

        state.titleSort = action.payload;

      }
    }
}
});

export const {loadArrayTitles, setTitlesDataOffline, setTitleSort} = titlesSlice.actions;

export default titlesSlice.reducer;