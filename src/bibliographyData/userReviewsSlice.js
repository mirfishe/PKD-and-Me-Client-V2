import {createSlice} from "@reduxjs/toolkit";

const componentName = "userReviewsSlice.js";

const initialState = {
  arrayUserReviews: [],
  userReviewsLoaded: false,
  lastDatabaseRetrievalUserReviews: null,
  userReviewsDataOffline: false
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
    setUserReviewsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setUserReviewsDataOffline action.payload", action.payload);
        // console.log(componentName, "setUserReviewsDataOffline action.payload.length", action.payload.length);

        state.userReviewsDataOffline = action.payload;

      }
    }
}
});

export const {loadArrayUserReviews, setUserReviewsDataOffline} = userReviewsSlice.actions;

export default userReviewsSlice.reducer;