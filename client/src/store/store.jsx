import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice"; // Import the reducer function
import questionReducer from "./slices/questionSlice";
import answerReducer from "./slices/answerSlice";
const store = configureStore({
  reducer: {
    auth: userSliceReducer, // Use the reducer function, not the whole slice
    questions : questionReducer,
    answers : answerReducer
  },
});

export default store;
