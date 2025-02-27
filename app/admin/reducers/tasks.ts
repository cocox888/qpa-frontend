import { client } from "@/lib/utils/customAxios";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TypeTask } from "@/lib/types";

export const getAllTasks = createAsyncThunk("tasks/getAllTasks", async () => {
  const role = localStorage.getItem("role");
  const data = await client(
    `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/${role}/allTasks`
  );
  return data;
});

interface TaskState {
  isFetching: boolean;
  tasks: TypeTask[];
  myTasks: TypeTask[];
  taskCounts: {
    pending: number;
    inProgress: number;
    completed: number;
    dueToday: number;
    allTasksNum: number;
    myTaskNum: number; // Add this if necessary
  };
}

const initialState: TaskState = {
  isFetching: true,
  tasks: [],
  myTasks: [],
  taskCounts: {
    pending: 0,
    inProgress: 0,
    completed: 0,
    dueToday: 0,
    allTasksNum: 0,
    myTaskNum: 0,
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskCounts: (
      state,
      action: PayloadAction<(typeof initialState)["taskCounts"]>
    ) => {
      state.taskCounts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        getAllTasks.fulfilled,
        (state, action: PayloadAction<TypeTask[]>) => {
          state.isFetching = false;
          console.log(action.payload);
          const userID = localStorage.getItem("userId");
          const myTasks = action.payload?.filter((item) => {
            return (
              item?.assignedTaskUser?.reduce((acc, user) => {
                const temp=String(user.id) == userID ? 1 : 0
                return acc + temp;
              }, 0) || 0 >= 1
            );
          });
          state.myTasks = myTasks;
          console.log(myTasks);
          state.tasks = action.payload;
          const today = new Date().toISOString().split("T")[0];
          let pending = 0;
          let inProgress = 0;
          let completed = 0;
          let dueToday = 0;
          for (const task of action.payload) {
            if (task.state === "todo") pending += 1;
            if (task.state === "inprogress") inProgress += 1;
            if (task.state === "completed") completed += 1;
            if (task.due_date === today) dueToday += 1;
          }

          state.taskCounts = {
            pending,
            inProgress,
            completed,
            dueToday,
            allTasksNum: action.payload.length,
            myTaskNum: myTasks.length,
          };
        }
      )
      .addCase(getAllTasks.rejected, (state) => {
        state.isFetching = false;
      });

    //fetch myTasks
  },
});

export const { setTaskCounts } = taskSlice.actions;

export default taskSlice.reducer;
