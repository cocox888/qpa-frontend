import { KanbanTask, TypeClient, TypeUser } from '@/lib/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUniqPayload } from 'recharts/types/util/payload/getUniqPayload';

interface MemberState {
  clients: TypeClient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const initialState: MemberState = {
  clients: [],
  status: 'idle',
  error: null
};

export const getAllClients = createAsyncThunk<TypeClient[]>(
  'clients/getAllClients',
  async () => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('refresh_token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/${role}/clients`,
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
    addKanbanTask: (state, action: PayloadAction<TypeClient>) => {
      state.clients.push(action.payload);
    },
    updateKanbanTaskById: (state, action: PayloadAction<TypeClient>) => {
      const index = state.clients.findIndex(
        (member) => member.id === action.payload.id
      );
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    deleteKanbanTask: (state, action: PayloadAction<number>) => {
      state.clients = state.clients.filter(
        (task) => task.id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load tasks';
      });
  }
});

export const { addKanbanTask, deleteKanbanTask, updateKanbanTaskById } =
  memberSlice.actions;
export default memberSlice.reducer;
