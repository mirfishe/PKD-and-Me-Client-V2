import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";

const componentName = "editionsSlice";

const initialState = {
  arrayEditions: [],
  editionsLoaded: false,
  lastDatabaseRetrievalEditions: null,
  // editionsDataOffline: false,
  editionSortBy: "titleName"
};

const editionsSlice = createSlice({
  name: "editions",
  initialState,
  reducers: {
    loadArrayEditions(state, action) {

      if (isNonEmptyArray(action.payload) === true) {

        state.arrayEditions = [];

        for (let i = 0; i < action.payload.length; i++) {

          state.arrayEditions.push(action.payload[i]);

        };

      };

      state.editionsLoaded = true;
      state.lastDatabaseRetrievalEditions = getDateTime();

    },
    // addStateEdition(state, action) {

    //   // * Could change this to accept an object and add that object to the store
    //   if (isNonEmptyArray(action.payload) === true) {

    //     for (let i = 0; i < action.payload.length; i++) {

    //       state.arrayEditions.push(action.payload[i]);

    //     };

    //   };

    // },
    // updateStateEdition(state, action) {

    //   let editionItem = action.payload;
    //   let editionItemIndex;

    //   if (typeof editionItem === "object") {

    //     if (hasNonEmptyProperty(editionItem, "editionID") === true) {

    //       editionItemIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionItem.editionID);

    //       // state.arrayEditions[editionItemIndex].editionID = editionItem.editionID;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "titleID") === true) {

    //       state.arrayEditions[editionItemIndex].titleID = editionItem.titleID;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "mediaID") === true) {

    //       state.arrayEditions[editionItemIndex].mediaID = editionItem.mediaID;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "publicationDate") === true) {

    //       state.arrayEditions[editionItemIndex].publicationDate = editionItem.publicationDate;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "editionPublicationDate") === true) {

    //       state.arrayEditions[editionItemIndex].editionPublicationDate = editionItem.editionPublicationDate;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "imageName") === true) {

    //       state.arrayEditions[editionItemIndex].imageName = editionItem.imageName;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "editionImageName") === true) {

    //       state.arrayEditions[editionItemIndex].editionImageName = editionItem.editionImageName;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "ASIN") === true) {

    //       state.arrayEditions[editionItemIndex].ASIN = editionItem.ASIN;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "textLinkShort") === true) {

    //       state.arrayEditions[editionItemIndex].textLinkShort = editionItem.textLinkShort;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "textLinkFull") === true) {

    //       state.arrayEditions[editionItemIndex].textLinkFull = editionItem.textLinkFull;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "imageLinkSmall") === true) {

    //       state.arrayEditions[editionItemIndex].imageLinkSmall = editionItem.imageLinkSmall;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "imageLinkMedium") === true) {

    //       state.arrayEditions[editionItemIndex].imageLinkMedium = editionItem.imageLinkMedium;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "imageLinkLarge") === true) {

    //       state.arrayEditions[editionItemIndex].imageLinkLarge = editionItem.imageLinkLarge;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "textImageLink") === true) {

    //       state.arrayEditions[editionItemIndex].textImageLink = editionItem.textImageLink;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "active") === true) {

    //       state.arrayEditions[editionItemIndex].active = editionItem.active;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "editionActive") === true) {

    //       state.arrayEditions[editionItemIndex].editionActive = editionItem.editionActive;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "updateDate") === true) {

    //       state.arrayEditions[editionItemIndex].updateDate = editionItem.updateDate;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "editionUpdatedDate") === true) {

    //       state.arrayEditions[editionItemIndex].editionUpdatedDate = editionItem.editionUpdatedDate;

    //     };

    //     // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
    //     // if (hasNonEmptyProperty(editionItem, "medium") === true) {

    //     // if (hasNonEmptyProperty(editionItem.medium, "mediaID") === true) {

    //     //   state.arrayEditions[editionItemIndex].medium.mediaID = editionItem.medium.mediaID;

    //     // };

    //     if (hasNonEmptyProperty(editionItem, "media") === true) {

    //       state.arrayEditions[editionItemIndex].media = editionItem.media;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "electronic") === true) {

    //       state.arrayEditions[editionItemIndex].electronic = editionItem.electronic;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "sortID") === true) {

    //       state.arrayEditions[editionItemIndex].sortID = editionItem.sortID;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "mediaSortID") === true) {

    //       state.arrayEditions[editionItemIndex].mediaSortID = editionItem.mediaSortID;

    //     };

    //     // if (hasNonEmptyProperty(editionItem, "active") === true) {

    //     //   state.arrayEditions[editionItemIndex].active = editionItem.active;

    //     // };

    //     if (hasNonEmptyProperty(editionItem, "mediaActive") === true) {

    //       state.arrayEditions[editionItemIndex].mediaActive = editionItem.mediaActive;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "mediaCreateDate") === true) {

    //       state.arrayEditions[editionItemIndex].mediaCreateDate = editionItem.mediaCreateDate;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "mediaUpdatedDate") === true) {

    //       state.arrayEditions[editionItemIndex].mediaUpdatedDate = editionItem.mediaUpdatedDate;

    //     };

    //     // };

    //     // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
    //     // if (hasNonEmptyProperty(editionItem, "title") === true) {

    //     //   if (hasNonEmptyProperty(editionItem.title, "titleID") === true) {

    //     //     state.arrayEditions[editionItemIndex].title.titleID = editionItem.title.titleID;

    //     //   };

    //     if (hasNonEmptyProperty(editionItem, "titleName") === true) {

    //       state.arrayEditions[editionItemIndex].titleName = editionItem.titleName;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "titleSort") === true) {

    //       state.arrayEditions[editionItemIndex].titleSort = editionItem.titleSort;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "titleURL") === true) {

    //       state.arrayEditions[editionItemIndex].titleURL = editionItem.titleURL;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "authorFirstName") === true) {

    //       state.arrayEditions[editionItemIndex].authorFirstName = editionItem.authorFirstName;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "authorLastName") === true) {

    //       state.arrayEditions[editionItemIndex].authorLastName = editionItem.authorLastName;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "submissionDate") === true) {

    //       state.arrayEditions[editionItemIndex].submissionDate = editionItem.submissionDate;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "titlePublicationDate") === true) {

    //       state.arrayEditions[editionItemIndex].titlePublicationDate = editionItem.titlePublicationDate;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "titleImageName") === true) {

    //       state.arrayEditions[editionItemIndex].titleImageName = editionItem.titleImageName;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "categoryID") === true) {

    //       state.arrayEditions[editionItemIndex].categoryID = editionItem.categoryID;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "shortDescription") === true) {

    //       state.arrayEditions[editionItemIndex].shortDescription = editionItem.shortDescription;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "urlPKDWeb") === true) {

    //       state.arrayEditions[editionItemIndex].urlPKDWeb = editionItem.urlPKDWeb;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "titleActive") === true) {

    //       state.arrayEditions[editionItemIndex].titleActive = editionItem.titleActive;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "titleCreateDate") === true) {

    //       state.arrayEditions[editionItemIndex].titleCreateDate = editionItem.titleCreateDate;

    //     };

    //     if (hasNonEmptyProperty(editionItem, "titleUpdatedDate") === true) {

    //       state.arrayEditions[editionItemIndex].titleUpdatedDate = editionItem.titleUpdatedDate;

    //     };

    //     // };

    //   };

    // },
    // deleteStateEdition(state, action) {

    //   // let editionItemIndex = action.payload;
    //   let editionListIndex;
    //   let editionID = action.payload;

    //   // ? This doesn't work because state.arrayEditions isn't stored as an array of objects?
    //   // ? Need to copy the array?
    //   // let existingEditionIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);

    //   if (isEmpty(editionID) === false) {

    //     editionListIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);

    //     state.arrayEditions.splice(editionListIndex, 1);

    //   };

    // },
    // setEditionsDataOffline(state, action) {

    //   state.editionsDataOffline = action.payload;

    // },
    setEditionSortBy(state, action) {

      state.editionSortBy = action.payload;

    }
  }
});

export const { loadArrayEditions, /* addStateEdition, updateStateEdition, deleteStateEdition, */ /* setEditionsDataOffline, */ setEditionSortBy } = editionsSlice.actions;

export default editionsSlice.reducer;