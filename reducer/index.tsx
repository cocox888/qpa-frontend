import { configureStore } from "@reduxjs/toolkit";
import timerRecordsReducer from "./timerReducer";

// Define the store's state type based on the reducers
export const store = configureStore({
  reducer: {
    timer: timerRecordsReducer, // `timerRecordsReducer` will manage the `timer` slice of the state
  },
});

// Define RootState type for the entire store
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;

export default store;
