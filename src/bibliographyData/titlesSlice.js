import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime } from "../app/sharedFunctions";

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
    loadArrayTitles: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
          state.arrayTitles.push(action.payload[i]);
        };

        state.titlesLoaded = true;
        state.lastDatabaseRetrievalTitles = GetDateTime();

      }
    },
    addStateTitle: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "addStateTitle action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "addStateTitle action.payload.length", action.payload.length);

        // * Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "addStateTitle action.payload[i]", action.payload[i]);
          state.arrayTitles.push(action.payload[i]);
        };

      }
    },
    updateStateTitle: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "updateStateTitle action.payload", action.payload);

        const titleItem = action.payload;
        let titleItemIndex;
        // console.log(componentName, GetDateTime(), "updateStateTitle titleItem", titleItem);
        // console.log(componentName, GetDateTime(), "updateStateTitle titleItem.titleID", titleItem.titleID);
        // console.log(componentName, GetDateTime(), "updateStateTitle titleItem.titleItemIndex", titleItem.titleItemIndex);

        if (typeof titleItem === "object") {

          if (titleItem.hasOwnProperty("titleID")) {

            titleItemIndex = state.arrayTitles.findIndex(title => title.titleID === titleItem.titleID);

            // console.log(componentName, GetDateTime(), "updateStateTitle titleItemIndex", titleItemIndex);

            // state.arrayTitles[titleItemIndex].titleID = titleItem.titleID;
          };

          if (titleItem.hasOwnProperty("titleName")) {
            state.arrayTitles[titleItem.titleItemIndex].titleName = titleItem.titleName;
          };

          if (titleItem.hasOwnProperty("titleSort")) {
            state.arrayTitles[titleItem.titleItemIndex].titleSort = titleItem.titleSort;
          };

          if (titleItem.hasOwnProperty("titleURL")) {
            state.arrayTitles[titleItem.titleItemIndex].titleURL = titleItem.titleURL;
          };

          if (titleItem.hasOwnProperty("authorFirstName")) {
            state.arrayTitles[titleItem.titleItemIndex].authorFirstName = titleItem.authorFirstName;
          };

          if (titleItem.hasOwnProperty("authorLastName")) {
            state.arrayTitles[titleItem.titleItemIndex].authorLastName = titleItem.authorLastName;
          };

          if (titleItem.hasOwnProperty("publicationDate")) {
            state.arrayTitles[titleItem.titleItemIndex].publicationDate = titleItem.publicationDate;
          };

          if (titleItem.hasOwnProperty("titlePublicationDate")) {
            state.arrayTitles[titleItem.titleItemIndex].titlePublicationDate = titleItem.titlePublicationDate;
          };

          if (titleItem.hasOwnProperty("imageName")) {
            state.arrayTitles[titleItem.titleItemIndex].imageName = titleItem.imageName;
          };

          if (titleItem.hasOwnProperty("titleImageName")) {
            state.arrayTitles[titleItem.titleItemIndex].titleImageName = titleItem.titleImageName;
          };

          if (titleItem.hasOwnProperty("categoryID")) {
            state.arrayTitles[titleItem.titleItemIndex].categoryID = titleItem.categoryID;
          };

          if (titleItem.hasOwnProperty("shortDescription")) {
            state.arrayTitles[titleItem.titleItemIndex].shortDescription = titleItem.shortDescription;
          };

          if (titleItem.hasOwnProperty("urlPKDweb")) {
            state.arrayTitles[titleItem.titleItemIndex].urlPKDweb = titleItem.urlPKDweb;
          };

          if (titleItem.hasOwnProperty("active")) {
            state.arrayTitles[titleItem.titleItemIndex].active = titleItem.active;
          };

          if (titleItem.hasOwnProperty("titleActive")) {
            state.arrayTitles[titleItem.titleItemIndex].titleActive = titleItem.titleActive;
          };

          if (titleItem.hasOwnProperty("createDate")) {
            state.arrayTitles[titleItem.titleItemIndex].createDate = titleItem.createDate;
          };

          if (titleItem.hasOwnProperty("titleCreateDate")) {
            state.arrayTitles[titleItem.titleItemIndex].titleCreateDate = titleItem.titleCreateDate;
          };

          if (titleItem.hasOwnProperty("updateDate")) {
            state.arrayTitles[titleItem.titleItemIndex].updateDate = titleItem.updateDate;
          };

          if (titleItem.hasOwnProperty("titleUpdatedDate")) {
            state.arrayTitles[titleItem.titleItemIndex].titleUpdatedDate = titleItem.titleUpdatedDate;
          };

          // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
          // if (titleItem.hasOwnProperty("category")) {

          //   if (titleItem.category.hasOwnProperty("categoryID")) {
          //     state.arrayTitles[titleItem.titleItemIndex].category.categoryID = titleItem.category.categoryID;
          //   };

          if (titleItem.hasOwnProperty("category")) {
            state.arrayTitles[titleItem.titleItemIndex].category = titleItem.category;
          };

          if (titleItem.hasOwnProperty("sortID")) {
            state.arrayTitles[titleItem.titleItemIndex].sortID = titleItem.sortID;
          };

          if (titleItem.hasOwnProperty("categorySortID")) {
            state.arrayTitles[titleItem.titleItemIndex].categorySortID = titleItem.categorySortID;
          };

          if (titleItem.hasOwnProperty("categoryActive")) {
            state.arrayTitles[titleItem.titleItemIndex].categoryActive = titleItem.categoryActive;
          };

          if (titleItem.hasOwnProperty("categoryCreateDate")) {
            state.arrayTitles[titleItem.titleItemIndex].categoryCreateDate = titleItem.categoryCreateDate;
          };

          if (titleItem.hasOwnProperty("categoryUpdatedDate")) {
            state.arrayTitles[titleItem.titleItemIndex].categoryUpdatedDate = titleItem.categoryUpdatedDate;
          };

          // };

        };

      }
    },
    deleteStateTitle: {
      reducer(state, action) {
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

      }
    },
    updateStateTitleRating: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "updateStateTitleRating action.payload", action.payload);

        const titleItem = action.payload;
        let titleItemIndex;
        // console.log(componentName, GetDateTime(), "updateStateTitleRating titleItem", titleItem);
        // console.log(componentName, GetDateTime(), "updateStateTitleRating titleItem.titleID", titleItem.titleID);

        if (typeof titleItem === "object") {

          if (titleItem.hasOwnProperty("titleID")) {

            titleItemIndex = state.arrayTitles.findIndex(title => title.titleID === titleItem.titleID);

            // console.log(componentName, GetDateTime(), "updateStateChecklist titleItemIndex", titleItemIndex);

            // state.arrayTitles[titleItemIndex].titleID = titleItem.titleID;
          };

          if (titleItem.hasOwnProperty("userReviewCount")) {
            state.arrayTitles[titleItemIndex].userReviewCount = titleItem.userReviewCount;
          };

          if (titleItem.hasOwnProperty("userReviewSum")) {
            state.arrayTitles[titleItemIndex].userReviewSum = titleItem.userReviewSum;
          };

          if (titleItem.hasOwnProperty("userReviewAverage")) {
            state.arrayTitles[titleItemIndex].userReviewAverage = titleItem.userReviewAverage;
          };

        };

        // if (typeof titleItem === "object") {

        //   if (titleItem.hasOwnProperty("userReviewCount")) {
        //     state.arrayTitles[titleItem.titleItemIndex].userReviewCount = titleItem.userReviewCount;
        //   };

        //   if (titleItem.hasOwnProperty("userReviewSum")) {
        //     state.arrayTitles[titleItem.titleItemIndex].userReviewSum = titleItem.userReviewSum;
        //   };

        //   if (titleItem.hasOwnProperty("userReviewAverage")) {
        //     state.arrayTitles[titleItem.titleItemIndex].userReviewAverage = titleItem.userReviewAverage;
        //   };

        // };

      }
    },
    setTitlesDataOffline: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setTitlesDataOffline action.payload", action.payload);

        state.titlesDataOffline = action.payload;

      }
    },
    setTitleSortBy: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setTitleSortBy action.payload", action.payload);

        state.titleSortBy = action.payload;

      }
    }
  }
});

export const { loadArrayTitles, addStateTitle, updateStateTitle, deleteStateTitle, updateStateTitleRating, setTitlesDataOffline, setTitleSortBy } = titlesSlice.actions;

export default titlesSlice.reducer;