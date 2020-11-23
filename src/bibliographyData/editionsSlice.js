import {createSlice} from "@reduxjs/toolkit";

const componentName = "editionsSlice.js";

const initialState = {
  arrayEditions: [],
  editionsLoaded: false,
  lastDatabaseRetrievalEditions: null,
  editionsDataOffline: false,
  editionSort: "titleName"
};

const editionsSlice = createSlice({
  name: "editions",
  initialState,
  reducers: {
    loadArrayEditions: {
      reducer(state, action) {
        // console.log(componentName, "loadArrayEditions action.payload", action.payload);
        // console.log(componentName, "loadArrayEditions action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayEditions action.payload[i]", action.payload[i]);
          state.arrayEditions.push(action.payload[i]);
        };

        state.editionsLoaded = true;
        state.lastDatabaseRetrievalEditions = new Date().toISOString();

      }
    },
    addStateEdition: {
      reducer(state, action) {
        // console.log(componentName, "addStateEdition action.payload", action.payload);
        // console.log(componentName, "addStateEdition action.payload.length", action.payload.length);

        // Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "addStateEdition action.payload[i]", action.payload[i]);
          state.arrayEditions.push(action.payload[i]);
        };

      }
    },
    updateStateEdition: {
      reducer(state, action) {
        // console.log(componentName, "updateStateEdition action.payload", action.payload);

        const editionItem = action.payload;
        // console.log(componentName, "updateStateEdition editionItem", editionItem);
        // console.log(componentName, "updateStateEdition editionItem.editionID", editionItem.editionID);
        // console.log(componentName, "updateStateEdition editionItem.editionItemIndex", editionItem.editionItemIndex);

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
          if (editionItem.hasOwnProperty("imageName")) {
            state.arrayEditions[editionItem.editionItemIndex].imageName = editionItem.imageName;
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
          if (editionItem.hasOwnProperty("updatedAt")) {
            state.arrayEditions[editionItem.editionItemIndex].updatedAt = editionItem.updatedAt;
          };

        };

      }
    },
    deleteStateEdition: {
      reducer(state, action) {
        // console.log(componentName, "deleteStateEdition action.payload", action.payload);

        const editionItemIndex = action.payload;
        // const editionID = action.payload;

        // This doesn't work because state.arrayEditions isn't stored as an array of objects?
        // Need to copy the array?
        // const existingEditionIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);
        // console.log(componentName, "deleteStateEdition existingEditionIndex", existingEditionIndex);

        state.arrayEditions.splice(editionItemIndex, 1);

      }
    },
    setEditionsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setEditionsDataOffline action.payload", action.payload);

        state.editionsDataOffline = action.payload;

      }
    },
    setEditionSort: {
      reducer(state, action) {
        // console.log(componentName, "setEditionSort action.payload", action.payload);

        state.editionSort = action.payload;

      }
    }
}
});

export const {loadArrayEditions, addStateEdition, updateStateEdition, deleteStateEdition, setEditionsDataOffline, setEditionSort} = editionsSlice.actions;

export default editionsSlice.reducer;