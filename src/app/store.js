import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import urlsReducer from "./urlsSlice";
import categoriesReducer from "../bibliographyData/categoriesSlice";
import mediaReducer from "../bibliographyData/mediaSlice";
import titlesReducer from "../bibliographyData/titlesSlice";
import editionsReducer from "../bibliographyData/editionsSlice";
import userReviewsReducer from "../bibliographyData/userReviewsSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    urls: urlsReducer,
    categories: categoriesReducer,
    media: mediaReducer,
    titles: titlesReducer,
    editions: editionsReducer,
    userReviews: userReviewsReducer
  },
});
