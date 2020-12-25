import {createSlice} from "@reduxjs/toolkit";

const componentName = "categoriesSlice.js";

const initialState = {
  arrayCategories: [],
  categoriesLoaded: false,
  lastDatabaseRetrievalCategories: null,
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
        state.lastDatabaseRetrievalCategories = new Date().toISOString();

      }
    },
    addStateCategory: {
      reducer(state, action) {
        // console.log(componentName, "addStateCategory action.payload", action.payload);
        // console.log(componentName, "addStateCategory action.payload.length", action.payload.length);

        // Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "addStateCategory action.payload[i]", action.payload[i]);
          state.arrayCategories.push(action.payload[i]);
        };

      }
    },
  updateStateCategory: {
    reducer(state, action) {
      console.log(componentName, "updateStateCategory action.payload", action.payload);

      const categoryItem = action.payload;
      console.log(componentName, "updateStateTitle categoryItem", categoryItem);
      console.log(componentName, "updateStateTitle categoryItem.categoryID", categoryItem.categoryID);
      console.log(componentName, "updateStateTitle categoryItem.categoryItemIndex", categoryItem.categoryItemIndex);

      if (typeof categoryItem === "object") {

        if (categoryItem.hasOwnProperty("category")) {
          state.arrayCategories[categoryItem.categoryItemIndex].category = categoryItem.category;
        };

        if (categoryItem.hasOwnProperty("sortID")) {
          state.arrayCategories[categoryItem.categoryItemIndex].sortID = categoryItem.sortID;
        };

        if (categoryItem.hasOwnProperty("active")) {
          state.arrayCategories[categoryItem.categoryItemIndex].active = categoryItem.active;
        };
        
        if (categoryItem.hasOwnProperty("updatedAt")) {
          state.arrayCategories[categoryItem.categoryItemIndex].updatedAt = categoryItem.updatedAt;
        };

      };

    }
  },
  deleteStateCategory: {
    reducer(state, action) {
      console.log(componentName, "deleteStateCategory action.payload", action.payload);

      const categoryItemIndex = action.payload;
      // const categoryID = action.payload;
      
      // This doesn't work because state.arrayCategories isn't stored as an array of objects?
      // Need to copy the array?
      // const existingCategoryIndex = state.arrayCategories.findIndex(category => category.categoryID === categoryID);
      // console.log(componentName, "deleteStateCategory existingCategoryIndex", existingCategoryIndex);

      state.arrayCategories.splice(categoryItemIndex, 1);

    }
  },
    setCategoriesDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setCategoriesDataOffline action.payload", action.payload);

        state.categoriesDataOffline = action.payload;

      }
    }
}
});

export const {loadArrayCategories, addStateCategory, updateStateCategory, deleteStateCategory, setCategoriesDataOffline} = categoriesSlice.actions;

export default categoriesSlice.reducer;