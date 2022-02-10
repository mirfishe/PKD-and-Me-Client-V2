import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, displayValue, getDateTime, hasNonEmptyProperty } from "../utilities/SharedFunctions";

const componentName = "titlesSlice";

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
      // console.log(componentName, getDateTime(), "loadArrayTitles action.payload", action.payload);
      // console.log(componentName, getDateTime(), "loadArrayTitles action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, getDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
        state.arrayTitles.push(action.payload[i]);

      };

      state.titlesLoaded = true;
      state.lastDatabaseRetrievalTitles = getDateTime();

    },
    addStateTitle(state, action) {
      // console.log(componentName, getDateTime(), "addStateTitle action.payload", action.payload);
      // console.log(componentName, getDateTime(), "addStateTitle action.payload.length", action.payload.length);

      // * Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, getDateTime(), "addStateTitle action.payload[i]", action.payload[i]);
        state.arrayTitles.push(action.payload[i]);

      };

    },
    updateStateTitle(state, action) {
      // console.log(componentName, getDateTime(), "updateStateTitle action.payload", action.payload);

      const titleItem = action.payload;
      let titleItemIndex;
      // console.log(componentName, getDateTime(), "updateStateTitle titleItem", titleItem);
      // console.log(componentName, getDateTime(), "updateStateTitle titleItem.titleID", titleItem.titleID);
      // console.log(componentName, getDateTime(), "updateStateTitle titleItem.titleItemIndex", titleItem.titleItemIndex);

      if (typeof titleItem === "object") {

        if (hasNonEmptyProperty(titleItem, "titleID")) {

          titleItemIndex = state.arrayTitles.findIndex(title => title.titleID === titleItem.titleID);

          // console.log(componentName, getDateTime(), "updateStateTitle titleItemIndex", titleItemIndex);

          // state.arrayTitles[titleItemIndex].titleID = titleItem.titleID;

        };

        if (hasNonEmptyProperty(titleItem, "titleName")) {

          state.arrayTitles[titleItemIndex].titleName = titleItem.titleName;

        };

        if (hasNonEmptyProperty(titleItem, "titleSort")) {

          state.arrayTitles[titleItemIndex].titleSort = titleItem.titleSort;

        };

        if (hasNonEmptyProperty(titleItem, "titleURL")) {

          state.arrayTitles[titleItemIndex].titleURL = titleItem.titleURL;

        };

        if (hasNonEmptyProperty(titleItem, "authorFirstName")) {

          state.arrayTitles[titleItemIndex].authorFirstName = titleItem.authorFirstName;

        };

        if (hasNonEmptyProperty(titleItem, "authorLastName")) {

          state.arrayTitles[titleItemIndex].authorLastName = titleItem.authorLastName;

        };

        if (hasNonEmptyProperty(titleItem, "submissionDate")) {

          state.arrayTitles[titleItemIndex].submissionDate = titleItem.submissionDate;

        };

        if (hasNonEmptyProperty(titleItem, "publicationDate")) {

          state.arrayTitles[titleItemIndex].publicationDate = titleItem.publicationDate;

        };

        if (hasNonEmptyProperty(titleItem, "titlePublicationDate")) {

          state.arrayTitles[titleItemIndex].titlePublicationDate = titleItem.titlePublicationDate;

        };

        if (hasNonEmptyProperty(titleItem, "imageName")) {

          state.arrayTitles[titleItemIndex].imageName = titleItem.imageName;

        };

        if (hasNonEmptyProperty(titleItem, "titleImageName")) {

          state.arrayTitles[titleItemIndex].titleImageName = titleItem.titleImageName;

        };

        if (hasNonEmptyProperty(titleItem, "categoryID")) {

          state.arrayTitles[titleItemIndex].categoryID = titleItem.categoryID;

        };

        if (hasNonEmptyProperty(titleItem, "shortDescription")) {

          state.arrayTitles[titleItemIndex].shortDescription = titleItem.shortDescription;

        };

        if (hasNonEmptyProperty(titleItem, "urlPKDWeb")) {

          state.arrayTitles[titleItemIndex].urlPKDWeb = titleItem.urlPKDWeb;

        };

        if (hasNonEmptyProperty(titleItem, "active")) {

          state.arrayTitles[titleItemIndex].active = titleItem.active;

        };

        if (hasNonEmptyProperty(titleItem, "titleActive")) {

          state.arrayTitles[titleItemIndex].titleActive = titleItem.titleActive;

        };

        if (hasNonEmptyProperty(titleItem, "createDate")) {

          state.arrayTitles[titleItemIndex].createDate = titleItem.createDate;

        };

        if (hasNonEmptyProperty(titleItem, "titleCreateDate")) {

          state.arrayTitles[titleItemIndex].titleCreateDate = titleItem.titleCreateDate;

        };

        if (hasNonEmptyProperty(titleItem, "updateDate")) {

          state.arrayTitles[titleItemIndex].updateDate = titleItem.updateDate;

        };

        if (hasNonEmptyProperty(titleItem, "titleUpdatedDate")) {

          state.arrayTitles[titleItemIndex].titleUpdatedDate = titleItem.titleUpdatedDate;

        };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (hasNonEmptyProperty(titleItem, "category")) {

        //   if (hasNonEmptyProperty(titleItem.category, "categoryID")) {

        //     state.arrayTitles[titleItemIndex].category.categoryID = titleItem.category.categoryID;

        //   };

        if (hasNonEmptyProperty(titleItem, "category")) {

          state.arrayTitles[titleItemIndex].category = titleItem.category;

        };

        if (hasNonEmptyProperty(titleItem, "sortID")) {

          state.arrayTitles[titleItemIndex].sortID = titleItem.sortID;

        };

        if (hasNonEmptyProperty(titleItem, "categorySortID")) {

          state.arrayTitles[titleItemIndex].categorySortID = titleItem.categorySortID;

        };

        if (hasNonEmptyProperty(titleItem, "categoryActive")) {

          state.arrayTitles[titleItemIndex].categoryActive = titleItem.categoryActive;

        };

        if (hasNonEmptyProperty(titleItem, "categoryCreateDate")) {

          state.arrayTitles[titleItemIndex].categoryCreateDate = titleItem.categoryCreateDate;

        };

        if (hasNonEmptyProperty(titleItem, "categoryUpdatedDate")) {

          state.arrayTitles[titleItemIndex].categoryUpdatedDate = titleItem.categoryUpdatedDate;

        };

        // };

      };

    },
    deleteStateTitle(state, action) {
      // console.log(componentName, getDateTime(), "deleteStateTitle action.payload", action.payload);

      // const titleItemIndex = action.payload;
      let titleListIndex;
      const titleID = action.payload;

      // ? This doesn't work because state.arrayTitles isn't stored as an array of objects?
      // ? Need to copy the array?
      // const existingTitleIndex = state.arrayTitles.findIndex(title => title.titleID === titleID);
      // console.log(componentName, getDateTime(), "deleteStateTitle existingTitleIndex", existingTitleIndex);

      if (isEmpty(titleID) === false) {

        titleListIndex = state.arrayTitles.findIndex(title => title.titleID === titleID);

        // console.log(componentName, getDateTime(), "deleteStateTitle titleListIndex", titleListIndex);

        state.arrayTitles.splice(titleListIndex, 1);

      };

    },
    updateStateTitleRating(state, action) {
      // console.log(componentName, getDateTime(), "updateStateTitleRating action.payload", action.payload);

      const titleItem = action.payload;
      let titleItemIndex;
      // console.log(componentName, getDateTime(), "updateStateTitleRating titleItem", titleItem);
      // console.log(componentName, getDateTime(), "updateStateTitleRating titleItem.titleID", titleItem.titleID);

      if (typeof titleItem === "object") {

        if (hasNonEmptyProperty(titleItem, "titleID")) {

          titleItemIndex = state.arrayTitles.findIndex(title => title.titleID === titleItem.titleID);

          // console.log(componentName, getDateTime(), "updateStateChecklist titleItemIndex", titleItemIndex);

          // state.arrayTitles[titleItemIndex].titleID = titleItem.titleID;

        };

        if (hasNonEmptyProperty(titleItem, "userReviewCount")) {

          state.arrayTitles[titleItemIndex].userReviewCount = titleItem.userReviewCount;

        };

        if (hasNonEmptyProperty(titleItem, "userReviewSum")) {

          state.arrayTitles[titleItemIndex].userReviewSum = titleItem.userReviewSum;

        };

        if (hasNonEmptyProperty(titleItem, "userReviewAverage")) {

          state.arrayTitles[titleItemIndex].userReviewAverage = titleItem.userReviewAverage;

        };

      };

      // if (typeof titleItem === "object") {

      //   if (hasNonEmptyProperty(titleItem, "userReviewCount")) {

      //     state.arrayTitles[titleItem.titleItemIndex].userReviewCount = titleItem.userReviewCount;

      //   };

      //   if (hasNonEmptyProperty(titleItem, "userReviewSum")) {

      //     state.arrayTitles[titleItem.titleItemIndex].userReviewSum = titleItem.userReviewSum;

      //   };

      //   if (hasNonEmptyProperty(titleItem, "userReviewAverage")) {

      //     state.arrayTitles[titleItem.titleItemIndex].userReviewAverage = titleItem.userReviewAverage;

      //   };

      // };

    },
    setTitlesDataOffline(state, action) {
      // console.log(componentName, getDateTime(), "setTitlesDataOffline action.payload", action.payload);

      state.titlesDataOffline = action.payload;

    },
    setTitleSortBy(state, action) {
      // console.log(componentName, getDateTime(), "setTitleSortBy action.payload", action.payload);

      state.titleSortBy = action.payload;

    }
  }
});

export const { loadArrayTitles, addStateTitle, updateStateTitle, deleteStateTitle, updateStateTitleRating, setTitlesDataOffline, setTitleSortBy } = titlesSlice.actions;

export default titlesSlice.reducer;