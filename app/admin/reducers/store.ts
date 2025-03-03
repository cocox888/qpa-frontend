import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks"; // Adjust path as necessary
import projectReducer from "./projects";
import timerRecordsReducer from "./timetracks";
import kanbanTaskReducer from "./kanbanTasks";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    projects: projectReducer,
    timer: timerRecordsReducer,
    kanbanTasks: kanbanTaskReducer,
  },
});

// Get the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
