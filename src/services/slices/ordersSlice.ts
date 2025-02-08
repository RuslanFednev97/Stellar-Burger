import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';

interface OrderState {
  currentOrder: TOrder | null;
  orderName: string;
  isOrdersLoading: boolean;
  isOrderRequesting: boolean;
  orders: TOrder[] | null;
  error: string | null | undefined;
  selectedOrder: TOrder | null;
  isSelectedOrderLoading: boolean;
  selectedOrderError: string | null | undefined;
}

const initialState: OrderState = {
  currentOrder: null,
  orderName: '',
  isOrdersLoading: true,
  isOrderRequesting: false,
  orders: null,
  error: null,
  selectedOrder: null,
  isSelectedOrderLoading: false,
  selectedOrderError: null
};

export const createOrderThunk = createAsyncThunk(
  'order/createOrderThunk',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    if (!response.success) {
      return Promise.reject(response); 
    }
    return response;
  }
);

export const fetchOrdersThunk = createAsyncThunk(
  'order/fetchOrdersThunk',
  async () => await getOrdersApi()
);

export const fetchOrderByNumberThunk = createAsyncThunk(
  'order/fetchOrderByNumberThunk',
  async (number: number) => await getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.currentOrder = null;
    },
    setOrder: (state, action) => {
      state.currentOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.currentOrder = action.payload.order;
        state.orderName = action.payload.name;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrderByNumberThunk.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
        state.isSelectedOrderLoading = false;
      })
      .addCase(fetchOrderByNumberThunk.rejected, (state, { error }) => {
        state.selectedOrderError =
          error?.message || 'Ошибка при загрузке заказа';
      });

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isOrdersLoading = true;
        state.isOrderRequesting = true;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      (state) => {
        state.isOrdersLoading = false;
        state.isOrderRequesting = false;
      }
    );
  },
  selectors: {
    selectOrdersState: (state: OrderState) => state.currentOrder,
    selectOrdersLoading: (state: OrderState) => state.isOrdersLoading,
    selectAllOrders: (state: OrderState) => state.orders
  }
});

export const { selectOrdersState, selectOrdersLoading, selectAllOrders } =
  orderSlice.selectors;
export const { clearOrders, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
