import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../components/categories/categoriesSlice";
import mediaReducer from "../components/media/mediaSlice";
import titlesReducer from "../components/titles/titlesSlice";
import editionsReducer from "../components/editions/editionsSlice";

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    media: mediaReducer,
    titles: titlesReducer,
    editions: editionsReducer
  },
});
