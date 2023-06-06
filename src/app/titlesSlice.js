import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";

const componentName = "titlesSlice";

const initialState = {
  arrayTitles: [],
  titlesLoaded: false,
  lastDatabaseRetrievalTitles: null,
  // titlesDataOffline: false,
  titleSortBy: "titleName"
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    loadArrayTitles(state, action) {

      if (isNonEmptyArray(action.payload) === true) {

        state.arrayTitles = [];

        for (let i = 0; i < action.payload.length; i++) {

          state.arrayTitles.push(action.payload[i]);

        };

      };

      state.titlesLoaded = true;
      state.lastDatabaseRetrievalTitles = getDateTime();

    },
    // addStateTitle(state, action) {

    //   // * Could change this to accept an object and add that object to the store
    //   if (isNonEmptyArray(action.payload) === true) {

    //     for (let i = 0; i < action.payload.length; i++) {

    //       state.arrayTitles.push(action.payload[i]);

    //     };

    //   };

    // },
    // updateStateTitle(state, action) {

    //   let titleItem = action.payload;
    //   let titleItemIndex;

    //   if (typeof titleItem === "object") {

    //     if (hasNonEmptyProperty(titleItem, "titleID") === true) {

    //       titleItemIndex = state.arrayTitles.findIndex(title => title.titleID === titleItem.titleID);

    //       // state.arrayTitles[titleItemIndex].titleID = titleItem.titleID;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "titleName") === true) {

    //       state.arrayTitles[titleItemIndex].titleName = titleItem.titleName;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "titleSort") === true) {

    //       state.arrayTitles[titleItemIndex].titleSort = titleItem.titleSort;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "titleURL") === true) {

    //       state.arrayTitles[titleItemIndex].titleURL = titleItem.titleURL;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "authorFirstName") === true) {

    //       state.arrayTitles[titleItemIndex].authorFirstName = titleItem.authorFirstName;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "authorLastName") === true) {

    //       state.arrayTitles[titleItemIndex].authorLastName = titleItem.authorLastName;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "submissionDate") === true) {

    //       state.arrayTitles[titleItemIndex].submissionDate = titleItem.submissionDate;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "publicationDate") === true) {

    //       state.arrayTitles[titleItemIndex].publicationDate = titleItem.publicationDate;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "titlePublicationDate") === true) {

    //       state.arrayTitles[titleItemIndex].titlePublicationDate = titleItem.titlePublicationDate;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "imageName") === true) {

    //       state.arrayTitles[titleItemIndex].imageName = titleItem.imageName;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "titleImageName") === true) {

    //       state.arrayTitles[titleItemIndex].titleImageName = titleItem.titleImageName;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "categoryID") === true) {

    //       state.arrayTitles[titleItemIndex].categoryID = titleItem.categoryID;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "shortDescription") === true) {

    //       state.arrayTitles[titleItemIndex].shortDescription = titleItem.shortDescription;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "urlPKDWeb") === true) {

    //       state.arrayTitles[titleItemIndex].urlPKDWeb = titleItem.urlPKDWeb;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "active") === true) {

    //       state.arrayTitles[titleItemIndex].active = titleItem.active;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "titleActive") === true) {

    //       state.arrayTitles[titleItemIndex].titleActive = titleItem.titleActive;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "createDate") === true) {

    //       state.arrayTitles[titleItemIndex].createDate = titleItem.createDate;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "titleCreateDate") === true) {

    //       state.arrayTitles[titleItemIndex].titleCreateDate = titleItem.titleCreateDate;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "updateDate") === true) {

    //       state.arrayTitles[titleItemIndex].updateDate = titleItem.updateDate;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "titleUpdatedDate") === true) {

    //       state.arrayTitles[titleItemIndex].titleUpdatedDate = titleItem.titleUpdatedDate;

    //     };

    //     // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
    //     // if (hasNonEmptyProperty(titleItem, "category") === true) {

    //     //   if (hasNonEmptyProperty(titleItem.category, "categoryID") === true) {

    //     //     state.arrayTitles[titleItemIndex].category.categoryID = titleItem.category.categoryID;

    //     //   };

    //     if (hasNonEmptyProperty(titleItem, "category") === true) {

    //       state.arrayTitles[titleItemIndex].category = titleItem.category;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "sortID") === true) {

    //       state.arrayTitles[titleItemIndex].sortID = titleItem.sortID;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "categorySortID") === true) {

    //       state.arrayTitles[titleItemIndex].categorySortID = titleItem.categorySortID;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "categoryActive") === true) {

    //       state.arrayTitles[titleItemIndex].categoryActive = titleItem.categoryActive;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "categoryCreateDate") === true) {

    //       state.arrayTitles[titleItemIndex].categoryCreateDate = titleItem.categoryCreateDate;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "categoryUpdatedDate") === true) {

    //       state.arrayTitles[titleItemIndex].categoryUpdatedDate = titleItem.categoryUpdatedDate;

    //     };

    //     // };

    //   };

    // },
    // deleteStateTitle(state, action) {

    //   // let titleItemIndex = action.payload;
    //   let titleListIndex;
    //   let titleID = action.payload;

    //   // ? This doesn't work because state.arrayTitles isn't stored as an array of objects?
    //   // ? Need to copy the array?
    //   // let existingTitleIndex = state.arrayTitles.findIndex(title => title.titleID === titleID);

    //   if (isEmpty(titleID) === false) {

    //     titleListIndex = state.arrayTitles.findIndex(title => title.titleID === titleID);

    //     state.arrayTitles.splice(titleListIndex, 1);

    //   };

    // },
    // updateStateTitleRating(state, action) {

    //   let titleItem = action.payload;
    //   let titleItemIndex;

    //   if (typeof titleItem === "object") {

    //     if (hasNonEmptyProperty(titleItem, "titleID") === true) {

    //       titleItemIndex = state.arrayTitles.findIndex(title => title.titleID === titleItem.titleID);

    //       // state.arrayTitles[titleItemIndex].titleID = titleItem.titleID;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "userReviewCount") === true) {

    //       state.arrayTitles[titleItemIndex].userReviewCount = titleItem.userReviewCount;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "userReviewSum") === true) {

    //       state.arrayTitles[titleItemIndex].userReviewSum = titleItem.userReviewSum;

    //     };

    //     if (hasNonEmptyProperty(titleItem, "userReviewAverage") === true) {

    //       state.arrayTitles[titleItemIndex].userReviewAverage = titleItem.userReviewAverage;

    //     };

    //   };

    //   // if (typeof titleItem === "object") {

    //   //   if (hasNonEmptyProperty(titleItem, "userReviewCount") === true) {

    //   //     state.arrayTitles[titleItem.titleItemIndex].userReviewCount = titleItem.userReviewCount;

    //   //   };

    //   //   if (hasNonEmptyProperty(titleItem, "userReviewSum") === true) {

    //   //     state.arrayTitles[titleItem.titleItemIndex].userReviewSum = titleItem.userReviewSum;

    //   //   };

    //   //   if (hasNonEmptyProperty(titleItem, "userReviewAverage") === true) {

    //   //     state.arrayTitles[titleItem.titleItemIndex].userReviewAverage = titleItem.userReviewAverage;

    //   //   };

    //   // };

    // },
    // setTitlesDataOffline(state, action) {

    //   state.titlesDataOffline = action.payload;

    // },
    setTitleSortBy(state, action) {

      state.titleSortBy = action.payload;

    }
  }
});

export const { loadArrayTitles, /* addStateTitle, updateStateTitle, deleteStateTitle, updateStateTitleRating, */ /* setTitlesDataOffline, */ setTitleSortBy } = titlesSlice.actions;

export default titlesSlice.reducer;