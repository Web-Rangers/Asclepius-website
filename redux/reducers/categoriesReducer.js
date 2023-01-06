import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: []
    },
    reducers: {
      // Action to set the authentication status
      getCategories(state, action) {
        return {
          ...state,
          categories: action.payload
        }
      },  
    },
});
  
export const { getCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;