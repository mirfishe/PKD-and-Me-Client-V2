import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime } from "../app/sharedFunctions";

const componentName = "userReviewsSlice.js";

const initialState = {
  arrayUserReviews: [],
  userReviewsLoaded: false,
  lastDatabaseRetrievalUserReviews: null,
  userReviewsDataOffline: false,
  // arrayUserReviewsRatings: [],
  userReviewsRatingsLoaded: false,
  lastDatabaseRetrievalUserReviewsRatings: null,
  userReviewsRatingsDataOffline: false
};

const userReviewsSlice = createSlice({
  name: "userReviews",
  initialState,
  reducers: {
    loadArrayUserReviews: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "loadArrayUserReviews action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "loadArrayUserReviews action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
          state.arrayUserReviews.push(action.payload[i]);
        };

        state.userReviewsLoaded = true;
        state.lastDatabaseRetrievalUserReviews = new Date().toISOString();

      }
    },
    addStateUserReview: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "addStateUserReview action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "addStateUserReview action.payload.length", action.payload.length);

        // * Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "addStateUserReview action.payload[i]", action.payload[i]);
          state.arrayUserReviews.push(action.payload[i]);
        };

      }
    },
    updateStateUserReview: {
      reducer(state, action) {
        console.log(componentName, GetDateTime(), "updateStateUserReview action.payload", action.payload);

        const userReviewItem = action.payload;
        // console.log(componentName, GetDateTime(), "updateStateUserReview userReviewItem", userReviewItem);
        // console.log(componentName, GetDateTime(), "updateStateUserReview userReviewItem.reviewID", userReviewItem.reviewID);
        // console.log(componentName, GetDateTime(), "updateStateUserReview userReviewItem.userReviewItemIndex", userReviewItem.userReviewItemIndex);

        if (typeof userReviewItem === "object") {

          if (userReviewItem.hasOwnProperty("reviewID")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].reviewID = userReviewItem.reviewID;
          };

          if (userReviewItem.hasOwnProperty("userID")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].userID = userReviewItem.userID;
          };

          if (userReviewItem.hasOwnProperty("updatedBy")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].updatedBy = userReviewItem.updatedBy;
          };

          if (userReviewItem.hasOwnProperty("userReviewUpdatedBy")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].userReviewUpdatedBy = userReviewItem.userReviewUpdatedBy;
          };

          if (userReviewItem.hasOwnProperty("titleID")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleID = userReviewItem.titleID;
          };

          if (userReviewItem.hasOwnProperty("read")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].read = userReviewItem.read;
          };

          if (userReviewItem.hasOwnProperty("dateRead")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].dateRead = userReviewItem.dateRead;
          };

          if (userReviewItem.hasOwnProperty("rating")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].rating = userReviewItem.rating;
          };

          if (userReviewItem.hasOwnProperty("ranking")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].ranking = userReviewItem.ranking;
          };

          if (userReviewItem.hasOwnProperty("owned")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].owned = userReviewItem.owned;
          };

          if (userReviewItem.hasOwnProperty("purchaseDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].purchaseDate = userReviewItem.purchaseDate;
          };

          if (userReviewItem.hasOwnProperty("shortReview")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].shortReview = userReviewItem.shortReview;
          };

          if (userReviewItem.hasOwnProperty("longReview")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].longReview = userReviewItem.longReview;
          };

          if (userReviewItem.hasOwnProperty("active")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].active = userReviewItem.active;
          };

          if (userReviewItem.hasOwnProperty("userReviewActive")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].userReviewActive = userReviewItem.userReviewActive;
          };

          if (userReviewItem.hasOwnProperty("createDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].createDate = userReviewItem.createDate;
          };

          if (userReviewItem.hasOwnProperty("userReviewCreateDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].userReviewCreateDate = userReviewItem.userReviewCreateDate;
          };

          if (userReviewItem.hasOwnProperty("updateDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].updateDate = userReviewItem.updateDate;
          };

          if (userReviewItem.hasOwnProperty("userReviewUpdatedDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].userReviewUpdatedDate = userReviewItem.userReviewUpdatedDate;
          };

          // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
          // if (userReviewItem.hasOwnProperty("title")) {

          //   if (userReviewItem.title.hasOwnProperty("titleID")) {
          //     state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.titleID = userReviewItem.title.titleID;
          //   };

          if (userReviewItem.hasOwnProperty("titleName")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleName = userReviewItem.titleName;
          };

          if (userReviewItem.hasOwnProperty("titleSort")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleSort = userReviewItem.titleSort;
          };

          if (userReviewItem.hasOwnProperty("titleURL")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleURL = userReviewItem.titleURL;
          };

          if (userReviewItem.hasOwnProperty("authorFirstName")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].authorFirstName = userReviewItem.authorFirstName;
          };

          if (userReviewItem.hasOwnProperty("authorLastName")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].authorLastName = userReviewItem.authorLastName;
          };

          if (userReviewItem.hasOwnProperty("publicationDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].publicationDate = userReviewItem.publicationDate;
          };

          if (userReviewItem.hasOwnProperty("titlePublicationDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titlePublicationDate = userReviewItem.titlePublicationDate;
          };

          if (userReviewItem.hasOwnProperty("imageName")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].imageName = userReviewItem.imageName;
          };

          if (userReviewItem.hasOwnProperty("titleImageName")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleImageName = userReviewItem.titleImageName;
          };

          if (userReviewItem.hasOwnProperty("categoryID")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].categoryID = userReviewItem.categoryID;
          };

          if (userReviewItem.hasOwnProperty("shortDescription")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].shortDescription = userReviewItem.shortDescription;
          };

          if (userReviewItem.hasOwnProperty("urlPKDweb")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].urlPKDweb = userReviewItem.urlPKDweb;
          };

          if (userReviewItem.hasOwnProperty("active")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].active = userReviewItem.active;
          };

          if (userReviewItem.hasOwnProperty("titleActive")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleActive = userReviewItem.titleActive;
          };

          if (userReviewItem.hasOwnProperty("createDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].createDate = userReviewItem.createDate;
          };

          if (userReviewItem.hasOwnProperty("titleCreateDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleCreateDate = userReviewItem.titleCreateDate;
          };

          if (userReviewItem.hasOwnProperty("updateDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].updateDate = userReviewItem.updateDate;
          };

          if (userReviewItem.hasOwnProperty("titleUpdatedDate")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleUpdatedDate = userReviewItem.titleUpdatedDate;
          };

          // };

          // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
          // if (userReviewItem.hasOwnProperty("user")) {

          //   if (userReviewItem.user.hasOwnProperty("userID")) {
          //     state.arrayUserReviews[userReviewItem.userReviewItemIndex].user.userID = userReviewItem.user.userID;
          //   };

          if (userReviewItem.hasOwnProperty("firstName")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].firstName = userReviewItem.firstName;
          };

          if (userReviewItem.hasOwnProperty("lastName")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].lastName = userReviewItem.lastName;
          };

          if (userReviewItem.hasOwnProperty("email")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].email = userReviewItem.email;
          };

          if (userReviewItem.hasOwnProperty("updatedBy")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].updatedBy = userReviewItem.updatedBy;
          };

          if (userReviewItem.hasOwnProperty("userUpdatedBy")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].userUpdatedBy = userReviewItem.userUpdatedBy;
          };

          if (userReviewItem.hasOwnProperty("admin")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].admin = userReviewItem.admin;
          };

          if (userReviewItem.hasOwnProperty("active")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].active = userReviewItem.active;
          };

          if (userReviewItem.hasOwnProperty("userActive")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].userActive = userReviewItem.userActive;
          };

          // };

        };

      }
    },
    deleteStateUserReview: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "deleteStateUserReview action.payload", action.payload);

        const userReviewItemIndex = action.payload;
        // const reviewID = action.payload;

        // ? This doesn't work because state.arrayUserReviews isn't stored as an array of objects?
        // ? Need to copy the array?
        // const existingUserReviewIndex = state.arrayUserReviews.findIndex(userReview => userReview.reviewID === reviewID);
        // console.log(componentName, GetDateTime(), "deleteStateUserReview existingUserReviewIndex", existingUserReviewIndex);

        state.arrayUserReviews.splice(userReviewItemIndex, 1);

      }
    },
    setUserReviewsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setUserReviewsDataOffline action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "setUserReviewsDataOffline action.payload.length", action.payload.length);

        state.userReviewsDataOffline = action.payload;

      }
    },
    //   loadArrayUserReviewsRatings: {
    //     reducer(state, action) {
    //       // console.log(componentName, GetDateTime(), "loadArrayUserReviewsRatings action.payload", action.payload);
    //       // console.log(componentName, GetDateTime(), "loadArrayUserReviewsRatings action.payload.length", action.payload.length);

    //       for (let i = 0; i < action.payload.length; i++) {
    //         // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
    //         state.arrayUserReviewsRatings.push(action.payload[i]);
    //       };

    //       state.userReviewsRatingsLoaded = true;
    //       state.lastDatabaseRetrievalUserReviewsRatings = new Date().toISOString();

    //     }
    //   },
    //   addStateUserReviewsRatings: {
    //     reducer(state, action) {
    //       // console.log(componentName, GetDateTime(), "addStateUserReviewsRatings action.payload", action.payload);
    //       // console.log(componentName, GetDateTime(), "addStateUserReviewsRatings action.payload.length", action.payload.length);

    //       // Could change this to accept an object and add that object to the store
    //       for (let i = 0; i < action.payload.length; i++) {
    //         // console.log(componentName, GetDateTime(), "addStateUserReviewsRatings action.payload[i]", action.payload[i]);
    //         state.arrayUserReviewsRatings.push(action.payload[i]);
    //       };

    //     }
    //   },
    // updateStateUserReviewsRatings: {
    //   reducer(state, action) {
    //     // console.log(componentName, GetDateTime(), "updateStateUserReviewsRatings action.payload", action.payload);

    //     const userReviewRatingItem = action.payload;
    //     // console.log(componentName, GetDateTime(), "updateStateUserReviewsRatings userReviewRatingItem", userReviewRatingItem);
    //     // console.log(componentName, GetDateTime(), "updateStateUserReviewsRatings userReviewRatingItem.titleID", userReviewRatingItem.titleID);
    //     // console.log(componentName, GetDateTime(), "updateStateUserReviewsRatings userReviewRatingItem.userReviewItemIndex", userReviewRatingItem.userReviewRatingItemIndex);

    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].titleID = userReviewRatingItem.titleID;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewCount = userReviewRatingItem.userReviewCount;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewSum = userReviewRatingItem.userReviewSum;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewAverage = userReviewRatingItem.userReviewAverage;

    //   }
    // },
    // deleteStateUserReviewsRatings: {
    //   reducer(state, action) {
    //     console.log(componentName, GetDateTime(), "deleteStateUserReviewsRatings action.payload", action.payload);

    //     const userReviewItemIndex = action.payload;
    //     // const reviewID = action.payload;

    //     // This doesn't work because state.arrayUserReviewsRatings isn't stored as an array of objects?
    //     // Need to copy the array?
    //     // const existingUserReviewIndex = state.arrayUserReviewsRatings.findIndex(userReview => userReview.reviewID === reviewID);
    //     // console.log(componentName, GetDateTime(), "deleteStateUserReviewsRatings existingUserReviewIndex", existingUserReviewIndex);

    //     state.arrayUserReviewsRatings.splice(userReviewItemIndex, 1);

    //   }
    // },
    setUserReviewsRatingsLoaded: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setUserReviewsRatingsLoaded action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "setUserReviewsRatingsLoaded action.payload.length", action.payload.length);

        state.userReviewsRatingsLoaded = action.payload;

      }
    },
    setLastDatabaseRetrievalUserReviewsRatings: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setLastDatabaseRetrievalUserReviewsRatings action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "setLastDatabaseRetrievalUserReviewsRatings action.payload.length", action.payload.length);

        state.lastDatabaseRetrievalUserReviewsRatings = action.payload;

      }
    },
    setUserReviewsRatingsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setUserReviewsRatingsDataOffline action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "setUserReviewsRatingsDataOffline action.payload.length", action.payload.length);

        state.userReviewsRatingsDataOffline = action.payload;

      }
    }
  }
});

export const { loadArrayUserReviews, addStateUserReview, updateStateUserReview, deleteStateUserReview, setUserReviewsDataOffline, /*loadArrayUserReviewsRatings, addStateUserReviewsRatings, updateStateUserReviewsRatings, deleteStateUserReviewsRatings,*/ setUserReviewsRatingsLoaded, setLastDatabaseRetrievalUserReviewsRatings, setUserReviewsRatingsDataOffline } = userReviewsSlice.actions;

export default userReviewsSlice.reducer;