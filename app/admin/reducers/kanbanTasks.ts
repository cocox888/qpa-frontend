import { KanbanTask } from "@/lib/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUniqPayload } from "recharts/types/util/payload/getUniqPayload";

interface TaskState {
  tasks: KanbanTask[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchKanbanTasks = createAsyncThunk<KanbanTask[]>(
  "kanban/fetchAllTasks",
  async () => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("refresh_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/${role}/getAllKanbanTasks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  }
);

const taskSlice = createSlice({
  name: "kanbanTasks",
  initialState,
  reducers: {
    addKanbanTask: (state, action: PayloadAction<KanbanTask>) => {
      state.tasks.push(action.payload);
    },
    updateKanbanTaskById: (state, action: PayloadAction<KanbanTask>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteKanbanTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateKanbanTaskStatusById: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index].status = action.payload.status;
    },
    getAllKanbanTasks: (state, action: PayloadAction<KanbanTask>) => {
        state.tasks.push(action.payload);
      },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKanbanTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchKanbanTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
        // console.log(action.payload);
      })
      .addCase(fetchKanbanTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load tasks";
      });
  },
});

export const {
  addKanbanTask,
  deleteKanbanTask,
  updateKanbanTaskStatusById,
  updateKanbanTaskById,
} = taskSlice.actions;
export default taskSlice.reducer;
