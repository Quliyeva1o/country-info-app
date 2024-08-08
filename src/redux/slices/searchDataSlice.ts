import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SearchDataState {
  searchCountry: { latitude: number; longitude: number } | null;
  searchData: any;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: SearchDataState = {
  searchCountry: null,
  searchData: null,
  loading: false, // Changed to false
  error: null,
};

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<any>) => {
      state.searchData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchCountry: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number } | null>
    ) => {
      state.searchCountry = action.payload;
    },
  },
});

// Export actions
export const { setSearchData, setLoading, setError, setSearchCountry } =
  searchDataSlice.actions;

// Export reducer
export default searchDataSlice.reducer;
