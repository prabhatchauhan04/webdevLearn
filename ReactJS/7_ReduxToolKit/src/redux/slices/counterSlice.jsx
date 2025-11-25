import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

// 1. Create Slice
// 2. Reducer -> Logic to update the state on a particular action
// 3. Action -> Which Reducer Function should get called when we want to update state..
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

/*
What is a Slice?
A slice in RTK is basically a piece of your Redux state along with the reducers and actions that operate on it.
Think of it as a self-contained module of Redux logic:
It has initial state.
It has reducers (functions that modify that state).
It automatically generates action creators for each reducer.
It can also handle async actions via extraReducers.
*/
