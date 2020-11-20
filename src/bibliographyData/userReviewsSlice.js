import {createSlice} from "@reduxjs/toolkit";

const componentName = "userReviewsSlice.js";

const initialState = {
  arrayUserReviews: [],
  userReviewsLoaded: false,
  lastDatabaseRetrievalUserReviews: null,
  userReviewsDataOffline: false,
  arrayUserReviewsRatings: [],
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
        // console.log(componentName, "loadArrayUserReviews action.payload", action.payload);
        // console.log(componentName, "loadArrayUserReviews action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayTitles action.payload[i]", action.payload[i]);
          state.arrayUserReviews.push(action.payload[i]);
        };

        state.userReviewsLoaded = true;
        state.lastDatabaseRetrievalUserReviews = new Date().toISOString();

      }
    },
    addStateUserReview: {
      reducer(state, action) {
        // console.log(componentName, "addStateUserReview action.payload", action.payload);
        // console.log(componentName, "addStateUserReview action.payload.length", action.payload.length);

        // Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "addStateUserReview action.payload[i]", action.payload[i]);
          state.arrayUserReviews.push(action.payload[i]);
        };

      }
    },
  updateStateUserReview: {
    reducer(state, action) {
      console.log(componentName, "updateStateUserReview action.payload", action.payload);

      const userReviewItem = action.payload;
      console.log(componentName, "updateStateTitle userReviewItem", userReviewItem);
      console.log(componentName, "updateStateTitle userReviewItem.userReviewID", userReviewItem.userReviewID);
      console.log(componentName, "updateStateTitle userReviewItem.userReviewItemIndex", userReviewItem.userReviewItemIndex);

      state.arrayUserReviews[userReviewItem.userReviewItemIndex].reviewID = userReviewItem.reviewID;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].userID = userReviewItem.userID;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].updatedBy = userReviewItem.updatedBy;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].titleID = userReviewItem.titleID;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].read = userReviewItem.read;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].dateRead = userReviewItem.dateRead;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].rating = userReviewItem.rating;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].shortReview = userReviewItem.shortReview;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].longReview = userReviewItem.longReview;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].active = userReviewItem.active;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].createdAt = userReviewItem.createdAt;
      state.arrayUserReviews[userReviewItem.userReviewItemIndex].updatedAt = userReviewItem.updatedAt;

    }
  },
  deleteStateUserReview: {
    reducer(state, action) {
      console.log(componentName, "deleteStateUserReview action.payload", action.payload);

      const userReviewItemIndex = action.payload;
      // const userReviewID = action.payload;
      
      // This doesn't work because state.arrayUserReviews isn't stored as an array of objects?
      // Need to copy the array?
      // const existingUserReviewIndex = state.arrayUserReviews.findIndex(userReview => userReview.reviewID === reviewID);
      // console.log(componentName, "deleteStateUserReview existingUserReviewIndex", existingUserReviewIndex);

      state.arrayUserReviews.splice(userReviewItemIndex, 1);

    }
  },
    setUserReviewsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setUserReviewsDataOffline action.payload", action.payload);
        // console.log(componentName, "setUserReviewsDataOffline action.payload.length", action.payload.length);

        state.userReviewsDataOffline = action.payload;

      }
    },
    loadArrayUserReviewsRatings: {
      reducer(state, action) {
        // console.log(componentName, "loadArrayUserReviewsRatings action.payload", action.payload);
        // console.log(componentName, "loadArrayUserReviewsRatings action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayTitles action.payload[i]", action.payload[i]);
          state.arrayUserReviewsRatings.push(action.payload[i]);
        };

        state.userReviewsRatingsLoaded = true;
        state.lastDatabaseRetrievalUserReviewsRatings = new Date().toISOString();

      }
    },
    addStateUserReviewsRatings: {
      reducer(state, action) {
        // console.log(componentName, "addStateUserReviewsRatings action.payload", action.payload);
        // console.log(componentName, "addStateUserReviewsRatings action.payload.length", action.payload.length);

        // Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "addStateUserReviewsRatings action.payload[i]", action.payload[i]);
          state.arrayUserReviewsRatings.push(action.payload[i]);
        };

      }
    },
  updateStateUserReviewsRatings: {
    reducer(state, action) {
      console.log(componentName, "updateStateUserReviewsRatings action.payload", action.payload);

      const userReviewItem = action.payload;
      console.log(componentName, "updateStateUserReviewsRatings userReviewItem", userReviewItem);
      console.log(componentName, "updateStateUserReviewsRatings userReviewItem.userReviewID", userReviewItem.userReviewID);
      console.log(componentName, "updateStateUserReviewsRatings userReviewItem.userReviewItemIndex", userReviewItem.userReviewItemIndex);

      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].reviewID = userReviewItem.reviewID;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].userID = userReviewItem.userID;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].updatedBy = userReviewItem.updatedBy;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].titleID = userReviewItem.titleID;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].read = userReviewItem.read;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].dateRead = userReviewItem.dateRead;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].rating = userReviewItem.rating;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].shortReview = userReviewItem.shortReview;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].longReview = userReviewItem.longReview;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].active = userReviewItem.active;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].createdAt = userReviewItem.createdAt;
      state.arrayUserReviewsRatings[userReviewItem.userReviewItemIndex].updatedAt = userReviewItem.updatedAt;

    }
  },
  deleteStateUserReviewsRatings: {
    reducer(state, action) {
      console.log(componentName, "deleteStateUserReviewsRatings action.payload", action.payload);

      const userReviewItemIndex = action.payload;
      // const userReviewID = action.payload;
      
      // This doesn't work because state.arrayUserReviewsRatings isn't stored as an array of objects?
      // Need to copy the array?
      // const existingUserReviewIndex = state.arrayUserReviewsRatings.findIndex(userReview => userReview.reviewID === reviewID);
      // console.log(componentName, "deleteStateUserReviewsRatings existingUserReviewIndex", existingUserReviewIndex);

      state.arrayUserReviewsRatings.splice(userReviewItemIndex, 1);

    }
  },
    setUserReviewsRatingsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setUserReviewsRatingsDataOffline action.payload", action.payload);
        // console.log(componentName, "setUserReviewsRatingsDataOffline action.payload.length", action.payload.length);

        state.userReviewsRatingsDataOffline = action.payload;

      }
    }
}
});

export const {loadArrayUserReviews, addStateUserReview, updateStateUserReview, deleteStateUserReview, setUserReviewsDataOffline, loadArrayUserReviewsRatings, addStateUserReviewsRatings, updateStateUserReviewsRatings, deleteStateUserReviewsRatings, setUserReviewsRatingsDataOffline} = userReviewsSlice.actions;

export default userReviewsSlice.reducer;