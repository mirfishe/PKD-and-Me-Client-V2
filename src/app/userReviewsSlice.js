import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, displayValue, getDateTime, hasNonEmptyProperty } from "../utilities/SharedFunctions";

const componentName = "userReviewsSlice.js";

const initialState = {
  arrayUserReviews: [],
  userReviewsLoaded: false,
  lastDatabaseRetrievalUserReviews: null,
  userReviewsDataOffline: false,
  // arrayUserReviewsRatings: [],
  userReviewsRatingsLoaded: false,
  lastDatabaseRetrievalUserReviewsRatings: null
  // userReviewsRatingsDataOffline: false
};

const userReviewsSlice = createSlice({
  name: "userReviews",
  initialState,
  reducers: {
    loadArrayUserReviews(state, action) {
      // console.log(componentName, getDateTime(), "loadArrayUserReviews action.payload", action.payload);
      // console.log(componentName, getDateTime(), "loadArrayUserReviews action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, getDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
        state.arrayUserReviews.push(action.payload[i]);

      };

      state.userReviewsLoaded = true;
      state.lastDatabaseRetrievalUserReviews = getDateTime();

    },
    addStateUserReview(state, action) {
      // console.log(componentName, getDateTime(), "addStateUserReview action.payload", action.payload);
      // console.log(componentName, getDateTime(), "addStateUserReview action.payload.length", action.payload.length);

      // * Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, getDateTime(), "addStateUserReview action.payload[i]", action.payload[i]);
        state.arrayUserReviews.push(action.payload[i]);

      };

    },
    updateStateUserReview(state, action) {
      // console.log(componentName, getDateTime(), "updateStateUserReview action.payload", action.payload);

      const userReviewItem = action.payload;
      let userReviewListIndex;
      // console.log(componentName, getDateTime(), "updateStateUserReview userReviewItem", userReviewItem);
      // console.log(componentName, getDateTime(), "updateStateUserReview userReviewItem.reviewID", userReviewItem.reviewID);

      if (typeof userReviewItem === "object") {

        if (hasNonEmptyProperty(userReviewItem, "reviewID")) {

          userReviewListIndex = state.arrayUserReviews.findIndex(userReview => userReview.reviewID === userReviewItem.reviewID);

          // console.log(componentName, getDateTime(), "updateStateUserReview userReviewListIndex", userReviewListIndex);

          // state.arrayUserReviews[userReviewListIndex].reviewID = userReviewItem.reviewID;

        };

        if (hasNonEmptyProperty(userReviewItem, "userID")) {

          state.arrayUserReviews[userReviewListIndex].userID = userReviewItem.userID;

        };

        if (hasNonEmptyProperty(userReviewItem, "updatedBy")) {

          state.arrayUserReviews[userReviewListIndex].updatedBy = userReviewItem.updatedBy;

        };

        if (hasNonEmptyProperty(userReviewItem, "userReviewUpdatedBy")) {

          state.arrayUserReviews[userReviewListIndex].userReviewUpdatedBy = userReviewItem.userReviewUpdatedBy;

        };

        if (hasNonEmptyProperty(userReviewItem, "titleID")) {

          state.arrayUserReviews[userReviewListIndex].titleID = userReviewItem.titleID;

        };

        if (hasNonEmptyProperty(userReviewItem, "read")) {

          state.arrayUserReviews[userReviewListIndex].read = userReviewItem.read;

        };

        if (hasNonEmptyProperty(userReviewItem, "dateRead")) {

          state.arrayUserReviews[userReviewListIndex].dateRead = userReviewItem.dateRead;

        };

        if (hasNonEmptyProperty(userReviewItem, "rating")) {

          state.arrayUserReviews[userReviewListIndex].rating = userReviewItem.rating;

        };

        if (hasNonEmptyProperty(userReviewItem, "ranking")) {

          state.arrayUserReviews[userReviewListIndex].ranking = userReviewItem.ranking;

        };

        if (hasNonEmptyProperty(userReviewItem, "shortReview")) {

          state.arrayUserReviews[userReviewListIndex].shortReview = userReviewItem.shortReview;

        };

        if (hasNonEmptyProperty(userReviewItem, "longReview")) {

          state.arrayUserReviews[userReviewListIndex].longReview = userReviewItem.longReview;

        };

        if (hasNonEmptyProperty(userReviewItem, "owned")) {

          state.arrayUserReviews[userReviewListIndex].owned = userReviewItem.owned;

        };

        if (hasNonEmptyProperty(userReviewItem, "datePurchased")) {

          state.arrayUserReviews[userReviewListIndex].datePurchased = userReviewItem.datePurchased;

        };

        if (hasNonEmptyProperty(userReviewItem, "active")) {

          state.arrayUserReviews[userReviewListIndex].active = userReviewItem.active;

        };

        if (hasNonEmptyProperty(userReviewItem, "userReviewActive")) {

          state.arrayUserReviews[userReviewListIndex].userReviewActive = userReviewItem.userReviewActive;

        };

        if (hasNonEmptyProperty(userReviewItem, "createDate")) {

          state.arrayUserReviews[userReviewListIndex].createDate = userReviewItem.createDate;

        };

        if (hasNonEmptyProperty(userReviewItem, "userReviewCreateDate")) {

          state.arrayUserReviews[userReviewListIndex].userReviewCreateDate = userReviewItem.userReviewCreateDate;

        };

        if (hasNonEmptyProperty(userReviewItem, "updateDate")) {

          state.arrayUserReviews[userReviewListIndex].updateDate = userReviewItem.updateDate;

        };

        if (hasNonEmptyProperty(userReviewItem, "userReviewUpdatedDate")) {

          state.arrayUserReviews[userReviewListIndex].userReviewUpdatedDate = userReviewItem.userReviewUpdatedDate;

        };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (hasNonEmptyProperty(userReviewItem, "title")) {

        //   if (hasNonEmptyProperty(userReviewItem.title, "titleID")) {

        //     state.arrayUserReviews[userReviewListIndex].title.titleID = userReviewItem.title.titleID;

        //   };

        if (hasNonEmptyProperty(userReviewItem, "titleName")) {

          state.arrayUserReviews[userReviewListIndex].titleName = userReviewItem.titleName;

        };

        if (hasNonEmptyProperty(userReviewItem, "titleSort")) {

          state.arrayUserReviews[userReviewListIndex].titleSort = userReviewItem.titleSort;

        };

        if (hasNonEmptyProperty(userReviewItem, "titleURL")) {

          state.arrayUserReviews[userReviewListIndex].titleURL = userReviewItem.titleURL;

        };

        if (hasNonEmptyProperty(userReviewItem, "authorFirstName")) {

          state.arrayUserReviews[userReviewListIndex].authorFirstName = userReviewItem.authorFirstName;

        };

        if (hasNonEmptyProperty(userReviewItem, "authorLastName")) {

          state.arrayUserReviews[userReviewListIndex].authorLastName = userReviewItem.authorLastName;

        };

        if (hasNonEmptyProperty(userReviewItem, "submissionDate")) {

          state.arrayUserReviews[userReviewListIndex].submissionDate = userReviewItem.submissionDate;

        };

        if (hasNonEmptyProperty(userReviewItem, "publicationDate")) {

          state.arrayUserReviews[userReviewListIndex].publicationDate = userReviewItem.publicationDate;

        };

        if (hasNonEmptyProperty(userReviewItem, "titlePublicationDate")) {

          state.arrayUserReviews[userReviewListIndex].titlePublicationDate = userReviewItem.titlePublicationDate;

        };

        if (hasNonEmptyProperty(userReviewItem, "imageName")) {

          state.arrayUserReviews[userReviewListIndex].imageName = userReviewItem.imageName;

        };

        if (hasNonEmptyProperty(userReviewItem, "titleImageName")) {

          state.arrayUserReviews[userReviewListIndex].titleImageName = userReviewItem.titleImageName;

        };

        if (hasNonEmptyProperty(userReviewItem, "categoryID")) {

          state.arrayUserReviews[userReviewListIndex].categoryID = userReviewItem.categoryID;

        };

        if (hasNonEmptyProperty(userReviewItem, "shortDescription")) {

          state.arrayUserReviews[userReviewListIndex].shortDescription = userReviewItem.shortDescription;

        };

        if (hasNonEmptyProperty(userReviewItem, "urlPKDWeb")) {

          state.arrayUserReviews[userReviewListIndex].urlPKDWeb = userReviewItem.urlPKDWeb;

        };

        // if (hasNonEmptyProperty(userReviewItem, "active")) {

        //   state.arrayUserReviews[userReviewListIndex].active = userReviewItem.active;

        // };

        if (hasNonEmptyProperty(userReviewItem, "titleActive")) {

          state.arrayUserReviews[userReviewListIndex].titleActive = userReviewItem.titleActive;

        };

        // if (hasNonEmptyProperty(userReviewItem, "createDate")) {

        //   state.arrayUserReviews[userReviewListIndex].createDate = userReviewItem.createDate;

        // };

        if (hasNonEmptyProperty(userReviewItem, "titleCreateDate")) {

          state.arrayUserReviews[userReviewListIndex].titleCreateDate = userReviewItem.titleCreateDate;

        };

        // if (hasNonEmptyProperty(userReviewItem, "updateDate")) {

        //   state.arrayUserReviews[userReviewListIndex].updateDate = userReviewItem.updateDate;

        // };

        if (hasNonEmptyProperty(userReviewItem, "titleUpdatedDate")) {

          state.arrayUserReviews[userReviewListIndex].titleUpdatedDate = userReviewItem.titleUpdatedDate;

        };

        // };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (hasNonEmptyProperty(userReviewItem, "user")) {

        //   if (hasNonEmptyProperty(userReviewItem.user, "userID")) {

        //     state.arrayUserReviews[userReviewListIndex].user.userID = userReviewItem.user.userID;

        //   };

        if (hasNonEmptyProperty(userReviewItem, "firstName")) {

          state.arrayUserReviews[userReviewListIndex].firstName = userReviewItem.firstName;

        };

        if (hasNonEmptyProperty(userReviewItem, "lastName")) {

          state.arrayUserReviews[userReviewListIndex].lastName = userReviewItem.lastName;

        };

        if (hasNonEmptyProperty(userReviewItem, "email")) {

          state.arrayUserReviews[userReviewListIndex].email = userReviewItem.email;

        };

        // if (hasNonEmptyProperty(userReviewItem, "updatedBy")) {

        //   state.arrayUserReviews[userReviewListIndex].updatedBy = userReviewItem.updatedBy;

        // };

        if (hasNonEmptyProperty(userReviewItem, "userUpdatedBy")) {

          state.arrayUserReviews[userReviewListIndex].userUpdatedBy = userReviewItem.userUpdatedBy;

        };

        if (hasNonEmptyProperty(userReviewItem, "admin")) {

          state.arrayUserReviews[userReviewListIndex].admin = userReviewItem.admin;

        };

        // if (hasNonEmptyProperty(userReviewItem, "active")) {

        //   state.arrayUserReviews[userReviewListIndex].active = userReviewItem.active;

        // };

        if (hasNonEmptyProperty(userReviewItem, "userActive")) {

          state.arrayUserReviews[userReviewListIndex].userActive = userReviewItem.userActive;

        };

        // };

      };

    },
    deleteStateUserReview(state, action) {
      // console.log(componentName, getDateTime(), "deleteStateUserReview action.payload", action.payload);

      // let userReviewItemIndex = action.payload;
      let userReviewListIndex;
      const reviewID = action.payload;

      // ? This doesn't work because state.arrayUserReviews isn't stored as an array of objects?
      // ? Need to copy the array?
      // const existingUserReviewIndex = state.arrayUserReviews.findIndex(userReview => userReview.reviewID === reviewID);
      // console.log(componentName, getDateTime(), "deleteStateUserReview existingUserReviewIndex", existingUserReviewIndex);

      if (isEmpty(reviewID) === false) {

        userReviewListIndex = state.arrayUserReviews.findIndex(userReview => userReview.reviewID === reviewID);

        // console.log(componentName, getDateTime(), "deleteStateUserReview userReviewListIndex", userReviewListIndex);

        state.arrayUserReviews.splice(userReviewListIndex, 1);

      };

    },
    setUserReviewsDataOffline(state, action) {
      // console.log(componentName, getDateTime(), "setUserReviewsDataOffline action.payload", action.payload);
      // console.log(componentName, getDateTime(), "setUserReviewsDataOffline action.payload.length", action.payload.length);

      state.userReviewsDataOffline = action.payload;

    },
    //   loadArrayUserReviewsRatings(state, action) {
    //       // console.log(componentName, getDateTime(), "loadArrayUserReviewsRatings action.payload", action.payload);
    //       // console.log(componentName, getDateTime(), "loadArrayUserReviewsRatings action.payload.length", action.payload.length);

    //       for (let i = 0; i < action.payload.length; i++) {

    //         // console.log(componentName, getDateTime(), "loadArrayTitles action.payload[i]", action.payload[i]);
    //         state.arrayUserReviewsRatings.push(action.payload[i]);

    //       };

    //       state.userReviewsRatingsLoaded = true;
    //       state.lastDatabaseRetrievalUserReviewsRatings = getDateTime();

    //   },
    //   addStateUserReviewsRatings(state, action) {
    //       // console.log(componentName, getDateTime(), "addStateUserReviewsRatings action.payload", action.payload);
    //       // console.log(componentName, getDateTime(), "addStateUserReviewsRatings action.payload.length", action.payload.length);

    //       // Could change this to accept an object and add that object to the store
    //       for (let i = 0; i < action.payload.length; i++) {

    //         // console.log(componentName, getDateTime(), "addStateUserReviewsRatings action.payload[i]", action.payload[i]);
    //         state.arrayUserReviewsRatings.push(action.payload[i]);

    //       };

    //   },
    // updateStateUserReviewsRatings(state, action) {
    //     // console.log(componentName, getDateTime(), "updateStateUserReviewsRatings action.payload", action.payload);

    //     const userReviewRatingItem = action.payload;
    //     // console.log(componentName, getDateTime(), "updateStateUserReviewsRatings userReviewRatingItem", userReviewRatingItem);
    //     // console.log(componentName, getDateTime(), "updateStateUserReviewsRatings userReviewRatingItem.titleID", userReviewRatingItem.titleID);
    //     // console.log(componentName, getDateTime(), "updateStateUserReviewsRatings userReviewRatingItem.userReviewItemIndex", userReviewRatingItem.userReviewRatingItemIndex);

    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].titleID = userReviewRatingItem.titleID;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewCount = userReviewRatingItem.userReviewCount;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewSum = userReviewRatingItem.userReviewSum;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewAverage = userReviewRatingItem.userReviewAverage;

    // },
    // deleteStateUserReviewsRatings(state, action) {
    //     console.log(componentName, getDateTime(), "deleteStateUserReviewsRatings action.payload", action.payload);

    //     const userReviewItemIndex = action.payload;
    //     // const reviewID = action.payload;

    //     // This doesn't work because state.arrayUserReviewsRatings isn't stored as an array of objects?
    //     // Need to copy the array?
    //     // const existingUserReviewIndex = state.arrayUserReviewsRatings.findIndex(userReview => userReview.reviewID === reviewID);
    //     // console.log(componentName, getDateTime(), "deleteStateUserReviewsRatings existingUserReviewIndex", existingUserReviewIndex);

    //     state.arrayUserReviewsRatings.splice(userReviewItemIndex, 1);

    // },
    setUserReviewsRatingsLoaded(state, action) {
      // console.log(componentName, getDateTime(), "setUserReviewsRatingsLoaded action.payload", action.payload);
      // console.log(componentName, getDateTime(), "setUserReviewsRatingsLoaded action.payload.length", action.payload.length);

      state.userReviewsRatingsLoaded = action.payload;

    },
    setLastDatabaseRetrievalUserReviewsRatings(state, action) {
      // console.log(componentName, getDateTime(), "setLastDatabaseRetrievalUserReviewsRatings action.payload", action.payload);
      // console.log(componentName, getDateTime(), "setLastDatabaseRetrievalUserReviewsRatings action.payload.length", action.payload.length);

      state.lastDatabaseRetrievalUserReviewsRatings = action.payload;

    }
    // setUserReviewsRatingsDataOffline(state, action) {
    //   // console.log(componentName, getDateTime(), "setUserReviewsRatingsDataOffline action.payload", action.payload);
    //   // console.log(componentName, getDateTime(), "setUserReviewsRatingsDataOffline action.payload.length", action.payload.length);

    //   state.userReviewsRatingsDataOffline = action.payload;

    // }
  }
});

export const { loadArrayUserReviews, addStateUserReview, updateStateUserReview, deleteStateUserReview, setUserReviewsDataOffline, /*loadArrayUserReviewsRatings, addStateUserReviewsRatings, updateStateUserReviewsRatings, deleteStateUserReviewsRatings,*/ setUserReviewsRatingsLoaded, setLastDatabaseRetrievalUserReviewsRatings /* , setUserReviewsRatingsDataOffline */ } = userReviewsSlice.actions;

export default userReviewsSlice.reducer;