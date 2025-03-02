import reducer, {
  createOrderThunk,
  fetchOrdersThunk,
  fetchOrderByNumberThunk,
  OrderState
} from './ordersSlice';
import { TOrder } from '../../utils/types';

describe('тест для ordersSlice', () => {
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

  // Создаем тестовые данные
  const testOrders: TOrder[] = [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      _id: '67c0994a133acd001be54226',
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-02-27T16:56:42.706Z',
      updatedAt: '2025-02-27T16:56:43.435Z',
      number: 69625
    }
  ];

  // Тест на начальное состояние
  test('начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Тест на начало запроса для создания заказа
  test('начало запроса для создания заказа', () => {
    const action = { type: createOrderThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isOrdersLoading).toBe(true);
    expect(state.isOrderRequesting).toBe(true);
  });

  // Тест на успешное выполнение запроса для создания заказа
  test('успешное выполнение запроса для создания заказа', () => {
    const mockPayload = {
      order: testOrders[0],
      name: 'Краторный био-марсианский бургер'
    };
    const action = {
      type: createOrderThunk.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);

    expect(state.currentOrder).toEqual(mockPayload.order);
    expect(state.orderName).toBe(mockPayload.name);
    expect(state.isOrdersLoading).toBe(false);
    expect(state.isOrderRequesting).toBe(false);
    expect(state.error).toBeNull();
  });

  // Тест на ошибку запроса для создания заказа
  test('ошибка запроса для создания заказа', () => {
    const mockError = { message: 'Ошибка при создании заказа' };
    const action = { type: createOrderThunk.rejected.type, error: mockError };
    const state = reducer(initialState, action);

    expect(state.error).toBe(mockError.message); // Проверяем, что ошибка установлена
    expect(state.isOrdersLoading).toBe(false);
    expect(state.isOrderRequesting).toBe(false);
  });

  // Тест на начало запроса для получения всех заказов
  test('начало запроса для получения всех заказов', () => {
    const action = { type: fetchOrdersThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isOrdersLoading).toBe(true);
    expect(state.isOrderRequesting).toBe(true);
  });

  // Тест на успешное выполнение запроса для получения всех заказов
  test('успешное выполнение запроса для получения всех заказов', () => {
    const mockPayload = [testOrders[0]];
    const action = {
      type: fetchOrdersThunk.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);

    expect(state.orders).toEqual(mockPayload);
    expect(state.isOrdersLoading).toBe(false);
    expect(state.isOrderRequesting).toBe(false);
    expect(state.error).toBeNull(); // Убедитесь, что ошибка сбрасывается
  });

  // Тест на начало запроса для получения заказа по номеру
  test('начало запроса для получения заказа по номеру', () => {
    const action = { type: fetchOrderByNumberThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isOrdersLoading).toBe(true);
    expect(state.isOrderRequesting).toBe(true);
  });

  // Тест на успешное выполнение запроса для получения заказа по номеру
  test('успешное выполнение запроса для получения заказа по номеру', () => {
    const mockPayload = { orders: [testOrders[0]] };
    const action = {
      type: fetchOrderByNumberThunk.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);

    expect(state.selectedOrder).toEqual(mockPayload.orders[0]);
    expect(state.isSelectedOrderLoading).toBe(false);
    expect(state.selectedOrderError).toBeNull();
  });

  // Тест на ошибку запроса для получения заказа по номеру
  test('ошибка запроса для получения заказа по номеру', () => {
    const mockError = { message: 'Ошибка при загрузке заказа' };
    const action = {
      type: fetchOrderByNumberThunk.rejected.type,
      error: mockError
    };
    const state = reducer(initialState, action);

    expect(state.selectedOrderError).toBe(mockError.message); // Проверяем, что ошибка установлена
    expect(state.isSelectedOrderLoading).toBe(false);
  });
});
