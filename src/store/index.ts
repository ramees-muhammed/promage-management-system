// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
// import uiReducer from './slices/uiSlice'; 

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    // ui: uiReducer, 
  },
  // Adding middleware to ignore non-serializable data (like Dates) if you use them in the state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;