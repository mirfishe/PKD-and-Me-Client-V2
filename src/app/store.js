import { configureStore } from "@reduxjs/toolkit";
import applicationSettingsSlice from "./applicationSettingsSlice";
import urlsSlice from "./urlsSlice";
import categoriesSlice from "./categoriesSlice";
import mediaSlice from "./mediaSlice";
import titlesSlice from "./titlesSlice";
import editionsSlice from "./editionsSlice";
import userSlice from "./userSlice";
import userReviewsSlice from "./userReviewsSlice";

export default configureStore({
  reducer: {
    applicationSettings: applicationSettingsSlice,
    categories: categoriesSlice,
    editions: editionsSlice,
    media: mediaSlice,
    titles: titlesSlice,
    urls: urlsSlice,
    user: userSlice,
    userReviews: userReviewsSlice
  }
});
