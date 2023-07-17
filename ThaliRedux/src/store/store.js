import { configureStore } from "@reduxjs/toolkit";
import thaliSlice from "../slices/thaliSlice";

export const store = configureStore({
  reducer: {
    thaliSlice: thaliSlice,
  },
});
