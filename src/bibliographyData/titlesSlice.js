import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "../app/sharedFunctions";

const componentName = "titlesSlice.js";

const initialState = {
  arrayTitles: [],
  titlesLoaded: false,
  lastDatabaseRetrievalTitles: null,
  titlesDataOffline: false,
  titleSortBy: "titleName"
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    loadArrayTitles(state, action) {
      // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {
        // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
        state.arrayTitles.push(action.payload[i]);
      };

      state.titlesLoaded = true;
      state.lastDatabaseRetrievalTitles = GetDateTime();

    },
    addStateTitle(state, action) {
      // console.log(componentName, GetDateTime(), "addStateTitle action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "addStateTitle action.payload.length", action.payload.length);

      // * Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {
        // console.log(componentName, GetDateTime(), "addStateTitle action.payload[i]", action.payload[i]);
        state.arrayTitles.push(action.payload[i]);
      };

    },
    updateStateTitle(state, action) {
      // console.log(componentName, GetDateTime(), "updateStateTitle action.payload", action.payload);

      const titleItem = action.payload;
      let titleItemIndex;
      // console.log(componentName, GetDateTime(), "updateStateTitle titleItem", titleItem);
      // console.log(componentName, GetDateTime(), "updateStateTitle titleItem.titleID", titleItem.titleID);
      // console.log(componentName, GetDateTime(), "updateStateTitle titleItem.titleItemIndex", titleItem.titleItemIndex);

      if (typeof titleItem === "object") {

        if (HasNonEmptyProperty(titleItem, "titleID")) {

          titleItemIndex = state.arrayTitles.findIndex(title => title.titleID === titleItem.titleID);

          // console.log(componentName, GetDateTime(), "updateStateTitle titleItemIndex", titleItemIndex);

          // state.arrayTitles[titleItemIndex].titleID = titleItem.titleID;
        };

        if (HasNonEmptyProperty(titleItem, "titleName")) {
          state.arrayTitles[titleItemIndex].titleName = titleItem.titleName;
        };

        if (HasNonEmptyProperty(titleItem, "titleSort")) {
          state.arrayTitles[titleItemIndex].titleSort = titleItem.titleSort;
        };

        if (HasNonEmptyProperty(titleItem, "titleURL")) {
          state.arrayTitles[titleItemIndex].titleURL = titleItem.titleURL;
        };

        if (HasNonEmptyProperty(titleItem, "authorFirstName")) {
          state.arrayTitles[titleItemIndex].authorFirstName = titleItem.authorFirstName;
        };

        if (HasNonEmptyProperty(titleItem, "authorLastName")) {
          state.arrayTitles[titleItemIndex].authorLastName = titleItem.authorLastName;
        };

        if (HasNonEmptyProperty(titleItem, "submissionDate")) {
          state.arrayTitles[titleItemIndex].submissionDate = titleItem.submissionDate;
        };

        if (HasNonEmptyProperty(titleItem, "publicationDate")) {
          state.arrayTitles[titleItemIndex].publicationDate = titleItem.publicationDate;
        };

        if (HasNonEmptyProperty(titleItem, "titlePublicationDate")) {
          state.arrayTitles[titleItemIndex].titlePublicationDate = titleItem.titlePublicationDate;
        };

        if (HasNonEmptyProperty(titleItem, "imageName")) {
          state.arrayTitles[titleItemIndex].imageName = titleItem.imageName;
        };

        if (HasNonEmptyProperty(titleItem, "titleImageName")) {
          state.arrayTitles[titleItemIndex].titleImageName = titleItem.titleImageName;
        };

        if (HasNonEmptyProperty(titleItem, "categoryID")) {
          state.arrayTitles[titleItemIndex].categoryID = titleItem.categoryID;
        };

        if (HasNonEmptyProperty(titleItem, "shortDescription")) {
          state.arrayTitles[titleItemIndex].shortDescription = titleItem.shortDescription;
        };

        if (HasNonEmptyProperty(titleItem, "urlPKDweb")) {
          state.arrayTitles[titleItemIndex].urlPKDweb = titleItem.urlPKDweb;
        };

        if (HasNonEmptyProperty(titleItem, "active")) {
          state.arrayTitles[titleItemIndex].active = titleItem.active;
        };

        if (HasNonEmptyProperty(titleItem, "titleActive")) {
          state.arrayTitles[titleItemIndex].titleActive = titleItem.titleActive;
        };

        if (HasNonEmptyProperty(titleItem, "createDate")) {
          state.arrayTitles[titleItemIndex].createDate = titleItem.createDate;
        };

        if (HasNonEmptyProperty(titleItem, "titleCreateDate")) {
          state.arrayTitles[titleItemIndex].titleCreateDate = titleItem.titleCreateDate;
        };

        if (HasNonEmptyProperty(titleItem, "updateDate")) {
          state.arrayTitles[titleItemIndex].updateDate = titleItem.updateDate;
        };

        if (HasNonEmptyProperty(titleItem, "titleUpdatedDate")) {
          state.arrayTitles[titleItemIndex].titleUpdatedDate = titleItem.titleUpdatedDate;
        };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (HasNonEmptyProperty(titleItem, "category")) {

        //   if (HasNonEmptyProperty(titleItem.category, "categoryID")) {
        //     state.arrayTitles[titleItemIndex].category.categoryID = titleItem.category.categoryID;
        //   };

        if (HasNonEmptyProperty(titleItem, "category")) {
          state.arrayTitles[titleItemIndex].category = titleItem.category;
        };

        if (HasNonEmptyProperty(titleItem, "sortID")) {
          state.arrayTitles[titleItemIndex].sortID = titleItem.sortID;
        };

        if (HasNonEmptyProperty(titleItem, "categorySortID")) {
          state.arrayTitles[titleItemIndex].categorySortID = titleItem.categorySortID;
        };

        if (HasNonEmptyProperty(titleItem, "categoryActive")) {
          state.arrayTitles[titleItemIndex].categoryActive = titleItem.categoryActive;
        };

        if (HasNonEmptyProperty(titleItem, "categoryCreateDate")) {
          state.arrayTitles[titleItemIndex].categoryCreateDate = titleItem.categoryCreateDate;
        };

        if (HasNonEmptyProperty(titleItem, "categoryUpdatedDate")) {
          state.arrayTitles[titleItemIndex].categoryUpdatedDate = titleItem.categoryUpdatedDate;
        };

        // };

      };

    },
    deleteStateTitle(state, action) {
      // console.log(componentName, GetDateTime(), "deleteStateTitle action.payload", action.payload);

      // const titleItemIndex = action.payload;
      let titleListIndex;
      const titleID = action.payload;

      // ? This doesn't work because state.arrayTitles isn't stored as an array of objects?
      // ? Need to copy the array?
      // const existingTitleIndex = state.arrayTitles.findIndex(title => title.titleID === titleID);
      // console.log(componentName, GetDateTime(), "deleteStateTitle existingTitleIndex", existingTitleIndex);

      if (IsEmpty(titleID) === false) {

        titleListIndex = state.arrayTitles.findIndex(title => title.titleID === titleID);

        // console.log(componentName, GetDateTime(), "deleteStateTitle titleListIndex", titleListIndex);

        state.arrayTitles.splice(titleListIndex, 1);

      };

    },
    updateStateTitleRating(state, action) {
      // console.log(componentName, GetDateTime(), "updateStateTitleRating action.payload", action.payload);

      const titleItem = action.payload;
      let titleItemIndex;
      // console.log(componentName, GetDateTime(), "updateStateTitleRating titleItem", titleItem);
      // console.log(componentName, GetDateTime(), "updateStateTitleRating titleItem.titleID", titleItem.titleID);

      if (typeof titleItem === "object") {

        if (HasNonEmptyProperty(titleItem, "titleID")) {

          titleItemIndex = state.arrayTitles.findIndex(title => title.titleID === titleItem.titleID);

          // console.log(componentName, GetDateTime(), "updateStateChecklist titleItemIndex", titleItemIndex);

          // state.arrayTitles[titleItemIndex].titleID = titleItem.titleID;
        };

        if (HasNonEmptyProperty(titleItem, "userReviewCount")) {
          state.arrayTitles[titleItemIndex].userReviewCount = titleItem.userReviewCount;
        };

        if (HasNonEmptyProperty(titleItem, "userReviewSum")) {
          state.arrayTitles[titleItemIndex].userReviewSum = titleItem.userReviewSum;
        };

        if (HasNonEmptyProperty(titleItem, "userReviewAverage")) {
          state.arrayTitles[titleItemIndex].userReviewAverage = titleItem.userReviewAverage;
        };

      };

      // if (typeof titleItem === "object") {

      //   if (HasNonEmptyProperty(titleItem, "userReviewCount")) {
      //     state.arrayTitles[titleItem.titleItemIndex].userReviewCount = titleItem.userReviewCount;
      //   };

      //   if (HasNonEmptyProperty(titleItem, "userReviewSum")) {
      //     state.arrayTitles[titleItem.titleItemIndex].userReviewSum = titleItem.userReviewSum;
      //   };

      //   if (HasNonEmptyProperty(titleItem, "userReviewAverage")) {
      //     state.arrayTitles[titleItem.titleItemIndex].userReviewAverage = titleItem.userReviewAverage;
      //   };

      // };

    },
    setTitlesDataOffline(state, action) {
      // console.log(componentName, GetDateTime(), "setTitlesDataOffline action.payload", action.payload);

      state.titlesDataOffline = action.payload;

    },
    setTitleSortBy(state, action) {
      // console.log(componentName, GetDateTime(), "setTitleSortBy action.payload", action.payload);

      state.titleSortBy = action.payload;

    }
  }
});

export const { loadArrayTitles, addStateTitle, updateStateTitle, deleteStateTitle, updateStateTitleRating, setTitlesDataOffline, setTitleSortBy } = titlesSlice.actions;

export default titlesSlice.reducer;