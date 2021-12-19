import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "../utilities/SharedFunctions";

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
    loadUserData(state, action) {
      // console.log(componentName, GetDateTime(), "loadUserData action.payload", action.payload);

      if (typeof action.payload === "object") {

        if (HasNonEmptyProperty(action.payload, "userID")) {

          state.userID = action.payload.userID;

        };

        if (HasNonEmptyProperty(action.payload, "firstName")) {

          state.firstName = action.payload.firstName;

        };

        if (HasNonEmptyProperty(action.payload, "lastName")) {

          state.lastName = action.payload.lastName;

        };

        if (HasNonEmptyProperty(action.payload, "email")) {

          state.email = action.payload.email;

        };

        if (HasNonEmptyProperty(action.payload, "updatedBy")) {

          state.updatedBy = action.payload.updatedBy;

        };

        if (HasNonEmptyProperty(action.payload, "admin")) {

          state.admin = action.payload.admin;

        };

        if (HasNonEmptyProperty(action.payload, "active")) {

          state.active = action.payload.active;

        };

        if (HasNonEmptyProperty(action.payload, "arrayChecklist")) {

          state.arrayChecklist = action.payload.arrayChecklist;

        };

        if (HasNonEmptyProperty(action.payload, "checklistLoaded")) {

          state.checklistLoaded = action.payload.checklistLoaded;

        };

        if (HasNonEmptyProperty(action.payload, "lastDatabaseRetrievalChecklist")) {

          state.lastDatabaseRetrievalChecklist = action.payload.lastDatabaseRetrievalChecklist;

        };

        if (HasNonEmptyProperty(action.payload, "userLoaded")) {

          state.userLoaded = action.payload.userLoaded;

        } else {

          state.userLoaded = true;

        };

      };

    },
    setSessionToken(state, action) {
      // console.log(componentName, GetDateTime(), "setLinkItem action.payload", action.payload);

      state.sessionToken = action.payload;

    },
    loadArrayChecklist(state, action) {
      // console.log(componentName, GetDateTime(), "loadArrayChecklist action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "loadArrayChecklist action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {
        // console.log(componentName, GetDateTime(), "loadArrayChecklist action.payload[i]", action.payload[i]);

        state.arrayChecklist.push(action.payload[i]);

        // let userReviewID = null;
        // let userReviewUserID = null;
        // let userReviewUpdatedBy = null;
        // let userReviewRead = null;
        // let userReviewDateRead = null;
        // let userReviewActive = null;
        // let userReviewCreatedDate = null;
        // let userReviewUpdateDate = null;

        // if (IsEmpty(action.payload[i]) === false) {

        //   userReviewID = action.payload[i].reviewID;
        //   userReviewUserID = action.payload[i].userID;
        //   userReviewUpdatedBy = action.payload[i].userReviewUpdatedBy;
        //   userReviewRead = action.payload[i].read;
        //   userReviewDateRead = action.payload[i].dateRead;
        //   userReviewActive = action.payload[i].userReviewActive;
        //   userReviewCreatedDate = action.payload[i].userReviewCreatedDate;
        //   userReviewUpdateDate = action.payload[i].userReviewUpdateDate;

        // };

        // state.arrayChecklist.push({ titleID: action.payload[i].titleID, titleName: action.payload[i].titleName, titleSort: action.payload[i].titleSort, titleURL: action.payload[i].titleURL, authorFirstName: action.payload[i].authorFirstName, authorLastName: action.payload[i].authorLastName, publicationDate: action.payload[i].publicationDate, titlePublicationDate: action.payload[i].titlePublicationDate, imageName: action.payload[i].imageName, titleImageName: action.payload[i].titleImageName, categoryID: action.payload[i].categoryID, shortDescription: action.payload[i].shortDescription, urlPKDWeb: action.payload[i].urlPKDWeb, active: action.payload[i].active, titleActive: action.payload[i].titleActive, createDate: action.payload[i].createdDate, titleCreatedDate: action.payload[i].titleCreatedDate, updateDate: action.payload[i].updateDate, titleUpdateDate: action.payload[i].titleUpdateDate, reviewID: userReviewID, userID: userReviewUserID, updatedBy: userReviewUpdatedBy, read: userReviewRead, dateRead: userReviewDateRead, userReviewActive: userReviewActive, userReviewCreatedDate: userReviewCreatedDate, userReviewUpdateDate: userReviewUpdateDate });

      };

      state.checklistLoaded = true;
      state.lastDatabaseRetrievalChecklist = GetDateTime();

    },
    // addStateChecklist(state, action) {
    //     // console.log(componentName, GetDateTime(), "addStateChecklist action.payload", action.payload);
    //     // console.log(componentName, GetDateTime(), "addStateChecklist action.payload.length", action.payload.length);

    //     // * Could change this to accept an object and add that object to the store
    //     for (let i = 0; i < action.payload.length; i++) {

    //       // console.log(componentName, GetDateTime(), "addStateChecklist action.payload[i]", action.payload[i]);
    //       state.arrayChecklist.push(action.payload[i]);

    //     };

    // },
    updateStateChecklist(state, action) {
      // console.log(componentName, GetDateTime(), "updateStateChecklist action.payload", action.payload);

      const checklistItem = action.payload;
      let checklistListIndex;
      // console.log(componentName, GetDateTime(), "updateStateChecklist checklistItem", checklistItem);
      // console.log(componentName, GetDateTime(), "updateStateChecklist checklistItem.titleID", checklistItem.titleID);

      if (typeof checklistItem === "object") {

        if (HasNonEmptyProperty(checklistItem, "titleID")) {

          checklistListIndex = state.arrayChecklist.findIndex(title => title.titleID === checklistItem.titleID);

          // console.log(componentName, GetDateTime(), "updateStateChecklist checklistListIndex", checklistListIndex);

          // state.arrayChecklist[checklistListIndex].titleID = checklistItem.titleID;
        };

        if (HasNonEmptyProperty(checklistItem, "reviewID")) {

          state.arrayChecklist[checklistListIndex].reviewID = checklistItem.reviewID;

        };

        if (HasNonEmptyProperty(checklistItem, "userID")) {

          state.arrayChecklist[checklistListIndex].userID = checklistItem.userID;

        };

        if (HasNonEmptyProperty(checklistItem, "updatedBy")) {

          state.arrayChecklist[checklistListIndex].updatedBy = checklistItem.updatedBy;

        };

        if (HasNonEmptyProperty(checklistItem, "read")) {

          state.arrayChecklist[checklistListIndex].read = checklistItem.read;

        };

        if (HasNonEmptyProperty(checklistItem, "dateRead")) {

          state.arrayChecklist[checklistListIndex].dateRead = checklistItem.dateRead;

        };

        if (HasNonEmptyProperty(checklistItem, "userReviewActive")) {

          state.arrayChecklist[checklistListIndex].userReviewActive = checklistItem.userReviewActive;

        };

        if (HasNonEmptyProperty(checklistItem, "userReviewCreatedDate")) {

          state.arrayChecklist[checklistListIndex].userReviewCreatedDate = checklistItem.userReviewCreatedDate;

        };

        if (HasNonEmptyProperty(checklistItem, "userReviewUpdateDate")) {

          state.arrayChecklist[checklistListIndex].userReviewUpdateDate = checklistItem.userReviewUpdateDate;

        };

      };

    },
    setChecklistDataOffline(state, action) {
      // console.log(componentName, GetDateTime(), "setChecklistDataOffline action.payload", action.payload);

      state.checklistDataOffline = action.payload;

    }
  }
});

export const { loadUserData, setSessionToken, loadArrayChecklist, /*addStateChecklist,*/ updateStateChecklist, setChecklistDataOffline } = userSlice.actions;

export default userSlice.reducer;