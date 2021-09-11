import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import urlsReducer from "./urlsSlice";
import categoriesReducer from "../bibliographyData/categoriesSlice";
import mediaReducer from "../bibliographyData/mediaSlice";
import titlesReducer from "../bibliographyData/titlesSlice";
import editionsReducer from "../bibliographyData/editionsSlice";
import userReducer from "./userSlice";
import userReviewsReducer from "../bibliographyData/userReviewsSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    categories: categoriesReducer,
    editions: editionsReducer,
    media: mediaReducer,
    titles: titlesReducer,
    urls: urlsReducer,
    user: userReducer,
    userReviews: userReviewsReducer
  }
});
