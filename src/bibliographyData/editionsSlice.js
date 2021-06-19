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
    loadArrayEditions: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "loadArrayEditions action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "loadArrayEditions action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "loadArrayEditions action.payload[i]", action.payload[i]);
          state.arrayEditions.push(action.payload[i]);
        };

        state.editionsLoaded = true;
        state.lastDatabaseRetrievalEditions = GetDateTime();

      }
    },
    addStateEdition: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "addStateEdition action.payload", action.payload);
        // console.log(componentName, GetDateTime(), "addStateEdition action.payload.length", action.payload.length);

        // * Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, GetDateTime(), "addStateEdition action.payload[i]", action.payload[i]);
          state.arrayEditions.push(action.payload[i]);
        };

      }
    },
    updateStateEdition: {
      reducer(state, action) {
        console.log(componentName, GetDateTime(), "updateStateEdition action.payload", action.payload);

        const editionItem = action.payload;
        // console.log(componentName, GetDateTime(), "updateStateEdition editionItem", editionItem);
        // console.log(componentName, GetDateTime(), "updateStateEdition editionItem.editionID", editionItem.editionID);
        // console.log(componentName, GetDateTime(), "updateStateEdition editionItem.editionItemIndex", editionItem.editionItemIndex);

        if (typeof editionItem === "object") {

          if (editionItem.hasOwnProperty("titleID")) {
            state.arrayEditions[editionItem.editionItemIndex].titleID = editionItem.titleID;
          };

          if (editionItem.hasOwnProperty("mediaID")) {
            state.arrayEditions[editionItem.editionItemIndex].mediaID = editionItem.mediaID;
          };

          if (editionItem.hasOwnProperty("publicationDate")) {
            state.arrayEditions[editionItem.editionItemIndex].publicationDate = editionItem.publicationDate;
          };

          if (editionItem.hasOwnProperty("editionPublicationDate")) {
            state.arrayEditions[editionItem.editionItemIndex].editionPublicationDate = editionItem.editionPublicationDate;
          };

          if (editionItem.hasOwnProperty("imageName")) {
            state.arrayEditions[editionItem.editionItemIndex].imageName = editionItem.imageName;
          };

          if (editionItem.hasOwnProperty("editionImageName")) {
            state.arrayEditions[editionItem.editionItemIndex].editionImageName = editionItem.editionImageName;
          };

          if (editionItem.hasOwnProperty("ASIN")) {
            state.arrayEditions[editionItem.editionItemIndex].ASIN = editionItem.ASIN;
          };

          if (editionItem.hasOwnProperty("textLinkShort")) {
            state.arrayEditions[editionItem.editionItemIndex].textLinkShort = editionItem.textLinkShort;
          };

          if (editionItem.hasOwnProperty("textLinkFull")) {
            state.arrayEditions[editionItem.editionItemIndex].textLinkFull = editionItem.textLinkFull;
          };

          if (editionItem.hasOwnProperty("imageLinkSmall")) {
            state.arrayEditions[editionItem.editionItemIndex].imageLinkSmall = editionItem.imageLinkSmall;
          };

          if (editionItem.hasOwnProperty("imageLinkMedium")) {
            state.arrayEditions[editionItem.editionItemIndex].imageLinkMedium = editionItem.imageLinkMedium;
          };

          if (editionItem.hasOwnProperty("imageLinkLarge")) {
            state.arrayEditions[editionItem.editionItemIndex].imageLinkLarge = editionItem.imageLinkLarge;
          };

          if (editionItem.hasOwnProperty("textImageLink")) {
            state.arrayEditions[editionItem.editionItemIndex].textImageLink = editionItem.textImageLink;
          };

          if (editionItem.hasOwnProperty("active")) {
            state.arrayEditions[editionItem.editionItemIndex].active = editionItem.active;
          };

          if (editionItem.hasOwnProperty("editionActive")) {
            state.arrayEditions[editionItem.editionItemIndex].editionActive = editionItem.editionActive;
          };

          if (editionItem.hasOwnProperty("updateDate")) {
            state.arrayEditions[editionItem.editionItemIndex].updateDate = editionItem.updateDate;
          };

          if (editionItem.hasOwnProperty("editionUpdatedDate")) {
            state.arrayEditions[editionItem.editionItemIndex].editionUpdatedDate = editionItem.editionUpdatedDate;
          };

          // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
          // if (editionItem.hasOwnProperty("medium")) {
          // console.log(componentName, GetDateTime(), "updateStateEdition editionItem.medium", editionItem.medium);

          // if (editionItem.medium.hasOwnProperty("mediaID")) {
          //   state.arrayEditions[editionItem.editionItemIndex].medium.mediaID = editionItem.medium.mediaID;
          // };

          if (editionItem.hasOwnProperty("media")) {
            state.arrayEditions[editionItem.editionItemIndex].media = editionItem.media;
          };

          if (editionItem.hasOwnProperty("electronic")) {
            state.arrayEditions[editionItem.editionItemIndex].electronic = editionItem.electronic;
          };

          if (editionItem.hasOwnProperty("sortID")) {
            state.arrayEditions[editionItem.editionItemIndex].sortID = editionItem.sortID;
          };

          if (editionItem.hasOwnProperty("mediaSortID")) {
            state.arrayEditions[editionItem.editionItemIndex].mediaSortID = editionItem.mediaSortID;
          };

          // if (editionItem.hasOwnProperty("active")) {
          //   state.arrayEditions[editionItem.editionItemIndex].active = editionItem.active;
          // };

          if (editionItem.hasOwnProperty("mediaActive")) {
            state.arrayEditions[editionItem.editionItemIndex].mediaActive = editionItem.mediaActive;
          };

          if (editionItem.hasOwnProperty("mediaCreateDate")) {
            state.arrayEditions[editionItem.editionItemIndex].mediaCreateDate = editionItem.mediaCreateDate;
          };

          if (editionItem.hasOwnProperty("mediaUpdatedDate")) {
            state.arrayEditions[editionItem.editionItemIndex].mediaUpdatedDate = editionItem.mediaUpdatedDate;
          };

          // };

          // // TODO: Fix how this is handled with the change in the left outer joins from Knex.
          // if (editionItem.hasOwnProperty("title")) {

          //   if (editionItem.title.hasOwnProperty("titleID")) {
          //     state.arrayEditions[editionItem.editionItemIndex].title.titleID = editionItem.title.titleID;
          //   };

          if (editionItem.hasOwnProperty("titleName")) {
            state.arrayEditions[editionItem.editionItemIndex].titleName = editionItem.titleName;
          };

          if (editionItem.hasOwnProperty("titleSort")) {
            state.arrayEditions[editionItem.editionItemIndex].titleSort = editionItem.titleSort;
          };

          if (editionItem.hasOwnProperty("titleURL")) {
            state.arrayEditions[editionItem.editionItemIndex].titleURL = editionItem.titleURL;
          };

          if (editionItem.hasOwnProperty("authorFirstName")) {
            state.arrayEditions[editionItem.editionItemIndex].authorFirstName = editionItem.authorFirstName;
          };

          if (editionItem.hasOwnProperty("authorLastName")) {
            state.arrayEditions[editionItem.editionItemIndex].authorLastName = editionItem.authorLastName;
          };

          if (editionItem.hasOwnProperty("titlePublicationDate")) {
            state.arrayEditions[editionItem.editionItemIndex].titlePublicationDate = editionItem.titlePublicationDate;
          };

          if (editionItem.hasOwnProperty("titleImageName")) {
            state.arrayEditions[editionItem.editionItemIndex].titleImageName = editionItem.titleImageName;
          };

          if (editionItem.hasOwnProperty("categoryID")) {
            state.arrayEditions[editionItem.editionItemIndex].categoryID = editionItem.categoryID;
          };

          if (editionItem.hasOwnProperty("shortDescription")) {
            state.arrayEditions[editionItem.editionItemIndex].shortDescription = editionItem.shortDescription;
          };

          if (editionItem.hasOwnProperty("urlPKDweb")) {
            state.arrayEditions[editionItem.editionItemIndex].urlPKDweb = editionItem.urlPKDweb;
          };

          if (editionItem.hasOwnProperty("titleActive")) {
            state.arrayEditions[editionItem.editionItemIndex].titleActive = editionItem.titleActive;
          };

          if (editionItem.hasOwnProperty("titleCreateDate")) {
            state.arrayEditions[editionItem.editionItemIndex].titleCreateDate = editionItem.titleCreateDate;
          };

          if (editionItem.hasOwnProperty("titleUpdatedDate")) {
            state.arrayEditions[editionItem.editionItemIndex].titleUpdatedDate = editionItem.titleUpdatedDate;
          };

          // };

        };

      }
    },
    deleteStateEdition: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "deleteStateEdition action.payload", action.payload);

        const editionItemIndex = action.payload;
        // const editionID = action.payload;

        // ? This doesn't work because state.arrayEditions isn't stored as an array of objects?
        // ? Need to copy the array?
        // const existingEditionIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);
        // console.log(componentName, GetDateTime(), "deleteStateEdition existingEditionIndex", existingEditionIndex);

        state.arrayEditions.splice(editionItemIndex, 1);

      }
    },
    setEditionsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setEditionsDataOffline action.payload", action.payload);

        state.editionsDataOffline = action.payload;

      }
    },
    setEditionSortBy: {
      reducer(state, action) {
        // console.log(componentName, GetDateTime(), "setEditionSortBy action.payload", action.payload);

        state.editionSortBy = action.payload;

      }
    }
  }
});

export const { loadArrayEditions, addStateEdition, updateStateEdition, deleteStateEdition, setEditionsDataOffline, setEditionSortBy } = editionsSlice.actions;

export default editionsSlice.reducer;