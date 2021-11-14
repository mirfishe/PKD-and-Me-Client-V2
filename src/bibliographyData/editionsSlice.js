import { createSlice } from "@reduxjs/toolkit";
import { IsEmpty, DisplayValue, GetDateTime } from "../app/sharedFunctions";

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

        if (editionItem.hasOwnProperty("editionID")) {

          editionItemIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionItem.editionID);

          // console.log(componentName, GetDateTime(), "updateStateUserReview editionItemIndex", editionItemIndex);

          // state.arrayEditions[editionItemIndex].editionID = editionItem.editionID;
        };

        if (editionItem.hasOwnProperty("titleID")) {
          state.arrayEditions[editionItemIndex].titleID = editionItem.titleID;
        };

        if (editionItem.hasOwnProperty("mediaID")) {
          state.arrayEditions[editionItemIndex].mediaID = editionItem.mediaID;
        };

        if (editionItem.hasOwnProperty("publicationDate")) {
          state.arrayEditions[editionItemIndex].publicationDate = editionItem.publicationDate;
        };

        if (editionItem.hasOwnProperty("editionPublicationDate")) {
          state.arrayEditions[editionItemIndex].editionPublicationDate = editionItem.editionPublicationDate;
        };

        if (editionItem.hasOwnProperty("imageName")) {
          state.arrayEditions[editionItemIndex].imageName = editionItem.imageName;
        };

        if (editionItem.hasOwnProperty("editionImageName")) {
          state.arrayEditions[editionItemIndex].editionImageName = editionItem.editionImageName;
        };

        if (editionItem.hasOwnProperty("ASIN")) {
          state.arrayEditions[editionItemIndex].ASIN = editionItem.ASIN;
        };

        if (editionItem.hasOwnProperty("textLinkShort")) {
          state.arrayEditions[editionItemIndex].textLinkShort = editionItem.textLinkShort;
        };

        if (editionItem.hasOwnProperty("textLinkFull")) {
          state.arrayEditions[editionItemIndex].textLinkFull = editionItem.textLinkFull;
        };

        if (editionItem.hasOwnProperty("imageLinkSmall")) {
          state.arrayEditions[editionItemIndex].imageLinkSmall = editionItem.imageLinkSmall;
        };

        if (editionItem.hasOwnProperty("imageLinkMedium")) {
          state.arrayEditions[editionItemIndex].imageLinkMedium = editionItem.imageLinkMedium;
        };

        if (editionItem.hasOwnProperty("imageLinkLarge")) {
          state.arrayEditions[editionItemIndex].imageLinkLarge = editionItem.imageLinkLarge;
        };

        if (editionItem.hasOwnProperty("textImageLink")) {
          state.arrayEditions[editionItemIndex].textImageLink = editionItem.textImageLink;
        };

        if (editionItem.hasOwnProperty("active")) {
          state.arrayEditions[editionItemIndex].active = editionItem.active;
        };

        if (editionItem.hasOwnProperty("editionActive")) {
          state.arrayEditions[editionItemIndex].editionActive = editionItem.editionActive;
        };

        if (editionItem.hasOwnProperty("updateDate")) {
          state.arrayEditions[editionItemIndex].updateDate = editionItem.updateDate;
        };

        if (editionItem.hasOwnProperty("editionUpdatedDate")) {
          state.arrayEditions[editionItemIndex].editionUpdatedDate = editionItem.editionUpdatedDate;
        };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (editionItem.hasOwnProperty("medium")) {
        // console.log(componentName, GetDateTime(), "updateStateEdition editionItem.medium", editionItem.medium);

        // if (editionItem.medium.hasOwnProperty("mediaID")) {
        //   state.arrayEditions[editionItemIndex].medium.mediaID = editionItem.medium.mediaID;
        // };

        if (editionItem.hasOwnProperty("media")) {
          state.arrayEditions[editionItemIndex].media = editionItem.media;
        };

        if (editionItem.hasOwnProperty("electronic")) {
          state.arrayEditions[editionItemIndex].electronic = editionItem.electronic;
        };

        if (editionItem.hasOwnProperty("sortID")) {
          state.arrayEditions[editionItemIndex].sortID = editionItem.sortID;
        };

        if (editionItem.hasOwnProperty("mediaSortID")) {
          state.arrayEditions[editionItemIndex].mediaSortID = editionItem.mediaSortID;
        };

        // if (editionItem.hasOwnProperty("active")) {
        //   state.arrayEditions[editionItemIndex].active = editionItem.active;
        // };

        if (editionItem.hasOwnProperty("mediaActive")) {
          state.arrayEditions[editionItemIndex].mediaActive = editionItem.mediaActive;
        };

        if (editionItem.hasOwnProperty("mediaCreateDate")) {
          state.arrayEditions[editionItemIndex].mediaCreateDate = editionItem.mediaCreateDate;
        };

        if (editionItem.hasOwnProperty("mediaUpdatedDate")) {
          state.arrayEditions[editionItemIndex].mediaUpdatedDate = editionItem.mediaUpdatedDate;
        };

        // };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (editionItem.hasOwnProperty("title")) {

        //   if (editionItem.title.hasOwnProperty("titleID")) {
        //     state.arrayEditions[editionItemIndex].title.titleID = editionItem.title.titleID;
        //   };

        if (editionItem.hasOwnProperty("titleName")) {
          state.arrayEditions[editionItemIndex].titleName = editionItem.titleName;
        };

        if (editionItem.hasOwnProperty("titleSort")) {
          state.arrayEditions[editionItemIndex].titleSort = editionItem.titleSort;
        };

        if (editionItem.hasOwnProperty("titleURL")) {
          state.arrayEditions[editionItemIndex].titleURL = editionItem.titleURL;
        };

        if (editionItem.hasOwnProperty("authorFirstName")) {
          state.arrayEditions[editionItemIndex].authorFirstName = editionItem.authorFirstName;
        };

        if (editionItem.hasOwnProperty("authorLastName")) {
          state.arrayEditions[editionItemIndex].authorLastName = editionItem.authorLastName;
        };

        if (editionItem.hasOwnProperty("submissionDate")) {
          state.arrayEditions[editionItemIndex].submissionDate = editionItem.submissionDate;
        };

        if (editionItem.hasOwnProperty("titlePublicationDate")) {
          state.arrayEditions[editionItemIndex].titlePublicationDate = editionItem.titlePublicationDate;
        };

        if (editionItem.hasOwnProperty("titleImageName")) {
          state.arrayEditions[editionItemIndex].titleImageName = editionItem.titleImageName;
        };

        if (editionItem.hasOwnProperty("categoryID")) {
          state.arrayEditions[editionItemIndex].categoryID = editionItem.categoryID;
        };

        if (editionItem.hasOwnProperty("shortDescription")) {
          state.arrayEditions[editionItemIndex].shortDescription = editionItem.shortDescription;
        };

        if (editionItem.hasOwnProperty("urlPKDweb")) {
          state.arrayEditions[editionItemIndex].urlPKDweb = editionItem.urlPKDweb;
        };

        if (editionItem.hasOwnProperty("titleActive")) {
          state.arrayEditions[editionItemIndex].titleActive = editionItem.titleActive;
        };

        if (editionItem.hasOwnProperty("titleCreateDate")) {
          state.arrayEditions[editionItemIndex].titleCreateDate = editionItem.titleCreateDate;
        };

        if (editionItem.hasOwnProperty("titleUpdatedDate")) {
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