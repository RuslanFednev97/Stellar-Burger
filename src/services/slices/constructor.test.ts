import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  IConstructorState
} from './constructorSlice'; // Импортируем редьюсер и действия из constructorSlice
import { TConstructorIngredient } from '../../utils/types'; // Импортируем тип для ингредиентов

// Создаем тестовые ингредиенты
const ingredientOne: TConstructorIngredient = {
  calories: 4242,
  carbohydrates: 242,
  fat: 142,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  name: 'Биокотлета из марсианской Магнолии',
  price: 424,
  proteins: 420,
  type: 'main',
  _id: '643d69a5c3f7b9001cfa0941',
  id: '643d69a5c3f7b9001cfa0941'
};

const ingredientTwo: TConstructorIngredient = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  name: 'Филе Люминесцентного тетраодонтимформа',
  price: 988,
  proteins: 44,
  type: 'main',
  _id: '643d69a5c3f7b9001cfa093e',
  id: '643d69a5c3f7b9001cfa093e'
};

// Определяем начальное состояние с двумя ингредиентами
const initialStateWithIngredients = {
  bun: null,
  ingredients: [ingredientOne, ingredientTwo]
};

describe('тест для burgerConstructorSlice', () => {
  // Определяем начальное состояние для тестов
  const initialState: IConstructorState = {
    bun: null,
    ingredients: []
  };

  // Тест на начальное состояние редьюсера
  test('начальное состояние редьюсера', () => {
    // Проверяем, что редьюсер возвращает начальное состояние при неопределенном состоянии и неизвестном действии
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Тест на добавление ингредиента
  test('добавление ингредиента', () => {
    // Создаем действие для добавления ингредиента
    const action = addIngredient(ingredientOne);
    // Получаем новое состояние после применения действия
    const state = reducer(initialState, action);

    // Проверяем, что ингредиент добавлен в массив ingredients
    expect(state.ingredients).toHaveLength(1);
    // Проверяем, что добавленный ингредиент соответствует ожидаемому
    expect(state.ingredients[0]).toEqual({
      ...ingredientOne,
      id: expect.any(String)
    });
  });

  // Тест на удаление ингредиента
  test('удаление ингредиента', () => {
    // Создаем действие для удаления первого ингредиента
    const action = removeIngredient('643d69a5c3f7b9001cfa0941');
    // Получаем новое состояние после применения действия
    const state = reducer(initialStateWithIngredients, action);

    // Проверяем, что в массиве ingredients остался только второй ингредиент
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredientTwo);
  });

  // Тест на изменение порядка ингредиентов
  test('изменение порядка ингредиентов', () => {
    // Создаем действие для перемещения первого ингредиента на вторую позицию
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    // Получаем новое состояние после применения действия
    const state = reducer(initialStateWithIngredients, action);

    // Проверяем, что порядок ингредиентов изменился
    expect(state.ingredients).toEqual([ingredientTwo, ingredientOne]);
  });
});
