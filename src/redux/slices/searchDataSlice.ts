import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//INTERFACE
interface SearchDataState {
  searchCountry: { latitude: number; longitude: number } | null;
  searchData: any;
  loading: boolean;
  error: string | null;
}

//INITIALS
const initialState: SearchDataState = {
  searchCountry: null,
  searchData: null,
  loading: false,
  error: null,
};

//SLICE
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

export const { setSearchData, setLoading, setError, setSearchCountry } =
  searchDataSlice.actions;

export default searchDataSlice.reducer;
