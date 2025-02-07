import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '@api';

interface IIngredientState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null | undefined;
}

const initialState: IIngredientState = {
  ingredients: [],
  isIngredientsLoading: true,
  error: null
};

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredient/fetchIngredientsThunk',
  async () => {
    return await getIngredientsApi();
  }
);

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, { error }) => {
        state.error = error?.message || 'Ошибка при загрузке ингредиентов';
      });

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isIngredientsLoading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      (state) => {
        state.isIngredientsLoading = false;
      }
    );
  },
  selectors: {
    selectIngredients: (state: IIngredientState) => state.ingredients,
    selectIngredientsLoading: (state: IIngredientState) => state.isIngredientsLoading
  }
});

// Экспортируем селекторы
export const { selectIngredients, selectIngredientsLoading } = ingredientSlice.selectors;
export default ingredientSlice.reducer;
