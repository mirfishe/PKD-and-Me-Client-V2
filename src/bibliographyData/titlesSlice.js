import {createSlice} from "@reduxjs/toolkit";

const componentName = "titlesSlice.js";

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
        // console.log(componentName, "loadArrayTitles action.payload", action.payload);
        // console.log(componentName, "loadArrayTitles action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayTitles action.payload[i]", action.payload[i]);
          state.arrayTitles.push(action.payload[i]);
        };

        state.titlesLoaded = true;

      }
    },
    setTitlesDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setTitlesDataOffline action.payload", action.payload);
        // console.log(componentName, "setTitlesDataOffline action.payload.length", action.payload.length);

        state.titlesDataOffline = action.payload;

      }
    },
    setTitleSort: {
      reducer(state, action) {
        // console.log(componentName, "setTitleSort action.payload", action.payload);
        // console.log(componentName, "setTitleSort action.payload.length", action.payload.length);

        state.titleSort = action.payload;

      }
    }
}
});

export const {loadArrayTitles, setTitlesDataOffline, setTitleSort} = titlesSlice.actions;

export default titlesSlice.reducer;