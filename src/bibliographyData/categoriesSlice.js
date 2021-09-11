import {createSlice} from "@reduxjs/toolkit";

const componentName = "categoriesSlice.js";

const initialState = {
  arrayCategories: [],
  categoriesLoaded: false,
  categoriesDataOffline: false
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    loadArrayCategories: {
      reducer(state, action) {
        // console.log(componentName, "loadArrayCategories action.payload", action.payload);
        // console.log(componentName, "loadArrayCategories action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayCategories action.payload[i]", action.payload[i]);
          state.arrayCategories.push(action.payload[i]);
        };

        state.categoriesLoaded = true;

      }
    },
    setCategoriesDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setCategoriesDataOffline action.payload", action.payload);
        // console.log(componentName, "setCategoriesDataOffline action.payload.length", action.payload.length);

        state.categoriesDataOffline = action.payload;

      }
    }
}
});

export const {loadArrayCategories, setCategoriesDataOffline} = categoriesSlice.actions;

export default categoriesSlice.reducer;