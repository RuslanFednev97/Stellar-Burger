import reducer, {
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  logout,
  setAuthChecked,
  TUserState
} from './userSlice';

describe('тест для userSlice', () => {
  const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    requestStatus: false,
    loginUserError: null
  };

  // Тест на начальное состояние
  test('начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Тест на установку флага проверки аутентификации
  test('установка флага проверки аутентификации', () => {
    const action = setAuthChecked();
    const state = reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });

  // Тест на успешное выполнение запроса для регистрации пользователя
  test('успешное выполнение запроса для регистрации пользователя', async () => {
    const mockPayload = {
      user: { email: 'test@example.com', name: 'Test User' },
      refreshToken: 'mockRefreshToken',
      accessToken: 'mockAccessToken',
      success: true
    };
    const action = { type: registerUser.fulfilled.type, payload: mockPayload };
    const state = reducer(initialState, action);

    expect(state.user).toEqual(mockPayload.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.requestStatus).toBe(false);
    expect(state.loginUserError).toBeNull();
  });

  // Тест на ошибку запроса для регистрации пользователя
  test('ошибка запроса для регистрации пользователя', () => {
    const mockError = { message: 'Ошибка при регистрации' };
    const action = { type: registerUser.rejected.type, error: mockError };
    const state = reducer(initialState, action);

    expect(state.requestStatus).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBe(mockError.message);
  });

  // Тест на успешное выполнение запроса для входа пользователя
  test('успешное выполнение запроса для входа пользователя', async () => {
    const mockPayload = {
      user: { email: 'test@example.com', name: 'Test User' },
      refreshToken: 'mockRefreshToken',
      accessToken: 'mockAccessToken',
      success: true
    };
    const action = { type: loginUser.fulfilled.type, payload: mockPayload };
    const state = reducer(initialState, action);

    expect(state.user).toEqual(mockPayload.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.requestStatus).toBe(false);
    expect(state.loginUserError).toBeNull();
  });

  // Тест на ошибку запроса для входа пользователя
  test('ошибка запроса для входа пользователя', () => {
    const mockError = { message: 'Ошибка при входе' };
    const action = { type: loginUser.rejected.type, error: mockError };
    const state = reducer(initialState, action);

    expect(state.requestStatus).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBe(mockError.message);
  });

  // Тест на успешное выполнение запроса для получения пользователя
  test('успешное выполнение запроса для получения пользователя', async () => {
    const mockPayload = {
      user: { email: 'test@example.com', name: 'Test User' },
      success: true
    };
    const action = { type: fetchUser.fulfilled.type, payload: mockPayload };
    const state = reducer(initialState, action);

    expect(state.user).toEqual(mockPayload.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.requestStatus).toBe(false);
    expect(state.loginUserError).toBeNull();
  });

  // Тест на успешное выполнение запроса для обновления пользователя
  test('успешное выполнение запроса для обновления пользователя', async () => {
    const mockPayload = {
      user: { email: 'updated@example.com', name: 'Updated User' },
      success: true
    };
    const action = { type: updateUser.fulfilled.type, payload: mockPayload };
    const state = reducer(initialState, action);

    expect(state.user).toEqual(mockPayload.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.requestStatus).toBe(false);
    expect(state.loginUserError).toBeNull();
  });

  // Тест на успешное выполнение запроса для выхода пользователя
  test('успешное выполнение запроса для выхода пользователя', async () => {
    const action = { type: logout.fulfilled.type };
    const state = reducer(initialState, action);

    expect(state.user).toBeNull(); // Проверяем, что пользователь сброшен
  });
});
