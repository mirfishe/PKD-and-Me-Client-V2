import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import categoriesReducer from "../bibliographyData/categoriesSlice";
import mediaReducer from "../bibliographyData/mediaSlice";
import titlesReducer from "../bibliographyData/titlesSlice";
import editionsReducer from "../bibliographyData/editionsSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    categories: categoriesReducer,
    media: mediaReducer,
    titles: titlesReducer,
    editions: editionsReducer
  },
});
