import reducer, { fetchFeedsThunk, IFeedState } from './feedsSlice';

describe('тест для feedSlice', () => {
  const initialState: IFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isFeedsLoading: true,
    error: null
  };

  // Тест на начальное состояние
  test('начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Тест на начало запроса
  test('начало запроса', () => {
    const action = { type: fetchFeedsThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isFeedsLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  // Тест на успешное выполнение запроса
  test('успешное выполнение запроса', () => {
    const mockPayload = {
      orders: [
        {
          createdAt: '2025-02-27T16:22:31.783Z',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
          0: '643d69a5c3f7b9001cfa093d',
          1: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентный бургер',
          number: 69572,
          status: 'done',
          updatedAt: '2025-02-27T16:22:32.557Z',
          _id: '67c09147133acd001be5412e'
        }
      ],
      total: 1,
      totalToday: 1
    };
    const action = {
      type: fetchFeedsThunk.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);

    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(mockPayload.total);
    expect(state.totalToday).toBe(mockPayload.totalToday);
    expect(state.isFeedsLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  // Тест на ошибку запроса
  test('ошибка запроса', () => {
    const mockError = { message: 'Ошибка загрузки фидов' };
    const action = { type: fetchFeedsThunk.rejected.type, error: mockError };
    const state = reducer(initialState, action);

    expect(state.error).toBe(mockError.message);
    expect(state.isFeedsLoading).toBe(false);
  });
});
