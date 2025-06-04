import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stepData: {}, // { 0: {...}, 1: {...}, ... }
  lastSavedStepData: {}, // { 0: {...}, 1: {...}, ... }
};

const addProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {
    // Only update local state, do not trigger saga/api
    saveStepDataLocal: (state, action) => {
      const { stepIndex, data } = action.payload;
      state.stepData[stepIndex] = data;
    },
    // This triggers saga/api
    saveStepData: (state, action) => {
      // no-op, handled by saga
    },
    setStepLastSaved: (state, action) => {
      const { stepIndex, data } = action.payload;
      state.lastSavedStepData[stepIndex] = data;
    },
    setAllStepData: (state, action) => {
      state.stepData = action.payload;
    },
    resetAddProduct: (state) => {
      state.stepData = {};
      state.lastSavedStepData = {};
    },
  },
});

export const { saveStepData, saveStepDataLocal, setStepLastSaved, setAllStepData, resetAddProduct } = addProductSlice.actions;
export default addProductSlice.reducer;
