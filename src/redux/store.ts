import { configureStore } from '@reduxjs/toolkit';
import localDataReducer from './slices/localDataSlice';
import searchDataReducer from './slices/searchDataSlice';
import AllDataReducer from './slices/AllDataSlice';

const store = configureStore({
  reducer: {
    localData: localDataReducer,
    searchData: searchDataReducer,
    allData: AllDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
