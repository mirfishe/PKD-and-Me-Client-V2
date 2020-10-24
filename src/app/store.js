import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../components/categories/categorySlice';

export default configureStore({
  reducer: {
    category: categoryReducer,
  },
});
