import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const recipeId = recipe?.idFood;

      if (!recipeId) {
        return;
      }

      const existingRecipeIndex = state.favoriterecipes.findIndex(
        (favoriteRecipe) => String(favoriteRecipe?.idFood) === String(recipeId)
      );

      if (existingRecipeIndex >= 0) {
        state.favoriterecipes.splice(existingRecipeIndex, 1);
      } else {
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
