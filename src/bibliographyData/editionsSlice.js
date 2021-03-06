import {createSlice} from "@reduxjs/toolkit";

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

        // * Could change this to accept an object and add that object to the store
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

          if (editionItem.hasOwnProperty("medium")) {
            // console.log(componentName, "updateStateEdition editionItem.medium", editionItem.medium);

            if (editionItem.medium.hasOwnProperty("mediaID")) {
              state.arrayEditions[editionItem.editionItemIndex].medium.mediaID = editionItem.medium.mediaID;
            };

            if (editionItem.medium.hasOwnProperty("media")) {
              state.arrayEditions[editionItem.editionItemIndex].medium.media = editionItem.medium.media;
            };

            if (editionItem.medium.hasOwnProperty("electronic")) {
              state.arrayEditions[editionItem.editionItemIndex].medium.electronic = editionItem.medium.electronic;
            };

            if (editionItem.medium.hasOwnProperty("sortID")) {
              state.arrayEditions[editionItem.editionItemIndex].medium.sortID = editionItem.medium.sortID;
            };

            if (editionItem.medium.hasOwnProperty("active")) {
              state.arrayEditions[editionItem.editionItemIndex].medium.active = editionItem.medium.active;
            };

            if (editionItem.medium.hasOwnProperty("updatedAt")) {
              state.arrayEditions[editionItem.editionItemIndex].medium.updatedAt = editionItem.medium.updatedAt;
            };

          };

          if (editionItem.hasOwnProperty("title")) {

            if (editionItem.title.hasOwnProperty("titleID")) {
              state.arrayEditions[editionItem.editionItemIndex].title.titleID = editionItem.title.titleID;
            };

            if (editionItem.title.hasOwnProperty("titleName")) {
              state.arrayEditions[editionItem.editionItemIndex].title.titleName = editionItem.title.titleName;
            };

            if (editionItem.title.hasOwnProperty("titleSort")) {
              state.arrayEditions[editionItem.editionItemIndex].title.titleSort = editionItem.title.titleSort;
            };

            if (editionItem.title.hasOwnProperty("titleURL")) {
              state.arrayEditions[editionItem.editionItemIndex].title.titleURL = editionItem.title.titleURL;
            };

            if (editionItem.title.hasOwnProperty("authorFirstName")) {
              state.arrayEditions[editionItem.editionItemIndex].title.authorFirstName = editionItem.title.authorFirstName;
            };

            if (editionItem.title.hasOwnProperty("authorLastName")) {
              state.arrayEditions[editionItem.editionItemIndex].title.authorLastName = editionItem.title.authorLastName;
            };

            if (editionItem.title.hasOwnProperty("publicationDate")) {
              state.arrayEditions[editionItem.editionItemIndex].title.publicationDate = editionItem.title.publicationDate;
            };

            if (editionItem.title.hasOwnProperty("imageName")) {
              state.arrayEditions[editionItem.editionItemIndex].title.imageName = editionItem.title.imageName;
            };

            if (editionItem.title.hasOwnProperty("categoryID")) {
              state.arrayEditions[editionItem.editionItemIndex].title.categoryID = editionItem.title.categoryID;
            };

            if (editionItem.title.hasOwnProperty("shortDescription")) {
              state.arrayEditions[editionItem.editionItemIndex].title.shortDescription = editionItem.title.shortDescription;
            };

            if (editionItem.title.hasOwnProperty("urlPKDweb")) {
              state.arrayEditions[editionItem.editionItemIndex].title.urlPKDweb = editionItem.title.urlPKDweb;
            };

            if (editionItem.title.hasOwnProperty("active")) {
              state.arrayEditions[editionItem.editionItemIndex].title.active = editionItem.title.active;
            };
            
            if (editionItem.title.hasOwnProperty("updatedAt")) {
              state.arrayEditions[editionItem.editionItemIndex].title.updatedAt = editionItem.title.updatedAt;
            };

          };

        };

      }
    },
    deleteStateEdition: {
      reducer(state, action) {
        // console.log(componentName, "deleteStateEdition action.payload", action.payload);

        const editionItemIndex = action.payload;
        // const editionID = action.payload;

        // ? This doesn't work because state.arrayEditions isn't stored as an array of objects?
        // ? Need to copy the array?
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
    setEditionSortBy: {
      reducer(state, action) {
        // console.log(componentName, "setEditionSortBy action.payload", action.payload);

        state.editionSortBy = action.payload;

      }
    }
}
});

export const {loadArrayEditions, addStateEdition, updateStateEdition, deleteStateEdition, setEditionsDataOffline, setEditionSortBy} = editionsSlice.actions;

export default editionsSlice.reducer;