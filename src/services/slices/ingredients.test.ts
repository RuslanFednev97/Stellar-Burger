import reducer, {
  fetchIngredientsThunk,
  IIngredientState
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState: IIngredientState = {
    ingredients: [],
    isIngredientsLoading: true,
    error: null
  };

  // Тест на начальное состояние
  test('начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Тест на начало запроса
  test('начало запроса', () => {
    const action = { type: fetchIngredientsThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  // Тест на успешное выполнение запроса
  test('успешное выполнение запроса', () => {
    const mockPayload = [
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        name: 'Краторная булка N-200i',
        price: 1255,
        proteins: 80,
        type: 'bun',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093c'
      },
      {
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        name: 'Биокотлета из марсианской Магнолии',
        price: 424,
        proteins: 420,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa0941'
      }
    ];
    const action = {
      type: fetchIngredientsThunk.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);

    expect(state.ingredients).toEqual(mockPayload);
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  // Тест на ошибку запроса
  test('ошибка запроса', () => {
    const mockError = { message: 'Ошибка при загрузке ингредиентов' };
    const action = {
      type: fetchIngredientsThunk.rejected.type,
      error: mockError
    };
    const state = reducer(initialState, action);

    expect(state.error).toBe(mockError.message);
    expect(state.isIngredientsLoading).toBe(false);
  });
});
