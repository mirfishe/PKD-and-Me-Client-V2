import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, displayValue, getDateTime, hasNonEmptyProperty } from "../utilities/SharedFunctions";

const componentName = "editionsSlice";

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
      // console.log(componentName, getDateTime(), "loadArrayEditions action.payload", action.payload);
      // console.log(componentName, getDateTime(), "loadArrayEditions action.payload.length", action.payload.length);

      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, getDateTime(), "loadArrayEditions action.payload[i]", action.payload[i]);
        state.arrayEditions.push(action.payload[i]);

      };

      state.editionsLoaded = true;
      state.lastDatabaseRetrievalEditions = getDateTime();

    },
    addStateEdition(state, action) {
      // console.log(componentName, getDateTime(), "addStateEdition action.payload", action.payload);
      // console.log(componentName, getDateTime(), "addStateEdition action.payload.length", action.payload.length);

      // * Could change this to accept an object and add that object to the store
      for (let i = 0; i < action.payload.length; i++) {

        // console.log(componentName, getDateTime(), "addStateEdition action.payload[i]", action.payload[i]);
        state.arrayEditions.push(action.payload[i]);

      };

    },
    updateStateEdition(state, action) {
      // console.log(componentName, getDateTime(), "updateStateEdition action.payload", action.payload);

      const editionItem = action.payload;
      let editionItemIndex;
      // console.log(componentName, getDateTime(), "updateStateEdition editionItem", editionItem);
      // console.log(componentName, getDateTime(), "updateStateEdition editionItem.editionID", editionItem.editionID);
      // console.log(componentName, getDateTime(), "updateStateEdition editionItem.editionItemIndex", editionItem.editionItemIndex);

      if (typeof editionItem === "object") {

        if (hasNonEmptyProperty(editionItem, "editionID")) {

          editionItemIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionItem.editionID);

          // console.log(componentName, getDateTime(), "updateStateUserReview editionItemIndex", editionItemIndex);

          // state.arrayEditions[editionItemIndex].editionID = editionItem.editionID;

        };

        if (hasNonEmptyProperty(editionItem, "titleID")) {

          state.arrayEditions[editionItemIndex].titleID = editionItem.titleID;

        };

        if (hasNonEmptyProperty(editionItem, "mediaID")) {

          state.arrayEditions[editionItemIndex].mediaID = editionItem.mediaID;

        };

        if (hasNonEmptyProperty(editionItem, "publicationDate")) {

          state.arrayEditions[editionItemIndex].publicationDate = editionItem.publicationDate;

        };

        if (hasNonEmptyProperty(editionItem, "editionPublicationDate")) {

          state.arrayEditions[editionItemIndex].editionPublicationDate = editionItem.editionPublicationDate;

        };

        if (hasNonEmptyProperty(editionItem, "imageName")) {

          state.arrayEditions[editionItemIndex].imageName = editionItem.imageName;

        };

        if (hasNonEmptyProperty(editionItem, "editionImageName")) {

          state.arrayEditions[editionItemIndex].editionImageName = editionItem.editionImageName;

        };

        if (hasNonEmptyProperty(editionItem, "ASIN")) {

          state.arrayEditions[editionItemIndex].ASIN = editionItem.ASIN;

        };

        if (hasNonEmptyProperty(editionItem, "textLinkShort")) {

          state.arrayEditions[editionItemIndex].textLinkShort = editionItem.textLinkShort;

        };

        if (hasNonEmptyProperty(editionItem, "textLinkFull")) {

          state.arrayEditions[editionItemIndex].textLinkFull = editionItem.textLinkFull;

        };

        if (hasNonEmptyProperty(editionItem, "imageLinkSmall")) {

          state.arrayEditions[editionItemIndex].imageLinkSmall = editionItem.imageLinkSmall;

        };

        if (hasNonEmptyProperty(editionItem, "imageLinkMedium")) {

          state.arrayEditions[editionItemIndex].imageLinkMedium = editionItem.imageLinkMedium;

        };

        if (hasNonEmptyProperty(editionItem, "imageLinkLarge")) {

          state.arrayEditions[editionItemIndex].imageLinkLarge = editionItem.imageLinkLarge;

        };

        if (hasNonEmptyProperty(editionItem, "textImageLink")) {

          state.arrayEditions[editionItemIndex].textImageLink = editionItem.textImageLink;

        };

        if (hasNonEmptyProperty(editionItem, "active")) {

          state.arrayEditions[editionItemIndex].active = editionItem.active;

        };

        if (hasNonEmptyProperty(editionItem, "editionActive")) {

          state.arrayEditions[editionItemIndex].editionActive = editionItem.editionActive;

        };

        if (hasNonEmptyProperty(editionItem, "updateDate")) {

          state.arrayEditions[editionItemIndex].updateDate = editionItem.updateDate;

        };

        if (hasNonEmptyProperty(editionItem, "editionUpdatedDate")) {

          state.arrayEditions[editionItemIndex].editionUpdatedDate = editionItem.editionUpdatedDate;

        };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (hasNonEmptyProperty(editionItem, "medium")) {

        // console.log(componentName, getDateTime(), "updateStateEdition editionItem.medium", editionItem.medium);

        // if (hasNonEmptyProperty(editionItem.medium, "mediaID")) {

        //   state.arrayEditions[editionItemIndex].medium.mediaID = editionItem.medium.mediaID;

        // };

        if (hasNonEmptyProperty(editionItem, "media")) {

          state.arrayEditions[editionItemIndex].media = editionItem.media;

        };

        if (hasNonEmptyProperty(editionItem, "electronic")) {

          state.arrayEditions[editionItemIndex].electronic = editionItem.electronic;

        };

        if (hasNonEmptyProperty(editionItem, "sortID")) {

          state.arrayEditions[editionItemIndex].sortID = editionItem.sortID;

        };

        if (hasNonEmptyProperty(editionItem, "mediaSortID")) {

          state.arrayEditions[editionItemIndex].mediaSortID = editionItem.mediaSortID;

        };

        // if (hasNonEmptyProperty(editionItem, "active")) {

        //   state.arrayEditions[editionItemIndex].active = editionItem.active;

        // };

        if (hasNonEmptyProperty(editionItem, "mediaActive")) {

          state.arrayEditions[editionItemIndex].mediaActive = editionItem.mediaActive;

        };

        if (hasNonEmptyProperty(editionItem, "mediaCreateDate")) {

          state.arrayEditions[editionItemIndex].mediaCreateDate = editionItem.mediaCreateDate;

        };

        if (hasNonEmptyProperty(editionItem, "mediaUpdatedDate")) {

          state.arrayEditions[editionItemIndex].mediaUpdatedDate = editionItem.mediaUpdatedDate;

        };

        // };

        // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
        // if (hasNonEmptyProperty(editionItem, "title")) {

        //   if (hasNonEmptyProperty(editionItem.title, "titleID")) {

        //     state.arrayEditions[editionItemIndex].title.titleID = editionItem.title.titleID;

        //   };

        if (hasNonEmptyProperty(editionItem, "titleName")) {

          state.arrayEditions[editionItemIndex].titleName = editionItem.titleName;

        };

        if (hasNonEmptyProperty(editionItem, "titleSort")) {

          state.arrayEditions[editionItemIndex].titleSort = editionItem.titleSort;

        };

        if (hasNonEmptyProperty(editionItem, "titleURL")) {

          state.arrayEditions[editionItemIndex].titleURL = editionItem.titleURL;

        };

        if (hasNonEmptyProperty(editionItem, "authorFirstName")) {

          state.arrayEditions[editionItemIndex].authorFirstName = editionItem.authorFirstName;

        };

        if (hasNonEmptyProperty(editionItem, "authorLastName")) {

          state.arrayEditions[editionItemIndex].authorLastName = editionItem.authorLastName;

        };

        if (hasNonEmptyProperty(editionItem, "submissionDate")) {

          state.arrayEditions[editionItemIndex].submissionDate = editionItem.submissionDate;

        };

        if (hasNonEmptyProperty(editionItem, "titlePublicationDate")) {

          state.arrayEditions[editionItemIndex].titlePublicationDate = editionItem.titlePublicationDate;

        };

        if (hasNonEmptyProperty(editionItem, "titleImageName")) {

          state.arrayEditions[editionItemIndex].titleImageName = editionItem.titleImageName;

        };

        if (hasNonEmptyProperty(editionItem, "categoryID")) {

          state.arrayEditions[editionItemIndex].categoryID = editionItem.categoryID;

        };

        if (hasNonEmptyProperty(editionItem, "shortDescription")) {

          state.arrayEditions[editionItemIndex].shortDescription = editionItem.shortDescription;

        };

        if (hasNonEmptyProperty(editionItem, "urlPKDWeb")) {

          state.arrayEditions[editionItemIndex].urlPKDWeb = editionItem.urlPKDWeb;

        };

        if (hasNonEmptyProperty(editionItem, "titleActive")) {

          state.arrayEditions[editionItemIndex].titleActive = editionItem.titleActive;

        };

        if (hasNonEmptyProperty(editionItem, "titleCreateDate")) {

          state.arrayEditions[editionItemIndex].titleCreateDate = editionItem.titleCreateDate;

        };

        if (hasNonEmptyProperty(editionItem, "titleUpdatedDate")) {

          state.arrayEditions[editionItemIndex].titleUpdatedDate = editionItem.titleUpdatedDate;

        };

        // };

      };

    },
    deleteStateEdition(state, action) {
      // console.log(componentName, getDateTime(), "deleteStateEdition action.payload", action.payload);

      // const editionItemIndex = action.payload;
      let editionListIndex;
      const editionID = action.payload;

      // ? This doesn't work because state.arrayEditions isn't stored as an array of objects?
      // ? Need to copy the array?
      // const existingEditionIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);
      // console.log(componentName, getDateTime(), "deleteStateEdition existingEditionIndex", existingEditionIndex);

      if (isEmpty(editionID) === false) {

        editionListIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);

        // console.log(componentName, getDateTime(), "deleteStateEdition editionListIndex", editionListIndex);

        state.arrayEditions.splice(editionListIndex, 1);

      };

    },
    setEditionsDataOffline(state, action) {
      // console.log(componentName, getDateTime(), "setEditionsDataOffline action.payload", action.payload);

      state.editionsDataOffline = action.payload;

    },
    setEditionSortBy(state, action) {
      // console.log(componentName, getDateTime(), "setEditionSortBy action.payload", action.payload);

      state.editionSortBy = action.payload;

    }
  }
});

export const { loadArrayEditions, addStateEdition, updateStateEdition, deleteStateEdition, setEditionsDataOffline, setEditionSortBy } = editionsSlice.actions;

export default editionsSlice.reducer;