import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime, HasNonEmptyProperty } from "../app/sharedFunctions";

const componentName = "editionsSlice.js";

const initialState = {
  arrayEditions: [],
  editionsLoaded: false,
  lastDatabaseRetrievalEditions: null,
  editionsDataOffline: false,
  editionSortBy: "titleName"
};

const editionsSlice = createSlice({
  name: "editions",
  initialState,
  reducers: {
    loadArrayEditions(state, action) {
      // console.log(componentName, GetDateTime(), "loadArrayEditions action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "loadArrayEditions action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {
        // console.log(componentName, GetDateTime(), "loadArrayEditions action.payload[i]", action.payload[i]);
        state.arrayEditions.push(action.payload[i]);
      };

      state.editionsLoaded = true;
      state.lastDatabaseRetrievalEditions = GetDateTime();

    },
    addStateEdition(state, action) {
      // console.log(componentName, GetDateTime(), "addStateEdition action.payload", action.payload);
      // console.log(componentName, GetDateTime(), "addStateEdition action.payload.length", action.payload.length);

      // * Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {
        // console.log(componentName, GetDateTime(), "addStateEdition action.payload[i]", action.payload[i]);
        state.arrayEditions.push(action.payload[i]);
      };

    },
    updateStateEdition(state, action) {
      // console.log(componentName, GetDateTime(), "updateStateEdition action.payload", action.payload);

      const editionItem = action.payload;
      let editionItemIndex;
      // console.log(componentName, GetDateTime(), "updateStateEdition editionItem", editionItem);
      // console.log(componentName, GetDateTime(), "updateStateEdition editionItem.editionID", editionItem.editionID);
      // console.log(componentName, GetDateTime(), "updateStateEdition editionItem.editionItemIndex", editionItem.editionItemIndex);

      if (typeof editionItem === "object") {

        if (HasNonEmptyProperty(editionItem, "editionID")) {

          editionItemIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionItem.editionID);

          // console.log(componentName, GetDateTime(), "updateStateUserReview editionItemIndex", editionItemIndex);

          // state.arrayEditions[editionItemIndex].editionID = editionItem.editionID;
        };

        if (HasNonEmptyProperty(editionItem, "titleID")) {
          state.arrayEditions[editionItemIndex].titleID = editionItem.titleID;
        };

        if (HasNonEmptyProperty(editionItem, "mediaID")) {
          state.arrayEditions[editionItemIndex].mediaID = editionItem.mediaID;
        };

        if (HasNonEmptyProperty(editionItem, "publicationDate")) {
          state.arrayEditions[editionItemIndex].publicationDate = editionItem.publicationDate;
        };

        if (HasNonEmptyProperty(editionItem, "editionPublicationDate")) {
          state.arrayEditions[editionItemIndex].editionPublicationDate = editionItem.editionPublicationDate;
        };

        if (HasNonEmptyProperty(editionItem, "imageName")) {
          state.arrayEditions[editionItemIndex].imageName = editionItem.imageName;
        };

        if (HasNonEmptyProperty(editionItem, "editionImageName")) {
          state.arrayEditions[editionItemIndex].editionImageName = editionItem.editionImageName;
        };

        if (HasNonEmptyProperty(editionItem, "ASIN")) {
          state.arrayEditions[editionItemIndex].ASIN = editionItem.ASIN;
        };

        if (HasNonEmptyProperty(editionItem, "textLinkShort")) {
          state.arrayEditions[editionItemIndex].textLinkShort = editionItem.textLinkShort;
        };

        if (HasNonEmptyProperty(editionItem, "textLinkFull")) {
          state.arrayEditions[editionItemIndex].textLinkFull = editionItem.textLinkFull;
        };

        if (HasNonEmptyProperty(editionItem, "imageLinkSmall")) {
          state.arrayEditions[editionItemIndex].imageLinkSmall = editionItem.imageLinkSmall;
        };

        if (HasNonEmptyProperty(editionItem, "imageLinkMedium")) {
          state.arrayEditions[editionItemIndex].imageLinkMedium = editionItem.imageLinkMedium;
        };

        if (HasNonEmptyProperty(editionItem, "imageLinkLarge")) {
          state.arrayEditions[editionItemIndex].imageLinkLarge = editionItem.imageLinkLarge;
        };

        if (HasNonEmptyProperty(editionItem, "textImageLink")) {
          state.arrayEditions[editionItemIndex].textImageLink = editionItem.textImageLink;
        };

        if (HasNonEmptyProperty(editionItem, "active")) {
          state.arrayEditions[editionItemIndex].active = editionItem.active;
        };

        if (HasNonEmptyProperty(editionItem, "editionActive")) {
          state.arrayEditions[editionItemIndex].editionActive = editionItem.editionActive;
        };

        if (HasNonEmptyProperty(editionItem, "updateDate")) {
          state.arrayEditions[editionItemIndex].updateDate = editionItem.updateDate;
        };

        if (HasNonEmptyProperty(editionItem, "editionUpdatedDate")) {
          state.arrayEditions[editionItemIndex].editionUpdatedDate = editionItem.editionUpdatedDate;
        };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (HasNonEmptyProperty(editionItem, "medium")) {
        // console.log(componentName, GetDateTime(), "updateStateEdition editionItem.medium", editionItem.medium);

        // if (HasNonEmptyProperty(editionItem.medium, "mediaID")) {
        //   state.arrayEditions[editionItemIndex].medium.mediaID = editionItem.medium.mediaID;
        // };

        if (HasNonEmptyProperty(editionItem, "media")) {
          state.arrayEditions[editionItemIndex].media = editionItem.media;
        };

        if (HasNonEmptyProperty(editionItem, "electronic")) {
          state.arrayEditions[editionItemIndex].electronic = editionItem.electronic;
        };

        if (HasNonEmptyProperty(editionItem, "sortID")) {
          state.arrayEditions[editionItemIndex].sortID = editionItem.sortID;
        };

        if (HasNonEmptyProperty(editionItem, "mediaSortID")) {
          state.arrayEditions[editionItemIndex].mediaSortID = editionItem.mediaSortID;
        };

        // if (HasNonEmptyProperty(editionItem, "active")) {
        //   state.arrayEditions[editionItemIndex].active = editionItem.active;
        // };

        if (HasNonEmptyProperty(editionItem, "mediaActive")) {
          state.arrayEditions[editionItemIndex].mediaActive = editionItem.mediaActive;
        };

        if (HasNonEmptyProperty(editionItem, "mediaCreateDate")) {
          state.arrayEditions[editionItemIndex].mediaCreateDate = editionItem.mediaCreateDate;
        };

        if (HasNonEmptyProperty(editionItem, "mediaUpdatedDate")) {
          state.arrayEditions[editionItemIndex].mediaUpdatedDate = editionItem.mediaUpdatedDate;
        };

        // };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (HasNonEmptyProperty(editionItem, "title")) {

        //   if (HasNonEmptyProperty(editionItem.title, "titleID")) {
        //     state.arrayEditions[editionItemIndex].title.titleID = editionItem.title.titleID;
        //   };

        if (HasNonEmptyProperty(editionItem, "titleName")) {
          state.arrayEditions[editionItemIndex].titleName = editionItem.titleName;
        };

        if (HasNonEmptyProperty(editionItem, "titleSort")) {
          state.arrayEditions[editionItemIndex].titleSort = editionItem.titleSort;
        };

        if (HasNonEmptyProperty(editionItem, "titleURL")) {
          state.arrayEditions[editionItemIndex].titleURL = editionItem.titleURL;
        };

        if (HasNonEmptyProperty(editionItem, "authorFirstName")) {
          state.arrayEditions[editionItemIndex].authorFirstName = editionItem.authorFirstName;
        };

        if (HasNonEmptyProperty(editionItem, "authorLastName")) {
          state.arrayEditions[editionItemIndex].authorLastName = editionItem.authorLastName;
        };

        if (HasNonEmptyProperty(editionItem, "submissionDate")) {
          state.arrayEditions[editionItemIndex].submissionDate = editionItem.submissionDate;
        };

        if (HasNonEmptyProperty(editionItem, "titlePublicationDate")) {
          state.arrayEditions[editionItemIndex].titlePublicationDate = editionItem.titlePublicationDate;
        };

        if (HasNonEmptyProperty(editionItem, "titleImageName")) {
          state.arrayEditions[editionItemIndex].titleImageName = editionItem.titleImageName;
        };

        if (HasNonEmptyProperty(editionItem, "categoryID")) {
          state.arrayEditions[editionItemIndex].categoryID = editionItem.categoryID;
        };

        if (HasNonEmptyProperty(editionItem, "shortDescription")) {
          state.arrayEditions[editionItemIndex].shortDescription = editionItem.shortDescription;
        };

        if (HasNonEmptyProperty(editionItem, "urlPKDweb")) {
          state.arrayEditions[editionItemIndex].urlPKDweb = editionItem.urlPKDweb;
        };

        if (HasNonEmptyProperty(editionItem, "titleActive")) {
          state.arrayEditions[editionItemIndex].titleActive = editionItem.titleActive;
        };

        if (HasNonEmptyProperty(editionItem, "titleCreateDate")) {
          state.arrayEditions[editionItemIndex].titleCreateDate = editionItem.titleCreateDate;
        };

        if (HasNonEmptyProperty(editionItem, "titleUpdatedDate")) {
          state.arrayEditions[editionItemIndex].titleUpdatedDate = editionItem.titleUpdatedDate;
        };

        // };

      };

    },
    deleteStateEdition(state, action) {
      // console.log(componentName, GetDateTime(), "deleteStateEdition action.payload", action.payload);

      // const editionItemIndex = action.payload;
      let editionListIndex;
      const editionID = action.payload;

      // ? This doesn't work because state.arrayEditions isn't stored as an array of objects?
      // ? Need to copy the array?
      // const existingEditionIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);
      // console.log(componentName, GetDateTime(), "deleteStateEdition existingEditionIndex", existingEditionIndex);

      if (IsEmpty(editionID) === false) {

        editionListIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);

        // console.log(componentName, GetDateTime(), "deleteStateEdition editionListIndex", editionListIndex);

        state.arrayEditions.splice(editionListIndex, 1);

      };

    },
    setEditionsDataOffline(state, action) {
      // console.log(componentName, GetDateTime(), "setEditionsDataOffline action.payload", action.payload);

      state.editionsDataOffline = action.payload;

    },
    setEditionSortBy(state, action) {
      // console.log(componentName, GetDateTime(), "setEditionSortBy action.payload", action.payload);

      state.editionSortBy = action.payload;

    }
  }
});

export const { loadArrayEditions, addStateEdition, updateStateEdition, deleteStateEdition, setEditionsDataOffline, setEditionSortBy } = editionsSlice.actions;

export default editionsSlice.reducer;