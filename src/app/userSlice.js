import {createSlice} from "@reduxjs/toolkit";

const componentName = "userSlice.js";

const initialState = {
    userID: null,
    firstName: null,
    lastName: null,
    email: null,
    updatedBy: null,
    admin: false,
    active: false,
    sessionToken: null,
    userLoaded: false,
    arrayChecklist: [],
    checklistLoaded: false,
    lastDatabaseRetrievalChecklist: null,
    checklistDataOffline: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserData: {
      reducer(state, action) {
        // console.log(componentName, "loadUserData action.payload", action.payload);

        if (typeof action.payload === "object") {


            if (action.payload.hasOwnProperty("userID")) {
                state.userID = action.payload.userID;
            };

            if (action.payload.hasOwnProperty("firstName")) {
                state.firstName = action.payload.firstName;
            };

            if (action.payload.hasOwnProperty("lastName")) {
                state.lastName = action.payload.lastName;
            };

            if (action.payload.hasOwnProperty("email")) {
                state.email = action.payload.email;
            };

            if (action.payload.hasOwnProperty("updatedBy")) {
                state.updatedBy = action.payload.updatedBy;
            };

            if (action.payload.hasOwnProperty("admin")) {
                state.admin = action.payload.admin;
            };

            if (action.payload.hasOwnProperty("active")) {
                state.active = action.payload.active;
            };

            if (action.payload.hasOwnProperty("arrayChecklist")) {
              state.arrayChecklist = action.payload.arrayChecklist;
            };

            if (action.payload.hasOwnProperty("checklistLoaded")) {
              state.checklistLoaded = action.payload.checklistLoaded;
            };

            if (action.payload.hasOwnProperty("lastDatabaseRetrievalChecklist")) {
              state.lastDatabaseRetrievalChecklist = action.payload.lastDatabaseRetrievalChecklist;
            };

            if (action.payload.hasOwnProperty("userLoaded")) {
              state.userLoaded = action.payload.userLoaded;
            } else {
              state.userLoaded = true;
            };

        };

      }
    },
    setSessionToken: {
      reducer(state, action) {
        // console.log(componentName, "setLinkItem action.payload", action.payload);

        state.sessionToken = action.payload;

      }
    },
    loadArrayChecklist: {
      reducer(state, action) {
        // console.log(componentName, "loadArrayChecklist action.payload", action.payload);
        // console.log(componentName, "loadArrayChecklist action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayChecklist action.payload[i]", action.payload[i]);
          // state.arrayChecklist.push(action.payload[i]);

          let userReviewID = null;
          let userReviewUserID = null;
          let userReviewUpdatedBy = null;
          let userReviewRead = null;
          let userReviewDateRead = null;
          let userReviewActive = null;
          let userReviewCreatedAt = null;
          let userReviewUpdatedAt = null;

          if (action.payload[i].userReviews[0] !== undefined && action.payload[i].userReviews[0] !== null) {
              userReviewID = action.payload[i].userReviews[0].reviewID;
              userReviewUserID = action.payload[i].userReviews[0].userID;
              userReviewUpdatedBy = action.payload[i].userReviews[0].updatedBy;
              userReviewRead = action.payload[i].userReviews[0].read;
              userReviewDateRead = action.payload[i].userReviews[0].dateRead;
              userReviewActive = action.payload[i].userReviews[0].active;
              userReviewCreatedAt = action.payload[i].userReviews[0].createdAt;
              userReviewUpdatedAt = action.payload[i].userReviews[0].updatedAt;
          };
  
          state.arrayChecklist.push({titleID: action.payload[i].titleID, titleName: action.payload[i].titleName, titleSort: action.payload[i].titleSort, titleURL: action.payload[i].titleURL, authorFirstName: action.payload[i].authorFirstName, authorLastName: action.payload[i].authorLastName, publicationDate: action.payload[i].publicationDate, imageName: action.payload[i].imageName, categoryID: action.payload[i].categoryID, shortDescription: action.payload[i].shortDescription, urlPKDweb: action.payload[i].urlPKDweb, active: action.payload[i].active, createdAt: action.payload[i].createdAt, updatedAt: action.payload[i].updatedAt, reviewID: userReviewID, userID: userReviewUserID, updatedBy: userReviewUpdatedBy, read: userReviewRead, dateRead: userReviewDateRead, userReviewActive: userReviewActive, userReviewCreatedAt: userReviewCreatedAt, userReviewUpdatedAt: userReviewUpdatedAt});
        };

        state.checklistLoaded = true;
        state.lastDatabaseRetrievalChecklist = new Date().toISOString();

      }
    },
    updateStateChecklist: {
      reducer(state, action) {
        // console.log(componentName, "updateStateChecklist action.payload", action.payload);

        const checklistItem = action.payload;
        // console.log(componentName, "updateStateChecklist checklistItem", checklistItem);
        // console.log(componentName, "updateStateChecklist checklistItem.titleID", checklistItem.titleID);
        // console.log(componentName, "updateStateChecklist checklistItem.checklistListIndex", checklistItem.checklistListIndex);

        if (typeof checklistItem === "object") {

          if (checklistItem.hasOwnProperty("reviewID")) {
            state.arrayChecklist[checklistItem.checklistListIndex].reviewID = checklistItem.reviewID;
          };
          if (checklistItem.hasOwnProperty("userID")) {
            state.arrayChecklist[checklistItem.checklistListIndex].userID = checklistItem.userID;
          };
          if (checklistItem.hasOwnProperty("updatedBy")) {
            state.arrayChecklist[checklistItem.checklistListIndex].updatedBy = checklistItem.updatedBy;
          };
          if (checklistItem.hasOwnProperty("read")) {
            state.arrayChecklist[checklistItem.checklistListIndex].read = checklistItem.read;
          };
          if (checklistItem.hasOwnProperty("dateRead")) {
            state.arrayChecklist[checklistItem.checklistListIndex].dateRead = checklistItem.dateRead;
          };
          if (checklistItem.hasOwnProperty("userReviewActive")) {
            state.arrayChecklist[checklistItem.checklistListIndex].userReviewActive = checklistItem.userReviewActive;
          };
          if (checklistItem.hasOwnProperty("userReviewCreatedAt")) {
            state.arrayChecklist[checklistItem.checklistListIndex].userReviewCreatedAt = checklistItem.userReviewCreatedAt;
          };
          if (checklistItem.hasOwnProperty("userReviewUpdatedAt")) {
            state.arrayChecklist[checklistItem.checklistListIndex].userReviewUpdatedAt = checklistItem.userReviewUpdatedAt;
          };

        };

      }
    },
    setChecklistDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setChecklistDataOffline action.payload", action.payload);

        state.checklistDataOffline = action.payload;

      }
    }
}
});

export const {loadUserData, setSessionToken, loadArrayChecklist, updateStateChecklist, setChecklistDataOffline} = userSlice.actions;

export default userSlice.reducer;