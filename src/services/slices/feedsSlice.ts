import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '@api';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isFeedsLoading: boolean;
  error: string | null | undefined;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isFeedsLoading: true,
  error: null
};

export const fetchFeedsThunk = createAsyncThunk(
  'feed/fetchFeedsThunk',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedsThunk.rejected, (state, { error }) => {
        state.error = error?.message || 'Ошибка загрузки фидов';
      });

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isFeedsLoading = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      (state) => {
        state.isFeedsLoading = false;
      }
    );
  },
  selectors: {
    selectOrders: (state: IFeedState) => state.orders,
    selectIsFeedsLoading: (state) => state.isFeedsLoading
  }
});

export const { selectOrders, selectIsFeedsLoading } = feedSlice.selectors;
export const { clearOrders } = feedSlice.actions;
export default feedSlice.reducer;
