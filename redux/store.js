import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesSlice from './reducers/categoriesReducer'
import { createWrapper } from "next-redux-wrapper";

// creating store
export const store = configureStore({
    reducer: combineReducers({
        categories: categoriesSlice,
    }),
    devTools: true,
});

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);