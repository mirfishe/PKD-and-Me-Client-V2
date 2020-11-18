import {createSlice} from "@reduxjs/toolkit";

const componentName = "titlesSlice.js";

const initialState = {
  arrayTitles: [],
  titlesLoaded: false,
  lastDatabaseRetrievalTitles: null,
  titlesDataOffline: false,
  titleSort: "titleName"
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    loadArrayTitles: {
      reducer(state, action) {
        // console.log(componentName, "loadArrayTitles action.payload", action.payload);
        // console.log(componentName, "loadArrayTitles action.payload.length", action.payload.length);

        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "loadArrayTitles action.payload[i]", action.payload[i]);
          state.arrayTitles.push(action.payload[i]);
        };

        state.titlesLoaded = true;
        state.lastDatabaseRetrievalTitles = new Date().toISOString();

      }
    },
    addStateTitle: {
      reducer(state, action) {
        // console.log(componentName, "addStateTitle action.payload", action.payload);
        // console.log(componentName, "addStateTitle action.payload.length", action.payload.length);

        // Could change this to accept an object and add that object to the store
        for (let i = 0; i < action.payload.length; i++) {
          // console.log(componentName, "addStateTitle action.payload[i]", action.payload[i]);
          state.arrayTitles.push(action.payload[i]);
        };

      }
    },
    updateStateTitle: {
      reducer(state, action) {
        // console.log(componentName, "updateStateTitle action.payload", action.payload);

        const titleItem = action.payload;
        // console.log(componentName, "updateStateTitle titleItem", titleItem);
        // console.log(componentName, "updateStateTitle titleItem.titleID", titleItem.titleID);
        // console.log(componentName, "updateStateTitle titleItem.titleItemIndex", titleItem.titleItemIndex);

        // This doesn't work because state.arrayTitles isn't stored as an array of objects?
        // Need to copy the array?
        // const existingTitle = state.arrayTitles.find(title => title.titleID === titleItem.titleID);
        // console.log(componentName, "updateStateTitle existingTitle", existingTitle);

        // if (existingTitle !== undefined) {
        //   // existingTitle.titleID = titleItem.titleID;
        //   existingTitle.titleName = titleItem.titleName;
        //   existingTitle.titleSort = titleItem.titleSort;
        //   existingTitle.titleURL = titleItem.titleURL;
        //   existingTitle.authorFirstName = titleItem.authorFirstName;
        //   existingTitle.authorLastName = titleItem.authorLastName;
        //   existingTitle.publicationDate = titleItem.publicationDate;
        //   existingTitle.imageName = titleItem.imageName;
        //   existingTitle.categoryID = titleItem.categoryID;
        //   existingTitle.shortDescription = titleItem.shortDescription;
        //   existingTitle.urlPKDweb = titleItem.urlPKDweb;
        //   existingTitle.active = titleItem.active;
        //   existingTitle.createdAt = titleItem.createdAt;
        //   existingTitle.updatedAt = titleItem.updatedAt;
        // };

        // Updates all the values even if you don't send them in the payload
        // Sets them to what if they're not sent in the payload?
        state.arrayTitles[titleItem.titleItemIndex].titleName = titleItem.titleName;
        state.arrayTitles[titleItem.titleItemIndex].titleSort = titleItem.titleSort;
        state.arrayTitles[titleItem.titleItemIndex].titleURL = titleItem.titleURL;
        state.arrayTitles[titleItem.titleItemIndex].authorFirstName = titleItem.authorFirstName;
        state.arrayTitles[titleItem.titleItemIndex].authorLastName = titleItem.authorLastName;
        state.arrayTitles[titleItem.titleItemIndex].publicationDate = titleItem.publicationDate;
        state.arrayTitles[titleItem.titleItemIndex].imageName = titleItem.imageName;
        state.arrayTitles[titleItem.titleItemIndex].categoryID = titleItem.categoryID;
        state.arrayTitles[titleItem.titleItemIndex].shortDescription = titleItem.shortDescription;
        state.arrayTitles[titleItem.titleItemIndex].urlPKDweb = titleItem.urlPKDweb;
        state.arrayTitles[titleItem.titleItemIndex].active = titleItem.active;
        state.arrayTitles[titleItem.titleItemIndex].createdAt = titleItem.createdAt;
        state.arrayTitles[titleItem.titleItemIndex].updatedAt = titleItem.updatedAt;

      }
    },
    deleteStateTitle: {
      reducer(state, action) {
        // console.log(componentName, "deleteStateTitle action.payload", action.payload);

        const titleItemIndex = action.payload;
        // const titleID = action.payload;

        // This doesn't work because state.arrayTitles isn't stored as an array of objects?
        // Need to copy the array?
        // const existingTitleIndex = state.arrayTitles.findIndex(title => title.titleID === titleID);
        // console.log(componentName, "deleteStateTitle existingTitleIndex", existingTitleIndex);

        state.arrayTitles.splice(titleItemIndex, 1);

      }
    },
    setTitlesDataOffline: {
      reducer(state, action) {
        // console.log(componentName, "setTitlesDataOffline action.payload", action.payload);

        state.titlesDataOffline = action.payload;

      }
    },
    setTitleSort: {
      reducer(state, action) {
        // console.log(componentName, "setTitleSort action.payload", action.payload);

        state.titleSort = action.payload;

      }
    }
}
});

export const {loadArrayTitles, addStateTitle, updateStateTitle, deleteStateTitle, setTitlesDataOffline, setTitleSort} = titlesSlice.actions;

export default titlesSlice.reducer;