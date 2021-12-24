import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "../utilities/SharedFunctions";

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
    loadArrayCategories(state, action) {
      // console.log(componentName, GetDateTime(), "loadArrayCategories action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "loadArrayCategories action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, GetDateTime(), "loadArrayCategories action.payload[i]", action.payload[i]);
        state.arrayCategories.push(action.payload[i]);

      };

      state.categoriesLoaded = true;
      state.lastDatabaseRetrievalCategories = GetDateTime();

    },
    addStateCategory(state, action) {
      // console.log(componentName, GetDateTime(), "addStateCategory action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "addStateCategory action.payload.length", action.payload.length);

      // * Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, GetDateTime(), "addStateCategory action.payload[i]", action.payload[i]);
        state.arrayCategories.push(action.payload[i]);

      };

    },
    updateStateCategory(state, action) {
      // console.log(componentName, GetDateTime(), "updateStateCategory action.payload", action.payload);

      const categoryItem = action.payload;
      let categoryItemIndex;
      // console.log(componentName, GetDateTime(), "updateStateTitle categoryItem", categoryItem);
      // console.log(componentName, GetDateTime(), "updateStateTitle categoryItem.categoryID", categoryItem.categoryID);

      if (typeof categoryItem === "object") {

        if (HasNonEmptyProperty(categoryItem, "categoryID")) {

          categoryItemIndex = state.arrayCategories.findIndex(category => category.categoryID === categoryItem.categoryID);

          // console.log(componentName, GetDateTime(), "updateStateUserReview categoryItemIndex", categoryItemIndex);

          // state.arrayCategories[categoryItemIndex].categoryID = categoryItem.categoryID;

        };

        if (HasNonEmptyProperty(categoryItem, "category")) {

          state.arrayCategories[categoryItemIndex].category = categoryItem.category;

        };

        if (HasNonEmptyProperty(categoryItem, "sortID")) {

          state.arrayCategories[categoryItemIndex].sortID = categoryItem.sortID;

        };

        if (HasNonEmptyProperty(categoryItem, "active")) {

          state.arrayCategories[categoryItemIndex].active = categoryItem.active;

        };

        if (HasNonEmptyProperty(categoryItem, "updateDate")) {

          state.arrayCategories[categoryItemIndex].updateDate = categoryItem.updateDate;

        };

      };

    },
    deleteStateCategory(state, action) {
      // console.log(componentName, GetDateTime(), "deleteStateCategory action.payload", action.payload);

      // const categoryItemIndex = action.payload;
      let categoryListIndex;
      const categoryID = action.payload;

      // ? This doesn't work because state.arrayCategories isn't stored as an array of objects?
      // ? Need to copy the array?
      // const existingCategoryIndex = state.arrayCategories.findIndex(category => category.categoryID === categoryID);
      // console.log(componentName, GetDateTime(), "deleteStateCategory existingCategoryIndex", existingCategoryIndex);

      if (IsEmpty(categoryID) === false) {

        categoryListIndex = state.arrayCategories.findIndex(category => category.categoryID === categoryID);

        // console.log(componentName, GetDateTime(), "updateStateUserReview categoryListIndex", categoryListIndex);

        state.arrayCategories.splice(categoryListIndex, 1);

      };

    },
    setCategoriesDataOffline(state, action) {
      // console.log(componentName, GetDateTime(), "setCategoriesDataOffline action.payload", action.payload);

      state.categoriesDataOffline = action.payload;

    }
  }
});

export const { loadArrayCategories, addStateCategory, updateStateCategory, deleteStateCategory, setCategoriesDataOffline } = categoriesSlice.actions;

export default categoriesSlice.reducer;