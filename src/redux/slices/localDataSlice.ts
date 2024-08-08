// src/slices/localDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface LocalDataState {
  localCountry: { latitude: number; longitude: number } | null;
  localData: any;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: LocalDataState = {
  localCountry: null,
  localData: null,
  loading: true,
  error: null,
};

const localDataSlice = createSlice({
  name: "localData",
  initialState,
  reducers: {
    setLocalData: (state, action: PayloadAction<any>) => {
      state.localData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLocalCountry: (state, action: PayloadAction<{ latitude: number; longitude: number } | null>) => {
      state.localCountry = action.payload;
    },
  },
});

// Export actions
export const { setLocalData, setLoading, setError, setLocalCountry } = localDataSlice.actions;

// Export reducer
export default localDataSlice.reducer;
