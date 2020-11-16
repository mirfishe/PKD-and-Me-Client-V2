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
        // console.log(componentName, "updateStateEdition action.payload.length", action.payload.length);

        const editionItem = action.payload;
        const existingEdition = state.arrayEditions.find(edition => edition.editionID === editionItem.editionID);
        console.log(componentName, "updateStateEdition existingEdition", existingEdition);

        if (existingEdition !== undefined) {
          // existingEdition.editionID = editionItem.editionID;
          existingEdition.titleID = editionItem.titleID;
          existingEdition.mediaID = editionItem.mediaID;
          existingEdition.publicationDate = editionItem.publicationDate;
          existingEdition.imageName = editionItem.imageName;
          existingEdition.ASIN = editionItem.ASIN;
          existingEdition.textLinkShort = editionItem.textLinkShort;
          existingEdition.textLinkFull = editionItem.textLinkFull;
          existingEdition.imageLinkSmall = editionItem.imageLinkSmall;
          existingEdition.imageLinkMedium = editionItem.imageLinkMedium;
          existingEdition.imageLinkLarge = editionItem.imageLinkLarge;
          existingEdition.textImageLink = editionItem.textImageLink;
          existingEdition.active = editionItem.active;
          existingEdition.createdAt = editionItem.createdAt;
          existingEdition.updatedAt = editionItem.updatedAt;
        };

      }
    },
    deleteStateEdition: {
      reducer(state, action) {
        // console.log(componentName, "deleteStateEdition action.payload", action.payload);
        // console.log(componentName, "deleteStateEdition action.payload.length", action.payload.length);

        const editionID = action.payload;

        const existingEditionIndex = state.arrayEditions.findIndex(edition => edition.editionID === editionID);
        console.log(componentName, "deleteStateEdition existingEditionIndex", existingEditionIndex);

        state.arrayEditions.splice(existingEditionIndex, 1);

      }
    },
    setEditionsDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setEditionsDataOffline action.payload", action.payload);
        // console.log(componentName, "setEditionsDataOffline action.payload.length", action.payload.length);

        state.editionsDataOffline = action.payload;

      }
    },
    setEditionSort: {
      reducer(state, action) {
        // console.log(componentName, "setEditionSort action.payload", action.payload);
        // console.log(componentName, "setEditionSort action.payload.length", action.payload.length);

        state.editionSort = action.payload;

      }
    }
}
});

export const {loadArrayEditions, addStateEdition, updateStateEdition, deleteStateEdition, setEditionsDataOffline, setEditionSort} = editionsSlice.actions;

export default editionsSlice.reducer;