import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";

const componentName = "categoriesSlice";

const initialState = {
  arrayCategories: [],
  categoriesLoaded: false,
  lastDatabaseRetrievalCategories: null,
  // categoriesDataOffline: false
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    loadArrayCategories(state, action) {

      if (isNonEmptyArray(action.payload) === true) {

        state.arrayCategories = [];

        for (let i = 0; i < action.payload.length; i++) {

          state.arrayCategories.push(action.payload[i]);

        };

      };

      state.categoriesLoaded = true;
      state.lastDatabaseRetrievalCategories = getDateTime();

    },
    // addStateCategory(state, action) {

    //   // * Could change this to accept an object and add that object to the store
    //   if (isNonEmptyArray(action.payload) === true) {

    //     for (let i = 0; i < action.payload.length; i++) {

    //       state.arrayCategories.push(action.payload[i]);

    //     };

    //   };

    // },
    // updateStateCategory(state, action) {

    //   let categoryItem = action.payload;
    //   let categoryItemIndex;

    //   if (typeof categoryItem === "object") {

    //     if (hasNonEmptyProperty(categoryItem, "categoryID") === true) {

    //       categoryItemIndex = state.arrayCategories.findIndex(category => category.categoryID === categoryItem.categoryID);

    //       // state.arrayCategories[categoryItemIndex].categoryID = categoryItem.categoryID;

    //     };

    //     if (hasNonEmptyProperty(categoryItem, "category") === true) {

    //       state.arrayCategories[categoryItemIndex].category = categoryItem.category;

    //     };

    //     if (hasNonEmptyProperty(categoryItem, "sortID") === true) {

    //       state.arrayCategories[categoryItemIndex].sortID = categoryItem.sortID;

    //     };

    //     if (hasNonEmptyProperty(categoryItem, "active") === true) {

    //       state.arrayCategories[categoryItemIndex].active = categoryItem.active;

    //     };

    //     if (hasNonEmptyProperty(categoryItem, "updateDate") === true) {

    //       state.arrayCategories[categoryItemIndex].updateDate = categoryItem.updateDate;

    //     };

    //   };

    // },
    // deleteStateCategory(state, action) {

    //   // let categoryItemIndex = action.payload;
    //   let categoryListIndex;
    //   let categoryID = action.payload;

    //   // ? This doesn't work because state.arrayCategories isn't stored as an array of objects?
    //   // ? Need to copy the array?
    //   // let existingCategoryIndex = state.arrayCategories.findIndex(category => category.categoryID === categoryID);

    //   if (isEmpty(categoryID) === false) {

    //     categoryListIndex = state.arrayCategories.findIndex(category => category.categoryID === categoryID);

    //     state.arrayCategories.splice(categoryListIndex, 1);

    //   };

    // },
    // setCategoriesDataOffline(state, action) {

    //   state.categoriesDataOffline = action.payload;

    // }
  }
});

export const { loadArrayCategories, /* addStateCategory, updateStateCategory, deleteStateCategory, */ /* setCategoriesDataOffline */ } = categoriesSlice.actions;

export default categoriesSlice.reducer;