import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface Country {
  key: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

interface AllDataState {
  allCountry: Country[];
  allData: any; 
  loading: boolean;
  error: string | null;
}

const initialState: AllDataState = {
  allCountry: [],
  allData: null,
  loading: true,
  error: null,
};

const allDataSlice = createSlice({
  name: "allData",
  initialState,
  reducers: {
    setAllData: (state, action: PayloadAction<any>) => {
      state.allData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAllCountry: (state, action: PayloadAction<Country[]>) => {
      state.allCountry = action.payload;
    },
  },
});

export const { setAllData, setLoading, setError, setAllCountry } = allDataSlice.actions;
export default allDataSlice.reducer;
