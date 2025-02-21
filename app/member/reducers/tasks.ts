import { client } from '@/lib/utils/customAxios';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import type { TypeTask } from '@/lib/types';

export const getAllTasks = createAsyncThunk('tasks/getAllTasks', async () => {
  const role = localStorage.getItem('role');
  const data = await client(
    `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/${role}/allTasks`
  );
  return data;
});
interface TaskState {
  isFetching: boolean;
  tasks: TypeTask[];
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
  taskCounts: {
    pending: 0,
    inProgress: 0,
    completed: 0,
    dueToday: 0,
    allTasksNum: 0,
    myTaskNum: 0
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskCounts: (
      state,
      action: PayloadAction<(typeof initialState)['taskCounts']>
    ) => {
      state.taskCounts = action.payload;
    }
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
          state.tasks = action.payload;
          const today = new Date().toISOString().split('T')[0];
          let pending = 0;
          let inProgress = 0;
          let completed = 0;
          let dueToday = 0;
          for (const task of action.payload) {
            if (task.state === 'pending') pending += 1;
            if (task.state === 'inprogress') inProgress += 1;
            if (task.state === 'completed') completed += 1;
            if (task.due_date === today) dueToday += 1;
          }

          state.taskCounts = {
            pending,
            inProgress,
            completed,
            dueToday,
            allTasksNum: action.payload.length,
            myTaskNum: 0
          };
        }
      )
      .addCase(getAllTasks.rejected, (state) => {
        state.isFetching = false;
      });
  }
});

export const { setTaskCounts } = taskSlice.actions;

export default taskSlice.reducer;
