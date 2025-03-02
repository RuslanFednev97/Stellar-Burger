import { rootReducer, store } from './store';

describe('Тест для rootReducer', () => {
  // Определяем группу тестов для rootReducer
  test('вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    // Выполняем редьюсер с неопределенным состоянием и неизвестным действием
    const unknown = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    // Корректное начальное состояние хранилища
    const initialState = store.getState();
    // Возвращает корректное начальное состояние хранилища
    expect(unknown).toEqual(initialState);
  });
});
