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

// Selectors for step data
export const selectStepData = (state, stepIndex) => state.addProduct.stepData[stepIndex] || {};
export const selectAllStepData = (state) => state.addProduct.stepData;

// Utility to get step data (for use outside React)
export function getStepData(stepData, stepIndex) {
  return stepData && stepData[stepIndex] ? stepData[stepIndex] : {};
}

export const { saveStepData, saveStepDataLocal, setStepLastSaved, setAllStepData, resetAddProduct } = addProductSlice.actions;
export default addProductSlice.reducer;
