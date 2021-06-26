import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime } from "./sharedFunctions";

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
        // console.log(componentName, GetDateTime(), "loadUserData action.payload", action.payload);

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
        // console.log(componentName, GetDateTime(), "setLinkItem action.payload", action.payload);

        state.sessionToken = action.payload;

      }
    },
    loadArrayChecklist: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "loadArrayChecklist action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "loadArrayChecklist action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "loadArrayChecklist action.payload[i]", action.payload[i]);
          // state.arrayChecklist.push(action.payload[i]);

          let userReviewID = null;
          let userReviewUserID = null;
          let userReviewUpdatedBy = null;
          let userReviewRead = null;
          let userReviewDateRead = null;
          let userReviewActive = null;
          let userReviewCreatedDate = null;
          let userReviewUpdateDate = null;

          if (IsEmpty(action.payload[i]) === false) {
            userReviewID = action.payload[i].reviewID;
            userReviewUserID = action.payload[i].userID;
            userReviewUpdatedBy = action.payload[i].userReviewUpdatedBy;
            userReviewRead = action.payload[i].read;
            userReviewDateRead = action.payload[i].dateRead;
            userReviewActive = action.payload[i].userReviewActive;
            userReviewCreatedDate = action.payload[i].userReviewCreatedDate;
            userReviewUpdateDate = action.payload[i].userReviewUpdateDate;
          };

          state.arrayChecklist.push({ titleID: action.payload[i].titleID, titleName: action.payload[i].titleName, titleSort: action.payload[i].titleSort, titleURL: action.payload[i].titleURL, authorFirstName: action.payload[i].authorFirstName, authorLastName: action.payload[i].authorLastName, publicationDate: action.payload[i].publicationDate, titlePublicationDate: action.payload[i].titlePublicationDate, imageName: action.payload[i].imageName, titleImageName: action.payload[i].titleImageName, categoryID: action.payload[i].categoryID, shortDescription: action.payload[i].shortDescription, urlPKDweb: action.payload[i].urlPKDweb, active: action.payload[i].active, titleActive: action.payload[i].titleActive, createDate: action.payload[i].createdDate, titleCreatedDate: action.payload[i].titleCreatedDate, updateDate: action.payload[i].updateDate, titleUpdateDate: action.payload[i].titleUpdateDate, reviewID: userReviewID, userID: userReviewUserID, updatedBy: userReviewUpdatedBy, read: userReviewRead, dateRead: userReviewDateRead, userReviewActive: userReviewActive, userReviewCreatedDate: userReviewCreatedDate, userReviewUpdateDate: userReviewUpdateDate });
        };

        state.checklistLoaded = true;
        state.lastDatabaseRetrievalChecklist = GetDateTime();

      }
    },
    // addStateChecklist: {
    //   reducer(state, action) {
    //     // console.log(componentName, GetDateTime(), "addStateChecklist action.payload", action.payload);
    //     // console.log(componentName, GetDateTime(), "addStateChecklist action.payload.length", action.payload.length);

    //     // * Could change this to accept an object and add that object to the store
    //     for (let i = 0; i < action.payload.length; i++) {
    //       // console.log(componentName, GetDateTime(), "addStateChecklist action.payload[i]", action.payload[i]);
    //       state.arrayChecklist.push(action.payload[i]);
    //     };

    //   }
    // },
    updateStateChecklist: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "updateStateChecklist action.payload", action.payload);

        const checklistItem = action.payload;
        let checklistListIndex;
        // console.log(componentName, GetDateTime(), "updateStateChecklist checklistItem", checklistItem);
        // console.log(componentName, GetDateTime(), "updateStateChecklist checklistItem.titleID", checklistItem.titleID);
        // console.log(componentName, GetDateTime(), "updateStateChecklist checklistItem.checklistListIndex", checklistItem.checklistListIndex);

        if (typeof checklistItem === "object") {

          if (checklistItem.hasOwnProperty("titleID")) {

            checklistListIndex = state.arrayChecklist.findIndex(title => title.titleID === checklistItem.titleID);

            state.arrayChecklist[checklistListIndex].titleID = checklistItem.titleID;
          };

          if (checklistItem.hasOwnProperty("reviewID")) {
            state.arrayChecklist[checklistListIndex].reviewID = checklistItem.reviewID;
          };

          if (checklistItem.hasOwnProperty("userID")) {
            state.arrayChecklist[checklistListIndex].userID = checklistItem.userID;
          };

          if (checklistItem.hasOwnProperty("updatedBy")) {
            state.arrayChecklist[checklistListIndex].updatedBy = checklistItem.updatedBy;
          };

          if (checklistItem.hasOwnProperty("read")) {
            state.arrayChecklist[checklistListIndex].read = checklistItem.read;
          };

          if (checklistItem.hasOwnProperty("dateRead")) {
            state.arrayChecklist[checklistListIndex].dateRead = checklistItem.dateRead;
          };

          if (checklistItem.hasOwnProperty("userReviewActive")) {
            state.arrayChecklist[checklistListIndex].userReviewActive = checklistItem.userReviewActive;
          };

          if (checklistItem.hasOwnProperty("userReviewCreatedDate")) {
            state.arrayChecklist[checklistListIndex].userReviewCreatedDate = checklistItem.userReviewCreatedDate;
          };

          if (checklistItem.hasOwnProperty("userReviewUpdateDate")) {
            state.arrayChecklist[checklistListIndex].userReviewUpdateDate = checklistItem.userReviewUpdateDate;
          };

        };

      }
    },
    setChecklistDataOffline: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setChecklistDataOffline action.payload", action.payload);

        state.checklistDataOffline = action.payload;

      }
    }
  }
});

export const { loadUserData, setSessionToken, loadArrayChecklist, /*addStateChecklist,*/ updateStateChecklist, setChecklistDataOffline } = userSlice.actions;

export default userSlice.reducer;