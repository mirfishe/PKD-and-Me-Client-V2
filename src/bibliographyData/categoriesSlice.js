import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime } from "../app/sharedFunctions";

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
        // console.log(componentName, GetDateTime(), "loadArrayCategories action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "loadArrayCategories action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "loadArrayCategories action.payload[i]", action.payload[i]);
          state.arrayCategories.push(action.payload[i]);
        };

        state.categoriesLoaded = true;
        state.lastDatabaseRetrievalCategories = new Date().toISOString();

      }
    },
    addStateCategory: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "addStateCategory action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "addStateCategory action.payload.length", action.payload.length);

        // * Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "addStateCategory action.payload[i]", action.payload[i]);
          state.arrayCategories.push(action.payload[i]);
        };

      }
    },
    updateStateCategory: {
      reducer(state, action) {
        console.log(componentName, GetDateTime(), "updateStateCategory action.payload", action.payload);

        const categoryItem = action.payload;
        console.log(componentName, GetDateTime(), "updateStateTitle categoryItem", categoryItem);
        console.log(componentName, GetDateTime(), "updateStateTitle categoryItem.categoryID", categoryItem.categoryID);
        console.log(componentName, GetDateTime(), "updateStateTitle categoryItem.categoryItemIndex", categoryItem.categoryItemIndex);

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

          if (categoryItem.hasOwnProperty("updateDate")) {
            state.arrayCategories[categoryItem.categoryItemIndex].updateDate = categoryItem.updateDate;
          };

        };

      }
    },
    deleteStateCategory: {
      reducer(state, action) {
        console.log(componentName, GetDateTime(), "deleteStateCategory action.payload", action.payload);

        const categoryItemIndex = action.payload;
        // const categoryID = action.payload;

        // ? This doesn't work because state.arrayCategories isn't stored as an array of objects?
        // ? Need to copy the array?
        // const existingCategoryIndex = state.arrayCategories.findIndex(category => category.categoryID === categoryID);
        // console.log(componentName, GetDateTime(), "deleteStateCategory existingCategoryIndex", existingCategoryIndex);

        state.arrayCategories.splice(categoryItemIndex, 1);

      }
    },
    setCategoriesDataOffline: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setCategoriesDataOffline action.payload", action.payload);

        state.categoriesDataOffline = action.payload;

      }
    }
  }
});

export const { loadArrayCategories, addStateCategory, updateStateCategory, deleteStateCategory, setCategoriesDataOffline } = categoriesSlice.actions;

export default categoriesSlice.reducer;