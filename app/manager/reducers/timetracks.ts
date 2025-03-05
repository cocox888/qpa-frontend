import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single record
interface Record {
  [key: number]: number; // Assuming `id` is a string and `value` is a number
}

// Define the initial state type
interface TimerState {
  records: Record;
}

const initialState: TimerState = {
  records: {},
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    // Define the action payload type with PayloadAction
    addRecord: (state, action: PayloadAction<{ id: number; value: number }>) => {
      const { id, value } = action.payload;
      if (state.records[id]) {
        state.records[id] += value;
      } else {
        state.records[id] = value;
      } // Updating state immutably with Immer

    },
  },
});

export const { addRecord } = timerSlice.actions;
export default timerSlice.reducer;
