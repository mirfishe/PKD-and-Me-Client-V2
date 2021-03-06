import {createSlice} from "@reduxjs/toolkit";

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
        // console.log(componentName, "loadArrayTitles action.payload", action.payload);
        // console.log(componentName, "loadArrayTitles action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayTitles action.payload[i]", action.payload[i]);
          state.arrayTitles.push(action.payload[i]);
        };

        state.titlesLoaded = true;
        state.lastDatabaseRetrievalTitles = new Date().toISOString();

      }
    },
    addStateTitle: {
      reducer(state, action) {
        // console.log(componentName, "addStateTitle action.payload", action.payload);
        // console.log(componentName, "addStateTitle action.payload.length", action.payload.length);

        // * Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "addStateTitle action.payload[i]", action.payload[i]);
          state.arrayTitles.push(action.payload[i]);
        };

      }
    },
    updateStateTitle: {
      reducer(state, action) {
        // console.log(componentName, "updateStateTitle action.payload", action.payload);

        const titleItem = action.payload;
        // console.log(componentName, "updateStateTitle titleItem", titleItem);
        // console.log(componentName, "updateStateTitle titleItem.titleID", titleItem.titleID);
        // console.log(componentName, "updateStateTitle titleItem.titleItemIndex", titleItem.titleItemIndex);

        if (typeof titleItem === "object") {

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

          if (titleItem.hasOwnProperty("imageName")) {
            state.arrayTitles[titleItem.titleItemIndex].imageName = titleItem.imageName;
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

          if (titleItem.hasOwnProperty("updatedAt")) {
            state.arrayTitles[titleItem.titleItemIndex].updatedAt = titleItem.updatedAt;
          };

          if (titleItem.hasOwnProperty("category")) {

            if (titleItem.category.hasOwnProperty("categoryID")) {
              state.arrayTitles[titleItem.titleItemIndex].category.categoryID = titleItem.category.categoryID;
            };

            if (titleItem.category.hasOwnProperty("category")) {
              state.arrayTitles[titleItem.titleItemIndex].category.category = titleItem.category.category;
            };

            if (titleItem.category.hasOwnProperty("sortID")) {
              state.arrayTitles[titleItem.titleItemIndex].category.sortID = titleItem.category.sortID;
            };

            if (titleItem.category.hasOwnProperty("active")) {
              state.arrayTitles[titleItem.titleItemIndex].category.active = titleItem.category.active;
            };

            if (titleItem.category.hasOwnProperty("updatedAt")) {
              state.arrayTitles[titleItem.titleItemIndex].category.updatedAt = titleItem.category.updatedAt;
            };

          };

        };

      }
    },
    deleteStateTitle: {
      reducer(state, action) {
        // console.log(componentName, "deleteStateTitle action.payload", action.payload);

        const titleItemIndex = action.payload;
        // const titleID = action.payload;

        // ? This doesn't work because state.arrayTitles isn't stored as an array of objects?
        // ? Need to copy the array?
        // const existingTitleIndex = state.arrayTitles.findIndex(title => title.titleID === titleID);
        // console.log(componentName, "deleteStateTitle existingTitleIndex", existingTitleIndex);

        state.arrayTitles.splice(titleItemIndex, 1);

      }
    },
    updateStateTitleRating: {
      reducer(state, action) {
        // console.log(componentName, "updateStateTitleRating action.payload", action.payload);

        const titleItem = action.payload;
        // console.log(componentName, "updateStateTitleRating titleItem", titleItem);
        // console.log(componentName, "updateStateTitleRating titleItem.titleID", titleItem.titleID);
        // console.log(componentName, "updateStateTitleRating titleItem.titleItemIndex", titleItem.titleItemIndex);

        if (typeof titleItem === "object") {

          if (titleItem.hasOwnProperty("userReviewCount")) {
            state.arrayTitles[titleItem.titleItemIndex].userReviewCount = titleItem.userReviewCount;
          };

          if (titleItem.hasOwnProperty("userReviewSum")) {
            state.arrayTitles[titleItem.titleItemIndex].userReviewSum = titleItem.userReviewSum;
          };
          
          if (titleItem.hasOwnProperty("userReviewAverage")) {
            state.arrayTitles[titleItem.titleItemIndex].userReviewAverage = titleItem.userReviewAverage;
          };

        };

      }
    },
    setTitlesDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setTitlesDataOffline action.payload", action.payload);

        state.titlesDataOffline = action.payload;

      }
    },
    setTitleSortBy: {
      reducer(state, action) {
        // console.log(componentName, "setTitleSortBy action.payload", action.payload);

        state.titleSortBy = action.payload;

      }
    }
}
});

export const {loadArrayTitles, addStateTitle, updateStateTitle, deleteStateTitle, updateStateTitleRating, setTitlesDataOffline, setTitleSortBy} = titlesSlice.actions;

export default titlesSlice.reducer;