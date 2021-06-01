import { createSlice } from "@reduxjs/toolkit";

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

        // * Could change this to accept an object and add that object to the store
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
        // console.log(componentName, "updateStateUserReview userReviewItem", userReviewItem);
        // console.log(componentName, "updateStateUserReview userReviewItem.userReviewID", userReviewItem.reviewID);
        // console.log(componentName, "updateStateUserReview userReviewItem.userReviewItemIndex", userReviewItem.userReviewItemIndex);

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

          if (userReviewItem.hasOwnProperty("shortReview")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].shortReview = userReviewItem.shortReview;
          };

          if (userReviewItem.hasOwnProperty("longReview")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].longReview = userReviewItem.longReview;
          };

          if (userReviewItem.hasOwnProperty("active")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].active = userReviewItem.active;
          };

          if (userReviewItem.hasOwnProperty("updatedAt")) {
            state.arrayUserReviews[userReviewItem.userReviewItemIndex].updatedAt = userReviewItem.updatedAt;
          };

          // TODO: Fix how this is handled with the change in the left outer joins from Knex.
          if (userReviewItem.hasOwnProperty("title")) {

            if (userReviewItem.title.hasOwnProperty("titleID")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.titleID = userReviewItem.title.titleID;
            };

            if (userReviewItem.title.hasOwnProperty("titleName")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.titleName = userReviewItem.title.titleName;
            };

            if (userReviewItem.title.hasOwnProperty("titleSort")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.titleSort = userReviewItem.title.titleSort;
            };

            if (userReviewItem.title.hasOwnProperty("titleURL")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.titleURL = userReviewItem.title.titleURL;
            };

            if (userReviewItem.title.hasOwnProperty("authorFirstName")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.authorFirstName = userReviewItem.title.authorFirstName;
            };

            if (userReviewItem.title.hasOwnProperty("authorLastName")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.authorLastName = userReviewItem.title.authorLastName;
            };

            if (userReviewItem.title.hasOwnProperty("publicationDate")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.publicationDate = userReviewItem.title.publicationDate;
            };

            if (userReviewItem.title.hasOwnProperty("imageName")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.imageName = userReviewItem.title.imageName;
            };

            if (userReviewItem.title.hasOwnProperty("categoryID")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.categoryID = userReviewItem.title.categoryID;
            };

            if (userReviewItem.title.hasOwnProperty("shortDescription")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.shortDescription = userReviewItem.title.shortDescription;
            };

            if (userReviewItem.title.hasOwnProperty("urlPKDweb")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.urlPKDweb = userReviewItem.title.urlPKDweb;
            };

            if (userReviewItem.title.hasOwnProperty("active")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.active = userReviewItem.title.active;
            };

            if (userReviewItem.title.hasOwnProperty("updatedAt")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].title.updatedAt = userReviewItem.title.updatedAt;
            };

          };

          // TODO: Fix how this is handled with the change in the left outer joins from Knex.
          if (userReviewItem.hasOwnProperty("user")) {

            if (userReviewItem.user.hasOwnProperty("userID")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].user.userID = userReviewItem.user.userID;
            };

            if (userReviewItem.user.hasOwnProperty("firstName")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].firstName = userReviewItem.user.firstName;
            };

            if (userReviewItem.user.hasOwnProperty("lastName")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].lastName = userReviewItem.user.lastName;
            };

            if (userReviewItem.user.hasOwnProperty("email")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].email = userReviewItem.user.email;
            };

            if (userReviewItem.user.hasOwnProperty("updatedBy")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].updatedBy = userReviewItem.user.updatedBy;
            };

            if (userReviewItem.user.hasOwnProperty("admin")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].admin = userReviewItem.user.admin;
            };

            if (userReviewItem.user.hasOwnProperty("active")) {
              state.arrayUserReviews[userReviewItem.userReviewItemIndex].active = userReviewItem.user.active;
            };

          };

        };

      }
    },
    deleteStateUserReview: {
      reducer(state, action) {
        // console.log(componentName, "deleteStateUserReview action.payload", action.payload);

        const userReviewItemIndex = action.payload;
        // const userReviewID = action.payload;

        // ? This doesn't work because state.arrayUserReviews isn't stored as an array of objects?
        // ? Need to copy the array?
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
    //   loadArrayUserReviewsRatings: {
    //     reducer(state, action) {
    //       // console.log(componentName, "loadArrayUserReviewsRatings action.payload", action.payload);
    //       // console.log(componentName, "loadArrayUserReviewsRatings action.payload.length", action.payload.length);

    //       for (let i = 0; i < action.payload.length; i++) {
    //         // console.log(componentName, "loadArrayTitles action.payload[i]", action.payload[i]);
    //         state.arrayUserReviewsRatings.push(action.payload[i]);
    //       };

    //       state.userReviewsRatingsLoaded = true;
    //       state.lastDatabaseRetrievalUserReviewsRatings = new Date().toISOString();

    //     }
    //   },
    //   addStateUserReviewsRatings: {
    //     reducer(state, action) {
    //       // console.log(componentName, "addStateUserReviewsRatings action.payload", action.payload);
    //       // console.log(componentName, "addStateUserReviewsRatings action.payload.length", action.payload.length);

    //       // Could change this to accept an object and add that object to the store
    //       for (let i = 0; i < action.payload.length; i++) {
    //         // console.log(componentName, "addStateUserReviewsRatings action.payload[i]", action.payload[i]);
    //         state.arrayUserReviewsRatings.push(action.payload[i]);
    //       };

    //     }
    //   },
    // updateStateUserReviewsRatings: {
    //   reducer(state, action) {
    //     // console.log(componentName, "updateStateUserReviewsRatings action.payload", action.payload);

    //     const userReviewRatingItem = action.payload;
    //     // console.log(componentName, "updateStateUserReviewsRatings userReviewRatingItem", userReviewRatingItem);
    //     // console.log(componentName, "updateStateUserReviewsRatings userReviewRatingItem.titleID", userReviewRatingItem.titleID);
    //     // console.log(componentName, "updateStateUserReviewsRatings userReviewRatingItem.userReviewItemIndex", userReviewRatingItem.userReviewRatingItemIndex);

    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].titleID = userReviewRatingItem.titleID;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewCount = userReviewRatingItem.userReviewCount;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewSum = userReviewRatingItem.userReviewSum;
    //     state.arrayUserReviewsRatings[userReviewRatingItem.userReviewItemIndex].userReviewAverage = userReviewRatingItem.userReviewAverage;

    //   }
    // },
    // deleteStateUserReviewsRatings: {
    //   reducer(state, action) {
    //     console.log(componentName, "deleteStateUserReviewsRatings action.payload", action.payload);

    //     const userReviewItemIndex = action.payload;
    //     // const userReviewID = action.payload;

    //     // This doesn't work because state.arrayUserReviewsRatings isn't stored as an array of objects?
    //     // Need to copy the array?
    //     // const existingUserReviewIndex = state.arrayUserReviewsRatings.findIndex(userReview => userReview.reviewID === reviewID);
    //     // console.log(componentName, "deleteStateUserReviewsRatings existingUserReviewIndex", existingUserReviewIndex);

    //     state.arrayUserReviewsRatings.splice(userReviewItemIndex, 1);

    //   }
    // },
    setUserReviewsRatingsLoaded: {
      reducer(state, action) {
        // console.log(componentName, "setUserReviewsRatingsLoaded action.payload", action.payload);
        // console.log(componentName, "setUserReviewsRatingsLoaded action.payload.length", action.payload.length);

        state.userReviewsRatingsLoaded = action.payload;

      }
    },
    setLastDatabaseRetrievalUserReviewsRatings: {
      reducer(state, action) {
        // console.log(componentName, "setLastDatabaseRetrievalUserReviewsRatings action.payload", action.payload);
        // console.log(componentName, "setLastDatabaseRetrievalUserReviewsRatings action.payload.length", action.payload.length);

        state.lastDatabaseRetrievalUserReviewsRatings = action.payload;

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

export const { loadArrayUserReviews, addStateUserReview, updateStateUserReview, deleteStateUserReview, setUserReviewsDataOffline, /*loadArrayUserReviewsRatings, addStateUserReviewsRatings, updateStateUserReviewsRatings, deleteStateUserReviewsRatings,*/ setUserReviewsRatingsLoaded, setLastDatabaseRetrievalUserReviewsRatings, setUserReviewsRatingsDataOffline } = userReviewsSlice.actions;

export default userReviewsSlice.reducer;