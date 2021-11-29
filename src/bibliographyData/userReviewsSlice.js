import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "../app/sharedFunctions";

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
    loadArrayUserReviews(state, action) {
      // console.log(componentName, GetDateTime(), "loadArrayUserReviews action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "loadArrayUserReviews action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {
        // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
        state.arrayUserReviews.push(action.payload[i]);
      };

      state.userReviewsLoaded = true;
      state.lastDatabaseRetrievalUserReviews = GetDateTime();

    },
    addStateUserReview(state, action) {
      // console.log(componentName, GetDateTime(), "addStateUserReview action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "addStateUserReview action.payload.length", action.payload.length);

      // * Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {
        // console.log(componentName, GetDateTime(), "addStateUserReview action.payload[i]", action.payload[i]);
        state.arrayUserReviews.push(action.payload[i]);
      };

    },
    updateStateUserReview(state, action) {
      // console.log(componentName, GetDateTime(), "updateStateUserReview action.payload", action.payload);

      const userReviewItem = action.payload;
      let userReviewListIndex;
      // console.log(componentName, GetDateTime(), "updateStateUserReview userReviewItem", userReviewItem);
      // console.log(componentName, GetDateTime(), "updateStateUserReview userReviewItem.reviewID", userReviewItem.reviewID);

      if (typeof userReviewItem === "object") {

        if (HasNonEmptyProperty(userReviewItem, "reviewID")) {

          userReviewListIndex = state.arrayUserReviews.findIndex(userReview => userReview.reviewID === userReviewItem.reviewID);

          // console.log(componentName, GetDateTime(), "updateStateUserReview userReviewListIndex", userReviewListIndex);

          // state.arrayUserReviews[userReviewListIndex].reviewID = userReviewItem.reviewID;
        };

        if (HasNonEmptyProperty(userReviewItem, "userID")) {
          state.arrayUserReviews[userReviewListIndex].userID = userReviewItem.userID;
        };

        if (HasNonEmptyProperty(userReviewItem, "updatedBy")) {
          state.arrayUserReviews[userReviewListIndex].updatedBy = userReviewItem.updatedBy;
        };

        if (HasNonEmptyProperty(userReviewItem, "userReviewUpdatedBy")) {
          state.arrayUserReviews[userReviewListIndex].userReviewUpdatedBy = userReviewItem.userReviewUpdatedBy;
        };

        if (HasNonEmptyProperty(userReviewItem, "titleID")) {
          state.arrayUserReviews[userReviewListIndex].titleID = userReviewItem.titleID;
        };

        if (HasNonEmptyProperty(userReviewItem, "read")) {
          state.arrayUserReviews[userReviewListIndex].read = userReviewItem.read;
        };

        if (HasNonEmptyProperty(userReviewItem, "dateRead")) {
          state.arrayUserReviews[userReviewListIndex].dateRead = userReviewItem.dateRead;
        };

        if (HasNonEmptyProperty(userReviewItem, "rating")) {
          state.arrayUserReviews[userReviewListIndex].rating = userReviewItem.rating;
        };

        if (HasNonEmptyProperty(userReviewItem, "ranking")) {
          state.arrayUserReviews[userReviewListIndex].ranking = userReviewItem.ranking;
        };

        if (HasNonEmptyProperty(userReviewItem, "shortReview")) {
          state.arrayUserReviews[userReviewListIndex].shortReview = userReviewItem.shortReview;
        };

        if (HasNonEmptyProperty(userReviewItem, "longReview")) {
          state.arrayUserReviews[userReviewListIndex].longReview = userReviewItem.longReview;
        };

        if (HasNonEmptyProperty(userReviewItem, "owned")) {
          state.arrayUserReviews[userReviewListIndex].owned = userReviewItem.owned;
        };

        if (HasNonEmptyProperty(userReviewItem, "datePurchased")) {
          state.arrayUserReviews[userReviewListIndex].datePurchased = userReviewItem.datePurchased;
        };

        if (HasNonEmptyProperty(userReviewItem, "active")) {
          state.arrayUserReviews[userReviewListIndex].active = userReviewItem.active;
        };

        if (HasNonEmptyProperty(userReviewItem, "userReviewActive")) {
          state.arrayUserReviews[userReviewListIndex].userReviewActive = userReviewItem.userReviewActive;
        };

        if (HasNonEmptyProperty(userReviewItem, "createDate")) {
          state.arrayUserReviews[userReviewListIndex].createDate = userReviewItem.createDate;
        };

        if (HasNonEmptyProperty(userReviewItem, "userReviewCreateDate")) {
          state.arrayUserReviews[userReviewListIndex].userReviewCreateDate = userReviewItem.userReviewCreateDate;
        };

        if (HasNonEmptyProperty(userReviewItem, "updateDate")) {
          state.arrayUserReviews[userReviewListIndex].updateDate = userReviewItem.updateDate;
        };

        if (HasNonEmptyProperty(userReviewItem, "userReviewUpdatedDate")) {
          state.arrayUserReviews[userReviewListIndex].userReviewUpdatedDate = userReviewItem.userReviewUpdatedDate;
        };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (HasNonEmptyProperty(userReviewItem, "title")) {

        //   if (HasNonEmptyProperty(userReviewItem.title, "titleID")) {
        //     state.arrayUserReviews[userReviewListIndex].title.titleID = userReviewItem.title.titleID;
        //   };

        if (HasNonEmptyProperty(userReviewItem, "titleName")) {
          state.arrayUserReviews[userReviewListIndex].titleName = userReviewItem.titleName;
        };

        if (HasNonEmptyProperty(userReviewItem, "titleSort")) {
          state.arrayUserReviews[userReviewListIndex].titleSort = userReviewItem.titleSort;
        };

        if (HasNonEmptyProperty(userReviewItem, "titleURL")) {
          state.arrayUserReviews[userReviewListIndex].titleURL = userReviewItem.titleURL;
        };

        if (HasNonEmptyProperty(userReviewItem, "authorFirstName")) {
          state.arrayUserReviews[userReviewListIndex].authorFirstName = userReviewItem.authorFirstName;
        };

        if (HasNonEmptyProperty(userReviewItem, "authorLastName")) {
          state.arrayUserReviews[userReviewListIndex].authorLastName = userReviewItem.authorLastName;
        };

        if (HasNonEmptyProperty(userReviewItem, "submissionDate")) {
          state.arrayUserReviews[userReviewListIndex].submissionDate = userReviewItem.submissionDate;
        };

        if (HasNonEmptyProperty(userReviewItem, "publicationDate")) {
          state.arrayUserReviews[userReviewListIndex].publicationDate = userReviewItem.publicationDate;
        };

        if (HasNonEmptyProperty(userReviewItem, "titlePublicationDate")) {
          state.arrayUserReviews[userReviewListIndex].titlePublicationDate = userReviewItem.titlePublicationDate;
        };

        if (HasNonEmptyProperty(userReviewItem, "imageName")) {
          state.arrayUserReviews[userReviewListIndex].imageName = userReviewItem.imageName;
        };

        if (HasNonEmptyProperty(userReviewItem, "titleImageName")) {
          state.arrayUserReviews[userReviewListIndex].titleImageName = userReviewItem.titleImageName;
        };

        if (HasNonEmptyProperty(userReviewItem, "categoryID")) {
          state.arrayUserReviews[userReviewListIndex].categoryID = userReviewItem.categoryID;
        };

        if (HasNonEmptyProperty(userReviewItem, "shortDescription")) {
          state.arrayUserReviews[userReviewListIndex].shortDescription = userReviewItem.shortDescription;
        };

        if (HasNonEmptyProperty(userReviewItem, "urlPKDweb")) {
          state.arrayUserReviews[userReviewListIndex].urlPKDweb = userReviewItem.urlPKDweb;
        };

        // if (HasNonEmptyProperty(userReviewItem, "active")) {
        //   state.arrayUserReviews[userReviewListIndex].active = userReviewItem.active;
        // };

        if (HasNonEmptyProperty(userReviewItem, "titleActive")) {
          state.arrayUserReviews[userReviewListIndex].titleActive = userReviewItem.titleActive;
        };

        // if (HasNonEmptyProperty(userReviewItem, "createDate")) {
        //   state.arrayUserReviews[userReviewListIndex].createDate = userReviewItem.createDate;
        // };

        if (HasNonEmptyProperty(userReviewItem, "titleCreateDate")) {
          state.arrayUserReviews[userReviewListIndex].titleCreateDate = userReviewItem.titleCreateDate;
        };

        // if (HasNonEmptyProperty(userReviewItem, "updateDate")) {
        //   state.arrayUserReviews[userReviewListIndex].updateDate = userReviewItem.updateDate;
        // };

        if (HasNonEmptyProperty(userReviewItem, "titleUpdatedDate")) {
          state.arrayUserReviews[userReviewListIndex].titleUpdatedDate = userReviewItem.titleUpdatedDate;
        };

        // };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (HasNonEmptyProperty(userReviewItem, "user")) {

        //   if (HasNonEmptyProperty(userReviewItem.user, "userID")) {
        //     state.arrayUserReviews[userReviewListIndex].user.userID = userReviewItem.user.userID;
        //   };

        if (HasNonEmptyProperty(userReviewItem, "firstName")) {
          state.arrayUserReviews[userReviewListIndex].firstName = userReviewItem.firstName;
        };

        if (HasNonEmptyProperty(userReviewItem, "lastName")) {
          state.arrayUserReviews[userReviewListIndex].lastName = userReviewItem.lastName;
        };

        if (HasNonEmptyProperty(userReviewItem, "email")) {
          state.arrayUserReviews[userReviewListIndex].email = userReviewItem.email;
        };

        // if (HasNonEmptyProperty(userReviewItem, "updatedBy")) {
        //   state.arrayUserReviews[userReviewListIndex].updatedBy = userReviewItem.updatedBy;
        // };

        if (HasNonEmptyProperty(userReviewItem, "userUpdatedBy")) {
          state.arrayUserReviews[userReviewListIndex].userUpdatedBy = userReviewItem.userUpdatedBy;
        };

        if (HasNonEmptyProperty(userReviewItem, "admin")) {
          state.arrayUserReviews[userReviewListIndex].admin = userReviewItem.admin;
        };

        // if (HasNonEmptyProperty(userReviewItem, "active")) {
        //   state.arrayUserReviews[userReviewListIndex].active = userReviewItem.active;
        // };

        if (HasNonEmptyProperty(userReviewItem, "userActive")) {
          state.arrayUserReviews[userReviewListIndex].userActive = userReviewItem.userActive;
        };

        // };

      };

    },
    deleteStateUserReview(state, action) {
      // console.log(componentName, GetDateTime(), "deleteStateUserReview action.payload", action.payload);

      // let userReviewItemIndex = action.payload;
      let userReviewListIndex;
      const reviewID = action.payload;

      // ? This doesn't work because state.arrayUserReviews isn't stored as an array of objects?
      // ? Need to copy the array?
      // const existingUserReviewIndex = state.arrayUserReviews.findIndex(userReview => userReview.reviewID === reviewID);
      // console.log(componentName, GetDateTime(), "deleteStateUserReview existingUserReviewIndex", existingUserReviewIndex);

      if (IsEmpty(reviewID) === false) {

        userReviewListIndex = state.arrayUserReviews.findIndex(userReview => userReview.reviewID === reviewID);

        // console.log(componentName, GetDateTime(), "deleteStateUserReview userReviewListIndex", userReviewListIndex);

        state.arrayUserReviews.splice(userReviewListIndex, 1);

      };

    },
    setUserReviewsDataOffline(state, action) {
      // console.log(componentName, GetDateTime(), "setUserReviewsDataOffline action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "setUserReviewsDataOffline action.payload.length", action.payload.length);

      state.userReviewsDataOffline = action.payload;

    },
    //   loadArrayUserReviewsRatings(state, action) {
    //       // console.log(componentName, GetDateTime(), "loadArrayUserReviewsRatings action.payload", action.payload);
    //       // console.log(componentName, GetDateTime(), "loadArrayUserReviewsRatings action.payload.length", action.payload.length);

    //       for (let i = 0; i < action.payload.length; i++) {
    //         // console.log(componentName, GetDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
    //         state.arrayUserReviewsRatings.push(action.payload[i]);
    //       };

    //       state.userReviewsRatingsLoaded = true;
    //       state.lastDatabaseRetrievalUserReviewsRatings = GetDateTime();

    //   },
    //   addStateUserReviewsRatings(state, action) {
    //       // console.log(componentName, GetDateTime(), "addStateUserReviewsRatings action.payload", action.payload);
    //       // console.log(componentName, GetDateTime(), "addStateUserReviewsRatings action.payload.length", action.payload.length);

    //       // Could change this to accept an object and add that object to the store
    //       for (let i = 0; i < action.payload.length; i++) {
    //         // console.log(componentName, GetDateTime(), "addStateUserReviewsRatings action.payload[i]", action.payload[i]);
    //         state.arrayUserReviewsRatings.push(action.payload[i]);
    //       };

    //   },
    // updateStateUserReviewsRatings(state, action) {
    //     // console.log(componentName, GetDateTime(), "updateStateUserReviewsRatings action.payload", action.payload);

    //     const userReviewRatingItem = action.payload;
    //     // console.log(componentName, GetDateTime(), "updateStateUserReviewsRatings userReviewRatingItem", userReviewRatingItem);
    //     // console.log(componentName, GetDateTime(), "updateStateUserReviewsRatings userReviewRatingItem.titleID", userReviewRatingItem.titleID);
    //     // console.log(componentName, GetDateTime(), "updateStateUserReviewsRatings userReviewRatingItem.userReviewItemIndex", userReviewRatingItem.userReviewRatingItemIndex);

    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].titleID = userReviewRatingItem.titleID;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewCount = userReviewRatingItem.userReviewCount;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewSum = userReviewRatingItem.userReviewSum;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewAverage = userReviewRatingItem.userReviewAverage;

    // },
    // deleteStateUserReviewsRatings(state, action) {
    //     console.log(componentName, GetDateTime(), "deleteStateUserReviewsRatings action.payload", action.payload);

    //     const userReviewItemIndex = action.payload;
    //     // const reviewID = action.payload;

    //     // This doesn't work because state.arrayUserReviewsRatings isn't stored as an array of objects?
    //     // Need to copy the array?
    //     // const existingUserReviewIndex = state.arrayUserReviewsRatings.findIndex(userReview => userReview.reviewID === reviewID);
    //     // console.log(componentName, GetDateTime(), "deleteStateUserReviewsRatings existingUserReviewIndex", existingUserReviewIndex);

    //     state.arrayUserReviewsRatings.splice(userReviewItemIndex, 1);

    // },
    setUserReviewsRatingsLoaded(state, action) {
      // console.log(componentName, GetDateTime(), "setUserReviewsRatingsLoaded action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "setUserReviewsRatingsLoaded action.payload.length", action.payload.length);

      state.userReviewsRatingsLoaded = action.payload;

    },
    setLastDatabaseRetrievalUserReviewsRatings(state, action) {
      // console.log(componentName, GetDateTime(), "setLastDatabaseRetrievalUserReviewsRatings action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "setLastDatabaseRetrievalUserReviewsRatings action.payload.length", action.payload.length);

      state.lastDatabaseRetrievalUserReviewsRatings = action.payload;

    },
    setUserReviewsRatingsDataOffline(state, action) {
      // console.log(componentName, GetDateTime(), "setUserReviewsRatingsDataOffline action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "setUserReviewsRatingsDataOffline action.payload.length", action.payload.length);

      state.userReviewsRatingsDataOffline = action.payload;

    }
  }
});

export const { loadArrayUserReviews, addStateUserReview, updateStateUserReview, deleteStateUserReview, setUserReviewsDataOffline, /*loadArrayUserReviewsRatings, addStateUserReviewsRatings, updateStateUserReviewsRatings, deleteStateUserReviewsRatings,*/ setUserReviewsRatingsLoaded, setLastDatabaseRetrievalUserReviewsRatings, setUserReviewsRatingsDataOffline } = userReviewsSlice.actions;

export default userReviewsSlice.reducer;