import { KanbanTask, type TypeUser } from '@/lib/types';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import { getUniqPayload } from 'recharts/types/util/payload/getUniqPayload';

interface UserState {
  users: TypeUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null
};

export const getAllMembers = createAsyncThunk<TypeUser[]>(
  'member/getAllMembers',
  async () => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('refresh_token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/${role}/getAllMembers`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Add Authorization header
        }
      }
    );
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  }
);

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    addKanbanTask: (state, action: PayloadAction<TypeUser>) => {
      state.users.push(action.payload);
    },
    updateKanbanTaskById: (state, action: PayloadAction<TypeUser>) => {
      const index = state.users.findIndex(
        (member) => member.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteKanbanTask: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((task) => task.id !== action.payload);
    },
    updateKanbanTaskStatusById: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const index = state.users.findIndex(
        (member) => member.id === action.payload.id
      );
      state.users[index].status = action.payload.status;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        // console.log(action.payload);
      })
      .addCase(getAllMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load tasks';
      });
  }
});

export const {
  addKanbanTask,
  deleteKanbanTask,
  updateKanbanTaskStatusById,
  updateKanbanTaskById
} = memberSlice.actions;
export default memberSlice.reducer;
